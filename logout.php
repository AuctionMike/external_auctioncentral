<?php
session_start();

//if valid email is signed in then destroy the session and remove the cookies from the browser
if (isset($_SESSION['email_id'])) {
    session_destroy();
}
setcookie("usersName",$user, time() -3600,'/');
setcookie("email",$email, time() -3600, '/');
session_destroy();

header("location: https://auctioncentral.com/login.php");
echo "Successful Logout";
?>