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
function getReport(){
    global $report_id;
    global $mysqli;

    $statement = $mysqli->prepare("SELECT * FROM conditionReports 
INNER JOIN conditionData ON conditionData.reportID = conditionReports.reportID
INNER JOIN submissionData ON submissionData.reportID = conditionReports.reportID
LEFT JOIN dealerApproval ON dealerApproval.reportID = conditionReports.reportID
WHERE conditionReports.reportID = ?");
    $statement->bind_param("s", $report_id);
    $statement->execute();
    $result = $statement->get_result();

    $response = array();
    while ($row = $result->fetch_array(MYSQLI_ASSOC)) {
        //Condition Report
        $response_row['reportID'] = $report_id;
        $response_row['vStatus'] = $row["vStatus"];
        $response_row['vVIN'] = $row["vVIN"];
        $response_row['vYear'] = $row['vYear'];
        $response_row['vMake'] = $row['vMake'];
        $response_row['vModel'] = $row["vModel"];
        $response_row['vTrim'] = $row['vTrim'];
        $response_row['vTrimList'] = explode(',', str_replace('"', '', $row["vTrimList"]));
        $response_row['vMileage'] = $row["vMileage"];
        $response_row['vEngine'] = $row["vEngine"];
        $response_row['vFuelType'] = $row["vFuelType"];
        $response_row['vTransmission'] = $row["vTransmission"];
        $response_row['vDrivetrain'] = $row["vDrivetrain"];
        $response_row['vExtColor'] = $row["vExtColor"];
        $response_row['vIntColor'] = $row["vIntColor"];
        $response_row['vOptEquipList'] = explode(',', str_replace('"', '', $row["vOptEquipList"]));
        $response_row['vOptEquip'] = explode(',', str_replace('"', '', $row["vOptEquip"]));
        $response_row['trimOptions'] = explode(',', str_replace('"', '', $row["trimOptions"]));
        $response_row['trimSelection'] = str_replace('"', '', $row["trimSelection"]);
        $response_row['dealerID'] = $row["dealerID"];
        $dealer_id = $row["dealerID"];
        $response_row['toDBDTTM'] = $row["toDBDTTM"];

        //Condition Data

        $response_row['vehicleSelections']['Structural']['Selection'] = $row['structuralSelection'];
        $response_row['vehicleSelections']['Structural']['Notes'] = $row['structuralNotes'];

        $response_row['vehicleSelections']['Powertrain']['Selection'] = $row['powertrainSelection'];
        $response_row['vehicleSelections']['Powertrain']['Notes'] = $row['powertrainNotes'];

        $response_row['vehicleSelections']['Exterior']['Selection'] = $row['exteriorSelection'];
        $response_row['vehicleSelections']['Exterior']['Notes'] = $row['exteriorNotes'];

        $response_row['vehicleSelections']['Interior']['Selection'] = $row['interiorSelection'];
        $response_row['vehicleSelections']['Interior']['Notes'] = $row['interiorNotes'];

        $response_row['vehicleSelections']['Windshield']['Selection'] = $row['windshieldSelection'];
        $response_row['vehicleSelections']['Windshield']['Notes'] = $row['windshieldNotes'];

        $response_row['vehicleSelections']['WheelCondition']['Selection'] = $row['wheelConditionSelection'];
        $response_row['vehicleSelections']['WheelCondition']['Notes'] = $row['wheelConditionNotes'];

        $response_row['vehicleSelections']['TireCondition']['Selection'] = $row['tireConditionSelection'];
        $response_row['vehicleSelections']['TireCondition']['Notes'] = $row['tireConditionNotes'];


        $response_row['conditionData']['structuralSelection'] = $row['structuralSelection'];
        $response_row['conditionData']['powertrainSelection'] = $row["powertrainSelection"];
        $response_row['conditionData']['exteriorSelection'] = $row['exteriorSelection'];
        $response_row['conditionData']['interiorSelection'] = $row['interiorSelection'];
        $response_row['conditionData']['windshieldSelection'] = $row["windshieldSelection"];
        $response_row['conditionData']['tireConditionSelection'] = $row['tireConditionSelection'];
        $response_row['conditionData']['paintSelection'] = $row["paintSelection"];
        $response_row['conditionData']['wheelTypeSelection'] = $row["wheelTypeSelection"];
        $response_row['conditionData']['wheelConditionSelection'] = $row["wheelConditionSelection"];
        $response_row['conditionData']['factoryKeyCount'] = $row["factoryKeyCount"];
        $response_row['conditionData']['dashboardIndicators'] = explode(',', str_replace('"', '', $row["dashboardIndicators"]));
        $response_row['conditionData']['structuralYN'] = explode(',', str_replace('"', '', $row["structuralYN"]));

        $response_row['conditionData']['powertrainYN'] = str_getcsv(substr_replace($row["powertrainYN"], "", -1), ',');
        $response_row['conditionData']['exteriorYN'] = explode(',', str_replace('"', '', $row["exteriorYN"]));
        $response_row['conditionData']['interiorYN'] = explode(',', str_replace('"', '', $row["interiorYN"]));
        $response_row['conditionData']['tireConditionYN'] = explode(',', str_replace('"', '', $row["tireConditionYN"]));
        $response_row['conditionData']['wheelConditionYN'] = explode(',', str_replace('"', '', $row["wheelConditionYN"]));
        $response_row['conditionData']['structuralNotes'] = $row["structuralNotes"];
        $response_row['conditionData']['powertrainNotes'] = $row["powertrainNotes"];
        $response_row['conditionData']['exteriorNotes'] = $row["exteriorNotes"];
        $response_row['conditionData']['interiorNotes'] = $row["interiorNotes"];
        $response_row['conditionData']['paintNotes'] = $row["paintNotes"];
        $response_row['conditionData']['interiorNotes'] = $row["interiorNotes"];
        $response_row['conditionData']['tireConditionNotes'] = $row["tireConditionNotes"];
        $response_row['conditionData']['windshieldNotes'] = $row["windshieldNotes"];
        $response_row['conditionData']['wheelConditionNotes'] = $row["wheelConditionNotes"];
        $response_row['conditionData']['optionalNotes'] = $row["optionalNotes"];

        //submissionData
        $response_row['submissionData']['submissionDTTM'] = $row["submissionDTTM"];
        $response_row['submissionData']['appraiserEmail'] = $row["appraiserEmail"];
        $response_row['submissionData']['startDTTM'] = $row["startDTTM"];

        //dealerApproval
        $response_row["dealerApproval"]["ownership"] = $row["ownership"];
        $response_row["dealerApproval"]["presentTitle"] = $row["presentTitle"];
        $response_row["dealerApproval"]["reservePrice"] = $row["reservePrice"];
        $response_row["dealerApproval"]["titleComments"] = $row["titleComments"];
        $response_row["dealerApproval"]["dealerComments"] = $row["dealerComments"];
        $response_row["dealerApproval"]["conditionReportComments"] = $row["conditionReportComments"];
        $response[$report_id] = $response_row;

    }

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

//Dealer Info Data
    $statement = $mysqli->prepare("SELECT * FROM dealers WHERE dealerID = ?");
    $statement->bind_param("s", $dealer_id);
    $statement->execute();
    $result = $statement->get_result();

    while ($row = $result->fetch_array(MYSQLI_ASSOC)) {
        $response[$report_id]["dealerName"] = $row{"dealerName"};
        $response[$report_id]["streetName"] = $row{"streetName"};
        $response[$report_id]["city"] = $row{"city"};
        $response[$report_id]["state"] = $row{"state"};
        $response[$report_id]["zip"] = $row{"zip"};
    }
    echo json_encode($response);
}

function getRequest(){
    global $report_id;
    global $mysqli;

    $statement = $mysqli->prepare("SELECT * FROM conditionReports
 INNER JOIN conditionReportRequest ON conditionReportRequest.reportID = conditionReports.reportID
 WHERE conditionReports.reportID = ?");
    $statement->bind_param("s", $report_id);
    $statement->execute();
    $result = $statement->get_result();
    $response = array();
    while ($row = $result->fetch_array(MYSQLI_ASSOC)) {
        $response[$report_id]["vVIN"] = $row{"vVIN"};
        $response[$report_id]["vMake"] = $row{"vMake"};
        $response[$report_id]["vModel"] = $row{"vModel"};
        $response[$report_id]["vYear"] = $row{"vYear"};
        $response[$report_id]["dealerID"] = $row{"dealerID"};
        $dealer_id = $row{"dealerID"};
        $response[$report_id]["submissionData"]['submissionDTTM'] = $row{"toDBDTTM"};
        $response[$report_id]["submissionData"]["appraiserEmail"] = $row{"userEmail"};
    }

    $statement = $mysqli->prepare("SELECT * FROM dealers WHERE dealerID = ?");
    $statement->bind_param("s", $dealer_id);
    $statement->execute();
    $result = $statement->get_result();
    while ($row = $result->fetch_array(MYSQLI_ASSOC)) {
        $response[$report_id]["dealerName"] = $row{"dealerName"};
        $response[$report_id]["city"] = $row{"city"};
        $response[$report_id]["zip"] = $row{"zip"};
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


if($status == "Waiting Appraisal"){
    getRequest();
}
else{
    getReport();
}

?>

