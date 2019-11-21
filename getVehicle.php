<?php
//
// getVehicles .php
// Auction Central
//
// Created by Nick Snyder on 10/21/2019
// Copyright © 2019 Auction Central, LLC. All rights reserved.
//

require_once('/var/www/html/vendor/autoload.php');
use Kreait\Firebase\Factory;
use Kreait\Firebase\ServiceAccount;

$reportID = $_GET["report_id"];

$f = fopen("/var/www/html/auctioncentral/getVehicleObj.txt", "w");
fwrite($f, json_encode($reportID, JSON_PRETTY_PRINT));

$date_format = 'Y-m-d H:i:s';

// Firebase connection
$serviceAccount = ServiceAccount::fromJsonFile('/var/www/html/auction-central-211613-e96717bd4088.json');
$firebase = (new Factory)
    ->withServiceAccount($serviceAccount)
    ->create();
$database = $firebase->getDatabase();
$current_date_obj = new DateTime();
$current_date = $current_date_obj->format('Y-m-d');
$ref = $database->getReference($current_date)->getChild($reportID)->getValue();

if ($data['time_offset'] == null) {
    $time_offset = date($date_format);
} else {
    $time_offset = $data['time_offset'];
}
    // Get the vehicle

echo(json_encode($ref));
?>
