<?php session_start(); ?>
<?php
require_once('/var/www/html/config.inc.php');

if (!isset ($_SESSION["email_id"])) {
    $uri = $_SERVER['REQUEST_URI'];
    if(($uri == '/') || ($uri == '/subscribe.php')){
        //echo($uri);
    }
    else{
        header("location: login.php");
    }
}
if (isset ($_SESSION["email_id"])) {

    //IF acUSER
    $statement = $mysqli->prepare("SELECT * FROM acUsers WHERE email=?");
    $statement->bind_param("s", $_SESSION["email_id"]);
    $statement->execute();
    $result = $statement->get_result();
    $row = $result->fetch_assoc();
    if (!empty($row)) {
        //AC USER PERMISSIONS
        $id = $row["id"];
        setcookie("id", $id, time() + (86400 * 7), "/") or die('unable to create cookie');
        $root = $row["root"];
        if ($root == "true") {
            setcookie("root", $root, time() + (86400 * 7), "/") or die('unable to create cookie');
        }
        $acctManager = $row["acctManager"];
        if ($acctManager == "true") {
            setcookie("acctManager", $acctManager, time() + (86400 * 7), "/") or die('unable to create cookie');
        }
        $processor = $row["processor"];
        if ($processor  == "true") {
            setcookie("processor", $processor, time() + (86400 * 7), "/") or die('unable to create cookie');
        }
        setcookie("userType", "acUser", time() + (86400 * 7), "/") or die('unable to create cookie');
        $firstName = $row["firstName"];
        setcookie("userName", $firstName, time() + (86400 * 7), "/") or die('unable to create cookie');
    }

    else {
        //IF dealerUser
        $statement = $mysqli->prepare("SELECT * FROM dealerUsers WHERE email=?");
        $statement->bind_param("s", $_SESSION["email_id"]);
        $statement->execute();
        $result = $statement->get_result();
        $row = $result->fetch_assoc();
        if (!empty($row)) {
            //dealerUser PERMISSIONS
            $id = $row["id"];
            setcookie("id", $id, time() + (86400 * 7), "/") or die('unable to create cookie');
            $dealerID = $row["dealerID"];

            $admin = $row["administrator"];
            if ($admin == "true") {
                setcookie("administrator", $admin, time() + (86400 * 7), "/") or die('unable to create cookie');
            }
            $billing = $row["billing"];
            if ($billing == "true") {
                setcookie("billing", $billing, time() + (86400 * 7), "/") or die('unable to create cookie');
            }
            $buyer = $row["buyer"];
            if ($buyer == "true") {
                setcookie("buyer", $buyer, time() + (86400 * 7), "/") or die('unable to create cookie');
            }
            $appraiser = $row["appraiser"];
            if ($appraiser == "true") {
                setcookie("appraiser", $appraiser, time() + (86400 * 7), "/") or die('unable to create cookie');
            }
            $sellerApprover = $row["sellerApprover"];
            if ($sellerApprover == "true") {
                setcookie("sellerApprover", $sellerApprover, time() + (86400 * 7), "/") or die('unable to create cookie');
            }
            $titleClerk = $row["titleClerk"];
            if ($titleClerk == "true") {
                setcookie("titleClerk", $titleClerk, time() + (86400 * 7), "/") or die('unable to create cookie');
            }
            setcookie("userType", "dealerUser", time() + (86400 * 7), "/") or die('unable to create cookie');
            $firstName = $row["firstName"];
            setcookie("userName", $firstName, time() + (86400 * 7), "/") or die('unable to create cookie');
        }

        $statement = $mysqli->prepare("SELECT dealerName FROM dealers WHERE dealerID=?");
        $statement->bind_param("s", $dealerID);
        $statement->execute();
        $result = $statement->get_result();
        $row = $result->fetch_assoc();
        if (!empty($row)) {
            $dealerName = $row["dealerName"];
            $dealerName = str_replace("+", " ", $dealerName);
            setcookie("dealerName", $dealerName, time() + (86400 * 7), "/") or die('unable to create cookie');

        }
        else{
            //APPRAISER
            $statement = $mysqli->prepare("SELECT * FROM appraisers WHERE email=?");
            $statement->bind_param("s", $_SESSION["email_id"]);
            $statement->execute();
            $result = $statement->get_result();
            $row = $result->fetch_assoc();
            if (!empty($row)) {
                //permission cookies
                setcookie("userType", "appraiser", time() + (86400 * 7), "/") or die('unable to create cookie');
                $firstName = $row["firstName"];
                setcookie("userName", $firstName, time() + (86400 * 7), "/") or die('unable to create cookie');
            }

        }
    }



    $response = array();

}
?>