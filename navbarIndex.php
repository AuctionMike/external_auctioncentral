<?php require 'userValidate.php'?>
<link rel="stylesheet" href="navbar.css">
<div class="topnav" id="myTopnav">
    <img src="auction.png" alt="Auction Central" onclick="window.location.href='index.php'"/>
    <a></a>
    <div class="dropdown">
        <button id="account" class="dropbtn" onclick="window.location.href='subscribe.php';">Join Now
        </button>
    </div>
    <div id="admin" class="dropdown">
        <button id="account" class="dropbtn" onclick="window.location.href='login.php';">Sign In
        </button>
    </div>
    <a href="javascript:void(0);" style="font-size:15px;" class="icon" onclick="navBar()">&#9776;</a>
</div>
<div id="carsImage">
    <div class="top-text" style="font-family: 'Helvetica', serif; margin-left: 50px; color: #0b568f; z-index: 1;"> <h1> <a id="welcomeUser"></a>
            <script>  function getCookie(name) {
                    return (name = (document.cookie + ';').match(new RegExp(name + '=.*;'))) && name[0].split(/=|;/)[1];
                }
                var email = getCookie("userName");
                document.getElementById("welcomeUser").innerHTML = decodeURIComponent(email);

                if( document.getElementById("welcomeUser").innerHTML == "null"){
                    document.getElementById("welcomeUser").style.display = "none";
                }

                var userType = getCookie("userType");
                if(userType == "dealerUser"){
                    document.getElementById("conditionReports").style.display = "none";
                    if(getCookie("titleClerk")){
                        document.getElementById("requestReport").style.display = "none";
                    }
                }
            </script>
        </h1>
    </div>
    <img src="carLine.jpg" alt="Auction Central" style="width: 100%; height: 125px; object-fit: cover;">
</div>
<script>

    if((window.location == 'http://auctioncentral.com/') || (window.location == 'http://auctioncentral.com/subscribe.php')){

        //reassign drop down nav for just the index page
        document.getElementById("admin").innerHTML = "Contact" + '<i class="fa fa-caret-down"></i>';
        document.getElementById("account").innerHTML = "My Account" + '<i class="fa fa-caret-down"></i>';
        document.getElementById("auctionNav").style.minWidth = '130px';
        document.getElementById("auctionNav").style.width = '130px';
        //CONTACT dropdown
        document.getElementById("conditionReports").innerHTML = "Subscribe";
        document.getElementById("conditionReports").href = 'http://auctioncentral.com/subscribe.php';
        document.getElementById("requestReport").innerHTML = "Contact";
        document.getElementById("requestReport").href = "";
        document.getElementById("manageVehicles").innerHTML = "About";
        document.getElementById("manageVehicles").href = "";
        //MY ACCOUNT dropdown
        document.getElementById("userName").innerHTML = "Sign In";
        document.getElementById("userName").href = 'http://auctioncentral.com/login.php';
        document.getElementById("logout").innerHTML = "Forgot Password";
        document.getElementById("logout").href = 'http://auctioncentral.com/forgotPassword.php';
    }

    function navBar() {
        var x = document.getElementById("myTopnav");
        if (x.className === "topnav") {
            x.className += " responsive";
        } else {
            x.className = "topnav";
        }
    }
</script>
