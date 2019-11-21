<?php
require_once('/var/www/html/config.inc.php');
require '/var/www/html/vendor/autoload.php';
use Kreait\Firebase\Factory;
use Kreait\Firebase\ServiceAccount;

function getCSV($array){
    if (!empty($array)) {
        str_getcsv(substr_replace($array, "", -1), ',');
    } else {
        $array = NULL;
    }
    return $array;
}

//grab record based on the reportID
function getImages(){
    global $report_id;
    global $mysqli;

    $response = array();


//Report Images
    $statement = $mysqli->prepare("SELECT * FROM reportImages WHERE reportID = ?");
    $statement->bind_param("s", $report_id);
    $statement->execute();
    $result = $statement->get_result();

    $i = 0;
    while ($row = $result->fetch_array(MYSQLI_ASSOC)) {
        if (!(array_key_exists($row['imageType'], $response[$row['reportID']]))) {
            $response[$row['reportID']][$row['imageType']] = array($row["imageURL"]);
        } else {
            array_push($response[$row['reportID']][$row['imageType']], $row["imageURL"]);
        }
    }

    echo json_encode($response);
}


global $report_id;
global $dealer_id;
global $status;
global $search;
global $query_string;
global $tableSize;
$report_id = utf8_decode(urldecode($_GET["report_id"]));
$dealer_id;
$viewDenied = $_GET["viewDenied"];
$status = $_GET["status"];
$search = $_GET["searchBy"];
$query_string = utf8_decode(urldecode($_GET["query_string"]));
$tableSize = utf8_decode(urldecode($_GET["tableSize"]));


getImages();

?>

