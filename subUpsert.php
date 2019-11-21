<?php
$host = "35.188.133.252";
$db_user = "root";
$db_password = "6+62iya3n4q8";
$db_name = "auction_central_um";

$mysqli = new mysqli($host, $db_user, $db_password, $db_name);

if (!$mysqli) {
    die("Connection failed: " . mysqli_connect_error());
}

$fullName = ($_POST["fullName"] != '') ? $_POST["fullName"] : NULL;
$businessName = (trim($_POST["business_name"]) != "") ? $_POST["business_name"] : NULL;
$email = ($_POST["email"] != '') ? $_POST["email"] : NULL;
$phone = (trim($_POST["phone"]) != "") ? $_POST["phone"] : NULL;
$ext = (trim($_POST["phone_ex"]) != "") ? $_POST["phone_ex"] : NULL;
$state = (trim($_POST["state"]) != "") ? $_POST["state"] : NULL;

//check mySQL for email
$statement = $mysqli->prepare("SELECT email FROM subscribers WHERE email = ?");
$statement->bind_param("s", $email);
$statement->execute();
$emailExist = $statement->get_result();

if($emailExist->num_rows == 0)
{

    // Get current datetime for eastern timezone
    $tz = 'America/New_York';
    $tz_obj = new DateTimeZone($tz);
    $dttm = new DateTime("now", $tz_obj);
    $dttm_formatted = $dttm->format('Y-m-d h:i:s');

    $statement = $mysqli->prepare("INSERT INTO subscribers (fullName, businessName, email, phone, ext, state, createDate) VALUES (?, ?, ?, ?, ?, ?, ?)");
    $statement->bind_param("sssssss", $fullName, $businessName, $email, $phone, $ext, $state, $dttm_formatted);
    $query = $statement->execute();

    if ($query) {
        $response["success"] = true;
        $response['errorMsg'] = "Successful, new subscriber created.";
    } else {
        $error = $statement->error;
        $f = fopen("/var/www/html/tmp/errors.txt", "w");
        fwrite($f, $dealerID);
        $response['success'] = false;
        $response['errorMsg'] = "Failed, User was not created. Please verify the information you have provided is correct.";
    }
}
else{
    $error = $statement->error;
    $f = fopen("/var/www/html/tmp/errors.txt", "w");
    fwrite($f, $error);
    $response['success'] = false;
    $response['errorMsg'] = "Failed, This email is already in use. Please try a different email.";
}

echo json_encode($response);
?>