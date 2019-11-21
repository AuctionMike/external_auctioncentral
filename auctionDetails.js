
//GET VEHICLE USING REPORT ID

var rep_param = new URLSearchParams(document.location.search.substring(1));
var report_id = rep_param.get("reportID");
var params = encodeURI("?report_id=" + report_id);
var apiendpoint = "https://auctioncentral.com/getVehicle.php" + params;
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
    console.log(vehicle);

    var auctionVehicle = vehicle;

    var yearMakeModel = auctionVehicle["vYear"]+ " " + auctionVehicle["vMake"]+ " " + auctionVehicle["vModel"];
    document.getElementById("yearMakeModel").innerHTML = auctionVehicle["vYear"]+ " " +
        auctionVehicle["vMake"]+ " " + auctionVehicle["vModel"];
    if(yearMakeModel.length > 30)
    {
        document.getElementById("yearMakeModel").style.fontSize = "18px";
    }

//VEHICLE IMAGES
    var imageContainer = document.getElementById("vehicleImages");
    var i = 0;
    for (var value of Object.keys(vehicle['vehicle_images'])) {
        console.log(value);
        console.log(vehicle['vehicle_images'][i]);
        var imgDiv = document.createElement("div");
        imgDiv.setAttribute("class", "imageSlides fade");
        imgDiv.setAttribute('id', "img"+value);
        var imgNum = document.createElement("div");
        imgNum.style.borderRadius = "3px";
        imgNum.setAttribute("class", "numbertext");
        imgNum.innerHTML = i+1 +"/" + (vehicle['vehicle_images'].length);
        var vehicleImage = document.createElement("img");
        var imgLink = document.createElement("a");
        imgLink.addEventListener('click', function(){
            window.open("https://auctioncentral.com/vehicleGallery.php?reportID="+report_id);
        });
        vehicleImage.style.borderRadius = "3px";
        vehicleImage.src = vehicle["vehicle_images"][i];
        vehicleImage.style.width = "420px";
        vehicleImage.style.height = "420px";

        imgDiv.appendChild(imgNum);
        imgLink.appendChild(vehicleImage);
        imgDiv.appendChild(imgLink);
        imageContainer.appendChild(imgDiv);


        //Image Gallery

            var imageGallery = document.getElementById('imageGallery');
            var vImg = document.createElement('img');
            var imgLink = document.createElement("a");
            imgLink.setAttribute('id', ""+value);

            imgLink.addEventListener('click', function(){
                var images = document.getElementsByClassName('imageSlides');

                for (var i = 0; i < images.length; i++) {
                    images[i].style.display = 'none';
                }

                console.log(this.id);
               document.getElementById('img'+this.id).style.display = 'block';
            });

            imgLink.addEventListener('dblclick', function(){
                console.log('dblClick');
                window.open("https://auctioncentral.com/vehicleGallery.php?reportID="+report_id);
            });

            vImg.style.borderRadius = "2px";
            vImg.src = vehicle["vehicle_images"][i];
            vImg.style.width = "105px";
            vImg.style.height = "105px";
            imgLink.appendChild(vImg);
            imageGallery.appendChild(imgLink);


        i++;
    }
    var nextImg = document.createElement("a");
    nextImg.setAttribute("class", "next");
    nextImg.innerHTML = "&#10095";
    nextImg.addEventListener("click", function () {
        plusSlides(1);
    });

    var prevImg =  document.createElement("a");
    prevImg.setAttribute("class", "prev");
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



//VEHICLE INFO
    document.getElementById("vin").innerText = vehicle['vVIN'];
    document.getElementById("year").innerText = vehicle['vYear'];
    document.getElementById("make").innerText = vehicle['vMake'];
    document.getElementById("model").innerText = vehicle['vModel'];
    document.getElementById("mileage").innerText = vehicle['vMileage'];
    if(vehicle['vEngine'].length >38){
        document.getElementById('engine').style.fontSize = '14px';
    }

    document.getElementById("engine").innerText = vehicle['vEngine'];
    document.getElementById("fuelType").innerText = vehicle['vFuelType'];

    if(vehicle['vTransmission'].length >38){
        document.getElementById('transmission').style.fontSize = '12px';
    }
    document.getElementById("transmission").innerText = vehicle['vTransmission'];
    document.getElementById("drivetrain").innerText = vehicle['vDrivetrain'];
    document.getElementById("trim").innerText = vehicle['vTrim'];
    document.getElementById("exColor").innerText = vehicle['vExtColor'];
    document.getElementById("inColor").innerText = vehicle['vIntColor'];



//DETAILS (selection & notes)
    var detailsTable = document.getElementById("dTable");
    var tBody = document.createElement('tbody');
    detailsTable.appendChild(tBody);
    for (var selection of Object.keys(vehicle['vehicle_details'])) {
        console.log(selection);
        console.log(vehicle['vehicle_details'][selection]['selection']);
        var section =  document.createElement('tr');
        var title = document.createElement('td');
        title.innerText = selection;
        var condition = document.createElement('td');
        condition.innerText = vehicle['vehicle_details'][selection]['selection'];
        var notes = document.createElement('tr');
        var sectionNotes = document.createElement('td');
        sectionNotes.style.border = 'none';
        sectionNotes.style.fontWeight = 'normal';
        sectionNotes.innerText = vehicle['vehicle_details'][selection]['notesYN'];

        section.appendChild(title);
        section.appendChild(condition);
        tBody.appendChild(section);
        notes.appendChild(sectionNotes);
        tBody.appendChild(notes);
    }

    /*
    document.getElementById("structural").innerText = vehicle[report_id]['conditionData']['structuralSelection'];
    document.getElementById("structuralNotes").innerText = vehicle[report_id]['conditionData']['structuralNotes'];
    document.getElementById("powertrain").innerText = vehicle[report_id]['conditionData']['powertrainSelection'];
    document.getElementById("powertrainNotes").innerText = vehicle[report_id]['conditionData']['powertrainNotes'];
    document.getElementById("exterior").innerText = vehicle[report_id]['conditionData']['exteriorSelection'];
    document.getElementById("exteriorNotes").innerText = vehicle[report_id]['conditionData']['exteriorNotes'];
    document.getElementById("interior").innerText = vehicle[report_id]['conditionData']['interiorSelection'];
    document.getElementById("interiorNotes").innerText = vehicle[report_id]['conditionData']['interiorNotes'];
    document.getElementById("windshield").innerText = vehicle[report_id]['conditionData']['windshieldSelection'];
    document.getElementById("windshieldNotes").innerText = vehicle[report_id]['conditionData']['windshieldNotes'];
    document.getElementById("wheelCondition").innerText = vehicle[report_id]['conditionData']['wheelConditionSelection'];
    document.getElementById("wheelConditionNotes").innerText = vehicle[report_id]['conditionData']['wheelConditionNotes'];
    document.getElementById("tireCondition").innerText = vehicle[report_id]['conditionData']['tireConditionSelection'];
    document.getElementById("tireConditionNotes").innerText = vehicle[report_id]['conditionData']['tireConditionNotes'];
    */

}

