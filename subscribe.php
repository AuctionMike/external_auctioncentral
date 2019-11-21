<?php require 'navbarIndex.php'?>
<!DOCTYPE html>
<html lang="en">
<head>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="https://unpkg.com/jquery-input-mask-phone-number@1.0.11/dist/jquery-input-mask-phone-number.js"></script>
    <link rel="stylesheet" href="auctionForm.css">
    <link rel="stylesheet" href=" navbar.css">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=0.8">
    <title>Sign Up - Auction Central</title>
    <link rel="icon" href="../../cropped-auction-icon-app.png">
</head>
<body>
<div id="container">

    <div style="padding-top: 10px; padding-bottom: 100px; width:925px;  font-family: 'Helvetica', serif; font-size: 30px; margin: auto;">
        <h2 style="color: #0b568f; font-weight: lighter; text-align: center;"> Live Cross-Platform Dealer Auctions </h2>
        <h1 style="color: #0b568f; font-weight: lighter; text-align: center; font-size: 20px;">Real time 20 minute auctions from your mobile device or desktop</h1>
        <div id="facts" style="display: flex; padding-top: 50px;">
            <div id="comp" style="width: 100px; padding-right: 100px;">
                <div>
                    <img src="../../phoneComp.png" alt="Auction Central" style="width: 100px; height: 100px;"/>
                </div>
                <div id="tiny_text" style="font-size: 12px; font-weight: bold; text-align: center; padding-left: 10px;">
                    Deal Digitally
                </div>
            </div>
            <div id="time" style="width: 111px; padding-right: 100px;">
                <div>
                    <img src="../../clock.png" alt="Auction Central" style="width: 100px; height: 100px; padding-left: 10px;"/>
                </div>
                <div id="tiny_text" style="font-size: 12px; font-weight: bold; text-align: center;">
                    Optimize Efficiency
                </div>
            </div>

            <div id="money" style="width: 100px; padding-right: 100px;">
                <div style="margin: auto">
                    <img src="../../dollars.png" alt="Auction Central" style="width: 100px; height: 100px;"/>
                </div>
                <div id="tiny_text" style="font-size: 12px; font-weight: bold; text-align: center; padding-left: 10px;">
                    Save Money
                </div>
            </div>

            <div id="warranty" style="width: 110px; padding-right: 100px;">
                <div>
                    <img src="../../wrench.png" alt="Auction Central" style="width: 80px; padding-left: 10px; height: 80px; padding-bottom: 22px;"/>
                </div>
                <div id="tiny_text" style="font-size: 12px; font-weight: bold; text-align: center;">
                    3000 Mile Warranty
                </div>
            </div>

            <div id="dealer" style="width: 100px;">
                <div>
                    <img src="../../handshake.png" alt="Auction Central" style="width: 90px; height: 90px; padding-bottom: 10px;"/>
                </div>
                <div id="tiny_text" style="font-size: 12px; font-weight: bold; text-align: center;">
                    Dealer Services
                </div>
            </div>
        </div>


    </div>

    <div style="margin: auto; width: 1100px" >
        <form class="formstyle" style=" float: left;">
            <h1 style="color: #0b568f; font-weight: lighter; text-align: left; font-size: 40px;">Join Now </h1>
            <div class="deets" style="width: 375px; font-size: 13px;">Sign up to receive updates and news related to our services.
                Please providing the necessary information below and click the red button to subscribe to Auction Central.</div>
            <br>
            <ul>
                <li>
                    <input id="fullName" type="text" name="fullName" placeholder="Full Name" maxlength="100" size="100"required
                           oninvalid="this.setCustomValidity('Full Name Required')"
                           oninput="this.setCustomValidity('')"/>
                </li>

                <li>

                    <input id="business_name" type="text" name="business_name" placeholder="Business Name" maxlength="100" size="100"required
                           oninvalid="this.setCustomValidity('Business Name Required')"
                           oninput="this.setCustomValidity('')"/>
                </li>

                <li>
                    <input id="email" type="email" name="email"  placeholder="Email" maxlength="100"  required
                           oninvalid="this.setCustomValidity('Email Required')"
                           oninput="this.setCustomValidity('')"/>
                </li>
                <li>
                    <input id="phone" type="tel" name="phone"  placeholder="555-555-5555 (optional)" style="width: 84%;" maxlength="100"/>

                    <input id="phone_ex" type="tel" name="phone_ex"  placeholder="Ext."  style="width: 14%;" maxlength="10"/>
                    <script>

                        $(document).ready(function () {
                            $('#phone').usPhoneFormat({
                                format: '(xxx) xxx-xxxx',
                            });

                        });

                    </script>

                </li>
                <li>
                    <select id ="state" name = "state">
                        <option value="AL">Alabama</option>
                        <option value="AK">Alaska</option>
                        <option value="AZ">Arizona</option>
                        <option value="AR">Arkansas</option>
                        <option value="CA">California</option>
                        <option value="CO">Colorado</option>
                        <option value="CT">Connecticut</option>
                        <option value="DE">Delaware</option>
                        <option value="DC">District Of Columbia</option>
                        <option value="FL">Florida</option>
                        <option value="GA">Georgia</option>
                        <option value="HI">Hawaii</option>
                        <option value="ID">Idaho</option>
                        <option value="IL">Illinois</option>
                        <option value="IN">Indiana</option>
                        <option value="IA">Iowa</option>
                        <option value="KS">Kansas</option>
                        <option value="KY">Kentucky</option>
                        <option value="LA">Louisiana</option>
                        <option value="ME">Maine</option>
                        <option value="MD">Maryland</option>
                        <option value="MA">Massachusetts</option>
                        <option value="MI">Michigan</option>
                        <option value="MN">Minnesota</option>
                        <option value="MS">Mississippi</option>
                        <option value="MO">Missouri</option>
                        <option value="MT">Montana</option>
                        <option value="NE">Nebraska</option>
                        <option value="NV">Nevada</option>
                        <option value="NH">New Hampshire</option>
                        <option value="NJ">New Jersey</option>
                        <option value="NM">New Mexico</option>
                        <option value="NY">New York</option>
                        <option value="NC">North Carolina</option>
                        <option value="ND">North Dakota</option>
                        <option value="OH">Ohio</option>
                        <option value="OK">Oklahoma</option>
                        <option value="OR">Oregon</option>
                        <option value="PA">Pennsylvania</option>
                        <option value="RI">Rhode Island</option>
                        <option value="SC">South Carolina</option>
                        <option value="SD">South Dakota</option>
                        <option value="TN">Tennessee</option>
                        <option value="TX">Texas</option>
                        <option value="UT">Utah</option>
                        <option value="VT">Vermont</option>
                        <option value="VA">Virginia</option>
                        <option value="WA">Washington</option>
                        <option value="WV">West Virginia</option>
                        <option value="WI">Wisconsin</option>
                        <option value="WY">Wyoming</option>
                    </select oninvalid="this.setCustomValidity('State Required')"oninput="this.setCustomValidity('')"/>
                </li>

                <li style="width: 100%;">
                    <div style="display: inline">
                        <input id="submit" type="submit" value="Sign Up" style="padding: 15px; width: 150px; font-size:18px;">

                    </div>
                </li>
            </ul>
        </form>
        <div id="main">
            <!--

                -->
            <div style="width:390px;  font-family: 'Helvetica', serif; font-size: 17px; margin-left: 150px; ">
                <h1 style="color: #0b568f; font-weight: lighter; text-align: left;">Need Help? </h1>
                If you need assistance or have questions related to signing up for Auction Central please contact us.
                <div>
                    <br>
                    Email:  &#9993; <a href=https://mail.google.com/mail/u/0/?view=cm&fs=1&to=email@domain.com&tf=1>email@aol.com</a>
                    <br>
                    Phone: &#128379; 555-555-5555
                </div>

            </div>

            <div style="display: inline-flex; margin-left: 150px; margin-top: 20px; padding-top: 40px;">
                <img src="../../phonew.png" style="width:130px; height:auto;"/>
                <div style="margin-top: 25px;">
                    <img src="../../google_play.png" alt="Auction Central" style="width:150px; height:auto; "/>
                    <br>
                    <img src="../../ios_appstore.png" alt="Auction Central" style="width:150px; height:auto; "/>
                </div>
            </div>

        </div>
    </div>

    <div style="height: 200px;"></div>
</div>
<footer class="footer">2019 &#169 Auction Central.</footer>
<script src="subscribe.js"></script>
<script src="searchAppraiser.js"></script>
</body>
</html>
