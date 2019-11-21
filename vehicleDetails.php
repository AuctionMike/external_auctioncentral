<?php require 'navbar.php'?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=0.95 user-scalable=0">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <link rel="stylesheet" href=" navbar.css">
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="auctionForm.css">
    <link rel="stylesheet" href="vehicleDetails.css">
    <title>Auction Central - Live Auctions</title>
    <link rel="icon" href="../../cropped-auction-icon-app.png">
    <script src="https://www.gstatic.com/firebasejs/4.3.0/firebase.js"></script>
</head>
<body>
<div style=" display: table; margin: auto; "></div>
<div id="container" style="font-family: 'Helvetica', serif; max-width:1600px; margin: auto;">

<div id="vehicleInfo" style="display: flex;">
    <div style="width: 420px;  margin-left: 5%; margin-top: 2%;">
    <div id="vehicleImages" style="width: 420px;">
        <label id="yearMakeModel"></label>

    </div>
    <div id="auctionBidTime" style="width: 420px; padding-top: 10px; font-size: 18px;">
        <div style="display: inline-grid; width: 45%; text-align: center;">
        <label style="font-weight: bold; color: dimgrey;">CURRENT BID</label>
            <label style="color: green; font-size: 25px;"> $3500</label>
        </div>
        <div style="display: inline-grid; width: 50%; float: right; text-align: center;">
            <label style="font-weight: bold; color: dimgrey;">TIME REMAINING</label>
            <label style="color: red; font-size: 25px;"> 20:00</label>
        </div>
<div id="bidProxy" style="display: block; width: 55%; margin: auto; margin-top: 20px;">
        <button style="width: 100px; padding: 5px; background-color: #0b568f; color: white; border: none; border-radius: 4px;">Bid +100</button>
    <button style="width: 100px; padding: 5px; float: right;  border: dashed 1px black; background-color: transparent; border-radius: 4px;">Proxy</button>
</div>
    </div>
</div>
    <div id="imageGallery">

    </div>

    <div id="vehicleDetails">
        <table id="vTable">
            <thead style="display: table-caption; border-bottom: solid 1px lightgray;"><th>Vehicle Info</th></thead>
            <tbody>
            <tr id="vVIN">
                <td>VIN:</td>
                <td id="vin" style="text-align: right;"></td>
            </tr>
            <tr id="vYear">
                <td>Year:</td>
                <td id="year" style="text-align: right;"></td>
            </tr>
            <tr id="vMake">
                <td>Make:</td>
                <td id="make" style="text-align: right;"></td>
            </tr>
            <tr id="vModel">
                <td>Model:</td>
                <td id="model" style="text-align: right;"></td>
            </tr>
            <tr id="vMileage">
                <td>Mileage:</td>
                <td id="mileage" style="text-align: right;"></td>
            </tr>
            <tr id="vEngine">
                <td>Engine:</td>
                <td id="engine" style="text-align: right;"></td>
            </tr>
            <tr id="vFuelType">
                <td>Fuel Type:</td>
                <td id="fuelType" style="text-align: right;"></td>
            </tr>
            <tr id="vTransmission">
                <td>Transmission:</td>
                <td id="transmission" style="text-align: right;"></td>
            </tr>
            <tr id="vDrivetrain">
                <td>Drivetrain:</td>
                <td id="drivetrain" style="text-align: right;"></td>
            </tr>
            <tr id="vTrim">
                <td>Trim:</td>
                <td id="trim" style="text-align: right;"></td>
            </tr>
            <tr id="vExterior">
                <td>Exterior:</td>
                <td id="exColor" style="text-align: right;"></td>
            </tr>
            <tr id="vInterior">
                <td>Interior:</td>
                <td id="inColor" style="text-align: right;"></td>
            </tr>
            </tbody>
        </table>
    </div>
</div>

<div id="auctionData">
<div id="condition" style="width:50%; border-right: 1px solid lightgray;">
    <table id="cTable">
        <thead style="display: table-caption; border-bottom: solid 1px lightgray;"><th> Auction Info</th></thead>
        <tbody>

        </tbody>
    </table>
</div>

    <div id="auction" style="width:50%;">
    <table id="dTable">
        <thead style="display: table-caption; border-bottom: solid 1px lightgray;"><th>Details</th></thead>

    </table>
</div>

</div>

</div>
<footer class="footer">2019 &#169 Auction Central.</footer>
<script src="auctionDetails.js"></script>
<script>

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
        var slides = document.getElementById('vehicleImages');
        var vSlides =slides.getElementsByClassName("imageSlides");
        console.log("slides"+ vSlides.length);
        if (n > slides.length) {slideIndex = 1}
        if (n < 1) {slideIndex = slides.length}
        for (i = 0; i < vSlides.length; i++) {
            console.log("SLIDES:" + vSlides[i]);
            slides[i].style.display = "none";
        }
        // slides[slideIndex-1].style.display = "block";
    }

</script>
</body>
</html>

