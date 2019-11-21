function getAuctionTime(start, end, id) {

// Update the count down every 1 second
    var x = setInterval(function () {
//1609879045000

        start = new Date(start).getTime();
        end = new Date(end).getTime();

        //console.log(start + " - " +end +"="+ (start-end));
        var vehicle = document.getElementById(id);
        // Get today's date and time
        var now = new Date().getTime();

        //console.log(start +"   " +end);
        // Find the distance between now and the count down date
        //start = time the auction begins , end = time sent from server
        var distance = end - now;
        // Time calculations for days, hours, minutes and seconds
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)).toString();
        var seconds = (Math.floor((distance % (1000 * 60)) / 1000).toString());
        if(seconds == 0)
        {
            seconds = "00";
        }
        if( minutes == 0){
            minutes = "00";
        }

        // Output the result in an element with id="demo"
        vehicle.innerHTML = minutes + ":" + seconds + "s ";

        // If the count down is over, write some text
        if (distance < 0) {
            clearInterval(x);
            vehicle.innerHTML = "ENDED";
        }
    }, 1000);
}

var reportID = '';
function createAuctionFeed(filterCars){
console.log(filterCars);
var auctionFeed = document.getElementById("auction");
var auctionList = document.createElement("ul");
var auctionContainer = document.createElement("div");
auctionContainer.setAttribute("id", "auctionContainer");
auctionContainer.appendChild(auctionList);
auctionFeed.appendChild(auctionContainer);


    var i =0;
    for (var value of Object.keys(filterCars['vehicles'])) {

        var auctionVehicle = filterCars['vehicles'][value];
        //vehicle auction data container
        var vehicleList = document.createElement("li");
        vehicleList.style.width = "350px";
        vehicleList.style.display = "inline-block";
        vehicleList.style.padding = "10px";
        vehicleList.style.paddingBottom = "50px";
        var vehicleContainer = document.createElement("div");
        vehicleContainer.setAttribute("class", "vehicleContainer");
        vehicleContainer.style.height = '580px';
        vehicleContainer.setAttribute('id', value);
        vehicleContainer.addEventListener('click', function(event){
            if(event.target == this){
                console.log(this);
                window.location = 'https://auctioncentral.com/vehicleDetails.php?reportID=' + this.id;
            }
        });
        vehicleContainer.style.width = "100%";
        vehicleContainer.style.boxShadow = "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)";
        vehicleContainer.style.backgroundColor = "white";
        vehicleList.appendChild(vehicleContainer);
        auctionList.appendChild(vehicleList);

        //contents of image container
        var imageContainer = document.createElement("div");
        imageContainer.setAttribute("id", value);
        imageContainer.style.margin = "auto";
        imageContainer.style.padding = "20px";
        imageContainer.setAttribute('id', value);
        imageContainer.setAttribute('class', 'vehicle');
        imageContainer.addEventListener('click', function(){
                window.location = 'https://auctioncentral.com/vehicleDetails.php?reportID=' + this.id;
        });
        var auctionImage = document.createElement("img");
        auctionImage.style.width = "250px";


        auctionImage.style.display = "block";
        auctionImage.style.margin = "auto";
        auctionImage.style.border = "solid 1px grey";
        var imageLink = document.createElement("a");
        imageLink.setAttribute('target', '_blank');
        if(auctionVehicle["vehicle_images"]) {
            imageLink.href = auctionVehicle["vehicle_images"]["0"];
            auctionImage.src = auctionVehicle["vehicle_images"]["0"];
        }
        imageContainer.appendChild(auctionImage);
        imageContainer.appendChild(imageLink);
        vehicleContainer.appendChild(imageContainer);

        //vehicle data (year,make,model...) container
        var detailsContainer = document.createElement("div");
        detailsContainer.setAttribute("id", value);
        detailsContainer.style.display = "inline-block";
        detailsContainer.style.width = "100%";
        detailsContainer.style.paddingBottom = "10px";
        detailsContainer.setAttribute('class', 'vehicle');
        detailsContainer.addEventListener('click', function(){
                window.location = 'https://auctioncentral.com/vehicleDetails.php?reportID=' + this.id;
        });

        var vData = document.createElement("input");
        vData.value = auctionVehicle["vYear"] + " " + auctionVehicle["vMake"] + " " + auctionVehicle["vModel"];
        vData.setAttribute('readonly', true);
        vData.style.width = "100%";
        vData.style.fontSize = "20px";
        vData.style.fontWeight = "bold";
        vData.style.textAlign = "center";
        vData.style.border = "none";
        var mileage = document.createElement("input");
        mileage.value = auctionVehicle["vMileage"] + " miles";
        mileage.setAttribute('readonly', true);
        mileage.style.fontWeight = "bold";
        mileage.style.width = "100%";
        mileage.style.fontSize = "14px";
        mileage.style.textAlign = "center";
        mileage.style.border = "none";

        detailsContainer.appendChild(vData);
        detailsContainer.appendChild(mileage);
        vehicleContainer.appendChild(detailsContainer);

        //at a glance section
        var glanceContainer = document.createElement("div");
        glanceContainer.setAttribute("id", "glanceContainer_"+i);
        glanceContainer.setAttribute("class", "glanceContainer");
        glanceContainer.setAttribute("value", value);
        glanceContainer.innerHTML = '&#x1f441';
        glanceContainer.addEventListener("click", function() {

            var reportID = document.getElementById(this.id).getAttribute("value");
            glanceFrame(filterCars['vehicles'][reportID]);
        });
        vehicleContainer.appendChild(glanceContainer);

        //time and bid container
        var timeBidContainer = document.createElement("div");
        timeBidContainer.style.paddingTop = "10px";
        timeBidContainer.style.paddingBottom = "30px";
        timeBidContainer.style.display = "inline-block";
        timeBidContainer.setAttribute('id', value);
        timeBidContainer.addEventListener('click', function(){
            window.location = 'https://auctioncentral.com/vehicleDetails.php?reportID=' + this.id;
        });

        //current bid and label
        var bidContainer = document.createElement("div");
        bidContainer.style.display = "inline-grid";
        bidContainer.style.marginLeft = "10px";
        bidContainer.style.width = "40%";
        var bidLabel = document.createElement("label");
        bidLabel.innerText = "CURRENT BID";
        bidLabel.style.fontWeight = "bold";
        bidLabel.style.fontSize = "14px";
        bidLabel.style.color = "grey";
        bidLabel.style.padding = "5px";
        var auctionBid = document.createElement("input");
        auctionBid.setAttribute("id", "BID"+value);
        if(filterCars['vehicles'][value]['bid_price']){
            auctionBid.setAttribute("value", "$" +filterCars['vehicles'][value]['bid_price']);
        }
        else{
            auctionBid.setAttribute("value", "$0");
        }
        auctionBid.setAttribute('readonly', true);
        auctionBid.style.fontSize = "20px";
        auctionBid.style.width = "50%";
        auctionBid.style.margin = "auto";
        auctionBid.style.fontWeight = "bold";
        auctionBid.style.textAlign = "center";
        auctionBid.style.color = "green";
        auctionBid.style.border = "none";
        bidContainer.appendChild(bidLabel);
        bidContainer.appendChild(auctionBid);
        timeBidContainer.appendChild(bidContainer);


        //current time and label
        var timeContainer = document.createElement("div");
        timeContainer.style.display = "inline-grid";
        timeContainer.style.marginLeft = "20px";
        timeContainer.style.width = "45%";
        var timeLabel = document.createElement("label");
        timeLabel.innerText = "TIME REMAINING";
        timeLabel.style.fontWeight = "bold";
        timeLabel.style.fontSize = "14px";
        timeLabel.style.color = "grey";
        timeLabel.style.padding = "5px";
        var auctionTime = document.createElement("p");
        auctionTime.setAttribute("id", "time_"+value);
      getAuctionTime(auctionVehicle["start_time"],auctionVehicle["end_time"], "time_"+value);
        auctionTime.style.fontSize = "20px";
        auctionTime.style.width = "50%";
        auctionTime.style.margin = "auto";
        auctionTime.style.fontWeight = "bold";
        auctionTime.style.textAlign = "center";
        auctionTime.style.color = "red";
        auctionTime.style.border = "none";
        auctionTime.setAttribute('readonly', true);
        timeContainer.appendChild(timeLabel);
        timeContainer.appendChild(auctionTime);
        timeBidContainer.appendChild(timeContainer);
        vehicleContainer.appendChild(timeBidContainer);

        //Buttons for Bid & Proxy


        var bidButton = document.createElement("button");
        bidButton.setAttribute("type", "submit");
        bidButton.setAttribute("value", value);
        bidButton.innerText = "Bid +100";
        bidButton.style.fontSize = "20px";
        bidButton.style.marginLeft = "50px";
        bidButton.style.cssFloat = "left";
        bidButton.setAttribute("id", "btnBid"+value);
        bidButton.setAttribute("class", "bidButton");
        bidButton.addEventListener("click", function(){
            raiseBid(this.id);
        });

        var proxyButton = document.createElement("button");
        proxyButton.innerText = "Proxy +";
        proxyButton.style.fontSize = "20px";
        proxyButton.style.cssFloat = "right";
        proxyButton.style.marginRight = "50px";
        proxyButton.setAttribute("id", "btnProxy"+value);
        bidButton.addEventListener("click", function(){
            proxyButton(this.id);
        });
        proxyButton.setAttribute("value", value);
        vehicleContainer.appendChild(bidButton);
        vehicleContainer.appendChild(proxyButton);
        i++;
    }
}

var vehicleRequest = {};
vehicleRequest["filters"] = {};
var vehicle_request_ct = 10;
var data = JSON.stringify({
    'filters': vehicleRequest["filters"],
    'vehicle_count': vehicle_request_ct
});

var apiendpoint = "https://auctioncentral.com/getVehicles.php";
fetch(apiendpoint, {
    method: 'POST',
    body: data
}).then(response => {
    if (response.ok) {

        return response.json();
    }
    throw new Error('Request failed!');
}, networkError => {
    console.log(networkError.message);
}).then(jsonResponse => {
            createAuctionFeed(jsonResponse);

});

