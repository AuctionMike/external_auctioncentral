<?php  session_start(); ?>
<?php
require_once('/var/www/html/vendor/autoload.php');
require_once('/var/www/html/config.inc.php');
use Kreait\Firebase\Factory;
use Kreait\Firebase\ServiceAccount;

if (isset($_POST["email"], $_POST["password"])) {
    $email = (trim($_POST["email"]) != "") ? $_POST["email"] : NULL;
    $password = ($_POST["password"] != '') ? $_POST["password"] : NULL;
    $email_hashed = hash('sha256', $email);
    $password_hashed = hash('sha256', $password);


    //$host = "35.188.133.252";
    //$db_user = "root";
    //$db_password = "6+62iya3n4q8";
    //$db_name = "auction_central_um";

    //$mysqli = new mysqli($host, $db_user, $db_password, $db_name);

    //if (!$mysqli) {
    //	die("Connection failed: " . mysqli_connect_error());
    //}

    # Firebase
    $serviceAccount = ServiceAccount::fromJsonFile('/var/www/html/auction-central-211613-e96717bd4088.json');
    $firebase = (new Factory)
        ->withServiceAccount($serviceAccount)
        ->create();
    $auth = $firebase->getAuth();
    $response = array();

    try {
        $user = $auth->verifyPassword($email, $password);
        $uid = $user->uid;

        $database = $firebase->getDatabase();
        $path = "/user_permissions/" . $uid . "/";
        $ref = $database->getReference($path);

        $_SESSION["email_id"] = $email;

        header("HTTP/1.1 200");
        $response["success"] = true;
    } catch (Kreait\Firebase\Exception\Auth\InvalidPassword $e) {
        //header("location: index.php");
        header("HTTP/1.1 401 Unauthorized");
        $response["success"] = false;
        header("location: login.php");
    }

    echo json_encode($response);
} else {
    header("HTTP/1.1 401 Unauthorized");
    $response["success"] = false;
}
?>