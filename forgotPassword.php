<?php require 'userLogin.php';?>
<!DOCTYPE html>
<html lang="en">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>
<head>
    <title>Auction Central - Login</title>
    <meta name="viewport" content="width=device-width, initial-scale=.75">
    <link rel="stylesheet" href="log.css">
</head>
<body>
<div id="container">
    <div id="main">
        <div class="login">
            <form class="loginform" method="post" action="login.php" style="height: 275px;">
                <img class="icon" src="../../cropped-auction-icon-app.png" alt="Auction Central" />
                <ul>
                    <li style="margin-bottom: 0px">
                        <input id="email" type="text" name="email" placeholder="Email" maxlength="100" required
                               oninvalid="this.setCustomValidity('Username Required')"
                               oninput="this.setCustomValidity('')"/>
                    </li>

                    <li>
                        <br>
                        <input id ="forgotPwd" type="button" value="Submit" onclick="resetPassword()">
                    </li>
                </ul>
            </form>
        </div>
    </div>
</div>
<footer class="footer">2019 &#169 Auction Central.</footer>
<script src="javaScript/userLogin.js"></script>
</body>
</html>