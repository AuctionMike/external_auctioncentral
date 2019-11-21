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
<body style="background-color: black;">
<div id="container" style="font-family: 'Helvetica', serif; padding: 2px;
  text-align: center; max-width:1600px; margin: auto; background-color: black;">
<div id="vehicleImages" style="display: inline-block; width: 85%;"></div>
</div>
<script src="auctionGallery.js"></script>
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

