<?php require 'userValidate.php'?>
<link rel="stylesheet" href="navbar.css">
<div class="topnav" id="myTopnav">
    <img src="auction.png" alt="Auction Central" onclick="window.location.href='liveAuctions.php'"/>
    <a></a>
    <div class="dropdown">
        <button id="account" class="dropbtn">My Account
            <i class="fa fa-caret-down"></i>
        </button>
        <div class="dropdown-content" >
            <a id="userName"></a>
            <script>  function getCookie(name) {
                    return (name = (document.cookie + ';').match(new RegExp(name + '=.*;'))) && name[0].split(/=|;/)[1];
                }
                var email = getCookie("userName");
                document.getElementById("userName").innerHTML = decodeURIComponent(email);
            </script>
            <a id="logout" href="https://auctioncentral.com/logout.php">Logout</a>
        </div>
    </div>
    <div class="dropdown">
        <button id="admin" class="dropbtn">Admin
            <i class="fa fa-caret-down"></i>
        </button>
        <div id="auctionNav" class="dropdown-content">
            <a id ="conditionReports" href="https://work.auctioncentral.com/ConditionReports.php">Live Auctions</a>
            <a id="manageVehicles"  href="https://work.auctioncentral.com/DealerVehicleManagement.php">Manage Vehicles</a>
            <a id ="requestReport" href="https://work.auctioncentral.com/requestConditionReport.php">Dealer History</a>
        </div>
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
