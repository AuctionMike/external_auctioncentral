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
    <title>Auction Central - Live Auctions</title>
    <link rel="icon" href="../../cropped-auction-icon-app.png">
    <script src="https://www.gstatic.com/firebasejs/4.3.0/firebase.js"></script>
</head>
<body>
<div style=" display: table; margin: auto; "></div>
<div id="container" style="font-family: 'Helvetica', serif; max-width:1600px; margin: auto;">
    <div id="filterContainer">
    <div id="sideFilter" class="sideFilter">
        <label></label>
        <a id="filters" onclick="userFilters()">Preset Filters</a>
        <a id="price" onclick="setPrice()">Price</a>
        <a id="mileage"  onclick="setMileage()">Mileage</a>
        <a id="year" onclick="setYear()">Year</a>
        <a id="make"  onclick="setMake()">Make</a>
        <a id="bodyType"  onclick="setBodyType()">Body Type</a>
        <a id="drivetrain"  onclick="setDrivetrain()">Drivetrain</a>
        <a id="fuelType"  onclick="setFuelType()">Fuel Type</a>
        <a id="trans" onclick="setTransmission()">Transmission</a>
        <button id="applyFilter" value="apply"  onclick="applyFilter()">Filter</button>
    </div>
    </div>
    <div id="auction" style="display:grid; width: 90%; margin: auto; padding-top: 50px;">

    </div>
</div>
<footer class="footer">2019 &#169 Auction Central.</footer>
    <script src="auctionFeed.js"></script>
<script src="auctionBidProxy.js"></script>
<script src="auctionFilters.js"></script>
<script src="auctionGlance.js"></script>
<script src="auctionTimer.js"></script>
    </body>
    </html>

