
var glanceVehicle = {};

function glanceFrame(vehicle){
    if(document.getElementsByTagName("iframe"))
    {
        //document.removeChild());
    };
   //var glanceCon = document.getElementById(vehicle);
    //var reportID = glanceCon.getAttribute("value");
    var glanceFrame = document.createElement("iframe");
    glanceFrame.setAttribute("id", "glanceFrame");
    glanceFrame.src = "glanceFrame.php?vehicle=" + vehicle;
    document.getElementById("container").appendChild(glanceFrame);
    document.getElementById("auction").style.filter = "blur(2px)";
    document.getElementById("sideFilter").style.filter = "blur(2px)";
    document.getElementById("vehicle").innerText
}


