<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=0.95 user-scalable=0">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <link rel="stylesheet" href=" navbar.css">
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="auctionForm.css">
    <script src="auctionGlance.js"></script>
    <title>At A Glance</title>
    <link rel="icon" href="../../cropped-auction-icon-app.png">
</head>
<body id="glance">
<div id="glanceContainer">
    <div style="width: 100%">
    <button id="closeGlance" onclick="closeView()">X</button>
    </div>
    <label id ="vehicle" style="width: 60%; margin: auto; display: inherit; padding-top: 15px; font-size: 20px; text-align: center;">1999 Chevrolet Silverado</label>
    <div>
        <label style="width: 100%; display: inherit;
     padding: 10px; font-size: 18px; text-align: center; color: #0b568f; font-weight: bold;">Vehicle Details</label>
  <table style="width: 100%; border:solid; border-width: 2px 0 2px 0; border-color: lightgray;">
      <tr>
          <th style="color: #0b568f; font-size: 18px; float: left; margin-left: 20px;">Carfax</th>
      </tr>
      <tbody>
  <td style="width:50%;">
      <table id= "carfax" style="width: 100%;">
          <tr>
              <th>
                  Carfax Pillars
              </th>
          </tr>
          <tr>
              <td>
                  x
              </td>
              <td>
                  y
              </td>
              <td>
                  z
              </td>
              <td>
                  xyz
              </td>
          </tr>
      </table>
  </td>

  <td style="width:50%;">
      <table style="width: 100%;">
          <tr>
                  <th>
                      Accident Count
                  </th>

              </tr>
              <tr>
                  <td style="text-align: center;">
                     0
                  </td>
          </table>

      </td>
      </tbody>
  </table>
        <table id="autoCheck" style="width: 100%;">
            <tbody style="display: table; table-layout: fixed; width: 100%;">
            <tr style="display: table-caption;">
                <th style="color: #0b568f; font-size: 18px; float: left; margin-left: 20px;">Auto Check</th>
            </tr>
            <tr>
                <th>
                    Title/Probs
                </th>
                <th>
                    Odo
                </th>
                <th>
                  Use/Event
                </th>
                <th>
                    Report
                </th>
            </tr>
            <tr>
                <td>
                   title...
                </td>
                <td>
                   odo...
                </td>
                <td>
                    The...
                </td>
                <td>
                    Report
                </td>
            </tr>
            <table id="mmr" style="width: 100%">
            <tr>
                <th>
                    Score
                </th>
                <th>
                    Similar
                </th>
            </tr>
            <tr>
                <td>
                    100
                </td>
                <td>
                    20-35
                </td>
            </tr>
            </table>
            <table id="mmr" style="width: 100%; border-bottom: 2px solid lightgray;">
            <tr>
                <th>
                    Owners
                </th>
                <th>
                    Accidents
                </th>
            </tr>
            <tr>
                <td>
                   2
                </td>
                <td>
                    0
                </td>
            </tr>
            </table>
            </tbody>
        </table>


        <table id="mmr"; style="width: 100%; ">
            <tr>
                <th style="color: #0b568f; font-size: 18px; float: left; margin-left: 20px;">MMR</th>
            </tr>
            <tbody>
            <tr>
                <th>
                    MMR Wholesale
                </th>
                <th>
                    MMR Est. Retail
                </th>
            </tr>
            <tr>
                <td>
                 $3000
                </td>
                <td>
                    $5500
                </td>
            </tr>
            </tbody>
        </table>

</div>
</div>
<script> var vehicle = new URLSearchParams(document.location.search.substring(1));

console.log(vehicle);
</script>
</body>
</html>


