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

function getLatLng($values) {
  // Extract data from posted object
  $distance = $values[0];
  $from_zip = $values[1];
  $users_lat = $values[2];
  $users_lng = $values[3];

  // Check if either the lat || lng is "" or null
  if (empty($users_lat) || empty($users_lng)) {
    $api_endpoint = "https://maps.googleapis.com/maps/api/geocode/json?components=postal_code:" . $from_zip . "&sensor=false&key=AIzaSyC7gYTOBIlRo3mVaDngLDp8SDjIaGZfuAo";

    $response = json_decode(file_get_contents($api_endpoint), true);
    $users_lat = $response["results"][0]["geometry"]["location"]["lat"];
    $users_lng = $response["results"][0]["geometry"]["location"]["lng"];
  }

  // Calculate the mins and maxs lat and lng
  $R = 3960;  // earth's mean radius

  // first-cut bounding box (in degrees)
  $max_lat = $users_lat + rad2deg($users_rad/$R);
  $min_lat = $users_lat - rad2deg($users_rad/$R);

  // compensate for degrees longitude getting smaller with increasing latitude
  $max_lng = $users_lng + rad2deg($users_rad/$R/cos(deg2rad($users_lat)));
  $min_lng = $users_lng - rad2deg($users_rad/$R/cos(deg2rad($users_lat)));

  $max_lat=number_format((double)$max_lat, 8, '.', '');
  $min_lat=number_format((double)$min_lat, 8, '.', '');
  $max_lng=number_format((double)$max_lng, 8, '.', '');
  $min_lng=number_format((double)$min_lng, 8, '.', '');

  return [$max_lat,$min_lat,$max_lng,$min_lng];
}

function distanceCheck($key, $vehicle, $lat_lng_data) {
  if ($vehicle["lat"] <= $lat_lng_data[0] && $vehicle["lat"] >= $lat_lng_data[1] &&
      $vehicle["lng"] <= $lat_lng_data[0] && $vehicle["lng"] >= $lat_lng_data[1]) {
    return true;
  } else {
    return false;
  }
}

function rangeCheck($key, $vehicle, $filter) {
  if ($vehicle[$key] >= $filter["values"][0] && $vehicle[$key] <= $filter["values"][1]) {
    // TODO - Handle distance
    return true;
  } else {
    return false;
  }
}

function selectionCheck($key, $vehicle, $filter) {
  if (in_array($vehicle[$key], $filter["values"])) {
    return true;
  } else {
    return false;
  }
}

// Post params
$data = json_decode(file_get_contents("php://input"), true);

$f = fopen("/var/www/html/auctioncentral/vehicleRequestObj.txt", "w");
fwrite($f, json_encode($data, JSON_PRETTY_PRINT));

// Application variables
$date_format = 'Y-m-d H:i:s';
$vehicles_found = 0;
$vehicle_list = array();
$request_size = 10;// change to 1000;

// If there aren't any filters then we only need to grab what was requested
if (empty($data["filters"])) {
  $request_size = $data["vehicle_count"];
}

// Firebase connection
$serviceAccount = ServiceAccount::fromJsonFile('/var/www/html/auction-central-211613-e96717bd4088.json');
$firebase = (new Factory)
    ->withServiceAccount($serviceAccount)
    ->create();
$database = $firebase->getDatabase();
$current_date_obj = new DateTime();
$current_date = $current_date_obj->format('Y-m-d');
$ref = $database->getReference($current_date);

// Check if there is a distance filter
foreach ($data["filters"] as $filter) {
  if ($filter["type"] == "distance") {
    $lat_lng_data = getLatLng($filter["values"]);
    break;
  }
}

if (empty($data['time_offset'])) {
  $time_offset = date($date_format);
} else {
  $time_offset = $data['time_offset'];
}

// Attempt to get the requested number of vehicles 
while (true) {
  // Get the set of vehicles
  $vehicles = $ref->orderByChild('end_time')
                  ->startAt($time_offset)
                  ->endAt(date($date_format, strtotime("+20 minutes")))
                  ->limitToFirst($request_size)
                  ->getSnapshot()
                  ->getValue();

  if (empty($data["filters"])) {
    $vehicle_list = $vehicles;
    break;
  }

  foreach ($vehicles as $key => $value) {
    $vehicle_match = true;

    // Filter data
    foreach ($data["filters"] as $filter) {
      if ($filter["type"] == "range") {
        if (!rangeCheck($key, $value, $filter)) {
          $vehicle_match = false;
          break;
        }
      } else if ($filter["type"] == "selection") {
        if (!selectionCheck($key, $value, $filter)) {
          $vehicle_match = false;
          break;
        }
      } else if ($filter["type"] == "distance") {
        if (!distanceCheck($key, $value, $data, $lat_lng_data)) {
          $vehicle_match = false;
        }
      }
    }

    // Finished filtering. Check if vehicle is match
    if ($vehicle_match) {
      array_push($vehicle_list, [$key=>$value]);
    }
  }

  fwrite($f, "\nvehicle count :\n");
  fwrite($f, count(array_keys($vehicle_list)));
  fwrite($f, "\n\n");

  // Set the time_offset
  $time_offset = end($vehicles)["end_time"];

  // Check if we have the requested number of vehicles
  // If not, then check if we have more vehicles to check
  if (count(array_keys($vehicle_list)) >= $data["vehicle_count"] || count($vehicles) < $request_size) {
    fwrite($f, "\n\n");
    fwrite($f, "here in break\n");
    break;
  }

  break; // temp temp
}

$response = array();
$response["vehicles"] = $vehicle_list;

// Get the response offset
if (!empty($vehicle_list)) {
  $response["offset"] = end($vehicle_list)["end_time"];
} else {
  $response["offset"] = $data["time_offset"];
}

echo(json_encode($response));
?>
