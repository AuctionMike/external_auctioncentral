
//GET VEHICLE USING REPORT ID

var rep_param = new URLSearchParams(document.location.search.substring(1));
var report_id = rep_param.get("reportID");
var params = encodeURI("?report_id=" + report_id);
var apiendpoint = "https://auctioncentral.com/getImages.php" + params;
fetch(apiendpoint, {
    method: 'POST',
    body: report_id
}).then(response => {
    if (response.ok) {

        return response.json();
    }
    throw new Error('Request failed!');
}, networkError => {
    console.log(networkError.message);
}).then(jsonResponse => {
    vehicleDetails(jsonResponse);

});

function vehicleDetails(vehicle) {

    var imageContainer = document.getElementById("vehicleImages");
    var i = 0;
    for (var value of Object.keys(vehicle['vehicle_images'])) {
        console.log(value);
        console.log(vehicle[report_id]['vehicle_images'][i]);
        var imgDiv = document.createElement("div");
        imgDiv.setAttribute("class", "imageSlides fade");
        imgDiv.setAttribute('id', "img"+i);
        var imgNum = document.createElement("div");
        imgNum.style.borderRadius = "3px";
        imgNum.setAttribute("class", "gallerynumbertext");
        imgNum.innerHTML = i+1 +"/" + (vehicle[report_id]['vehicle_images'].length);
        var vehicleImage = document.createElement("img");
        vehicleImage.style.borderRadius = "3px";
        vehicleImage.src = vehicle[report_id]["vehicle_images"][i];
        vehicleImage.style.width = "81%";
        vehicleImage.style.height = "81";


        imgDiv.appendChild(vehicleImage);
        imgDiv.appendChild(imgNum);
        imageContainer.appendChild(imgDiv);
        i++;
    }
    var nextImg = document.createElement("a");
    nextImg.setAttribute("class", "nextGal");
    nextImg.innerHTML = "&#10095";
    nextImg.addEventListener("click", function () {
        plusSlides(1);
    });

    var prevImg =  document.createElement("a");
    prevImg.setAttribute("class", "prevGal");
    prevImg.innerHTML = "&#10094";
    prevImg.addEventListener("click", function(){
        plusSlides(-1);
    });

    imageContainer.appendChild(prevImg);
    imageContainer.appendChild(nextImg);


    var slideIndex = 1;
    showSlides(slideIndex);

    // Next/previous controls
    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    // image slides
    function showSlides(n) {
        console.log("N:" + n);
        var i;
        var imgCon = document.getElementById("vehicleImages");
        var slides = imgCon.getElementsByClassName('imageSlides');
        console.log("slides"+ slides.length);
        if (n > slides.length) {slideIndex = 1}
        if (n < 1) {slideIndex = slides.length}
        for (i = 0; i < slides.length; i++) {
            console.log("SLIDES:" + slides[i]);
            slides[i].style.display = "none";
        }
        slides[slideIndex-1].style.display = "block";
    }

}

