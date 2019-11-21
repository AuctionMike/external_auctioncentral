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
            <form class="loginform" method="post"  action="userLogin.php">
                <img class="icon" src="cropped-auction-icon-app.png" alt="Auction Central" />
                <ul>
                    <li>
                        <input id="email" type="text" name="email" placeholder="Email" maxlength="100" required
                               oninvalid="this.setCustomValidity('Username Required')"
                               oninput="this.setCustomValidity('')"/>
                    </li>
                    <li>
                        <input type="password" name="password"  placeholder="Password" maxlength="100" required
                               oninvalid="this.setCustomValidity('Password Required')"
                               oninput="this.setCustomValidity('')"/>
                    </li>
                    <li>
                        <input type="submit" name=login" value="Login" >
                        <br>
                        <div id="forgotPWD" style="padding-top: 25px;">
                            <a id="forgotPWD" href="http://work.auctioncentral.com/forgotPassword.php" style="text-decoration: none; font-family: 'Helvetica', serif; font-size: 12px;">Forgot Password?</a>
                        </div>

                    </li>
                </ul>
            </form>
        </div>
    </div>
</div>
<footer class="footer">2019 &#169 Auction Central.</footer>
<script src="userLogin.js"></script>
</body>
</html>
