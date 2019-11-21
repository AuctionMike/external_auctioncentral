//filter request object
var vehicleRequest = {};
var priceRange = [];
var mileageRange = [];
var yearRange = [];
var makeSelect = [];
var modelSelect = [];
var bodySelect = [];
var driveSelect = [];
var fuelSelect = [];
var tranSelect = [];


//temp static arrays
//these values will change or be loaded from the object
var years = [2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019];
var makes = ["Acura","Alfa Romeo","AM General","AMC","Aston Martin","Audi","Bentley","BMW","Bugatti","Buick",
    "Cadillac","Chevrolet","Chrysler","Daewoo","Daihatsu","Datsun","DeLorean","Dodge","Eagle","Ferrari","FIAT",
    "Fisker","Ford","Genesis","Geo","GMC","Honda","HUMMER","Hyundai","INFINITI","Isuzu","Jaguar","Jeep","Karma",
    "Kia","Lamborghini","Land Rover","Lexus","Lincoln","Lotus","Maserati","Maybach","Mazda","McLaren","Mercedes-Benz",
    "Mercury","Merkur","MINI","Mitsubishi","Nissan","Oldsmobile","Panoz","Pininfarina","Plymouth","Pontiac","Porsche",
    "Ram","Renault","Rolls-Royce","Saab","Saturn","Scion","Smart","Sterling","Subaru","Suzuki","Tesla","Toyota",
    "Volkswagen","Volvo","Yugo"];

var bodyType = ['Car','Truck','SUV','Van'];
var driveTrain = ["FWD", "4WD", "AWD", "RWD"];
var fuelType = ["Gasoline", "Diesel", "Hybrid","Electric"];
var transmission = ["Automatic", "Manual"];
var vehicle_request_ct = 10;


//-----------FILTER FUNCTIONS---------//
function setPrice(){
    document.getElementById("price").style.color = "white";
    document.getElementById("price").style.backgroundColor = "#0b568f";
    var bid_price = {};
    bid_price["type"] = "range";
    bid_price["values"] = [];
    removeInputs();
    if(document.getElementById("priceFilter")){
        document.getElementById("filterContainer").removeChild(document.getElementById("priceFilter"));
    }
    var sideFilter = document.getElementById("filterContainer");
    var priceFilter = document.createElement("div");
    priceFilter.setAttribute("id", "priceFilter");
    var priceMin = document.createElement("input");
    priceMin.setAttribute("id", "priceMin");
    priceMin.style.width = "70px";
    priceMin.style.borderBottom = "solid 1px black";
    var priceMax = document.createElement("input");
    priceMax.setAttribute("id", "priceMax");
    priceMax.style.width = "70px";
    priceMax.style.borderBottom = "solid 1px black";
    var toLabel = document.createElement("text");
    toLabel.innerText = "to";
    toLabel.style.color = "black";
    priceMin.addEventListener("change", function () {
        bid_price["values"][0] = document.getElementById("priceMin").value;
        priceRange[0] =  document.getElementById("priceMin").value;
        document.getElementById("priceMin").value = "$" +  document.getElementById("priceMin").value;
    });
    priceMax.addEventListener("change", function () {
        bid_price["values"][1] = document.getElementById("priceMax").value;
        priceRange[1] =  document.getElementById("priceMax").value;
        document.getElementById("priceMax").value = "$" +  document.getElementById("priceMax").value;
    });

    var priceConfirm = document.createElement("button");
    priceConfirm.setAttribute("id", "dropdownButton");
    priceConfirm.innerHTML = "&#10003;";
    priceConfirm.style.fontSize = "12px";
    priceConfirm.style.marginLeft = "5px";
    priceConfirm.style.display = "inherit";
    priceConfirm.addEventListener("click", function () {
        priceMin = document.getElementById("priceMin").value;
        priceMax = document.getElementById("priceMax").value;
        bid_price["values"][0] = (document.getElementById("priceMin").value).substring(1,2);
        bid_price["values"][1] = (document.getElementById("priceMax").value).substring(1,2);
        sideFilter.removeChild(priceFilter);
        document.getElementById("price").innerText = "Price " + '✓';
    });

    priceFilter.setAttribute("class", "animateInput");
    priceFilter.appendChild(priceMin);
    priceFilter.appendChild(toLabel);
    priceFilter.appendChild(priceMax);
    priceFilter.appendChild(priceConfirm);
    sideFilter.appendChild(priceFilter);

    if(priceRange[0]){
        priceMin.value = "$" + priceRange[0];
    }
    if(priceRange[1] > 0){
        priceMax.value = "$" +priceRange[1];
    }
    vehicleRequest["bid_price"] = bid_price;
}

function setMileage(){
    document.getElementById("mileage").style.color = "white";
    document.getElementById("mileage").style.backgroundColor = "#0b568f";
    var vehicle_mileage = {};
    vehicle_mileage["type"] = "range";
    vehicle_mileage["values"] = [];
    removeInputs();
    if(document.getElementById("priceFilter")){
        document.getElementById("filterContainer").removeChild(document.getElementById("priceFilter"));
    }
    var sideFilter = document.getElementById("filterContainer");
    var priceFilter = document.createElement("div");
    priceFilter.setAttribute("id", "mileageFilter");
    var priceMin = document.createElement("input");
    priceMin.setAttribute("id", "priceMin");
    priceMin.style.width = "70px";
    priceMin.style.borderBottom = "solid 1px black";
    var priceMax = document.createElement("input");
    priceMax.setAttribute("id", "priceMax");
    priceMax.style.width = "70px";
    priceMax.style.borderBottom = "solid 1px black";
    var toLabel = document.createElement("text");
    toLabel.innerText = "to";
    toLabel.style.color = "black";
    priceMin.addEventListener("change", function () {
        vehicle_mileage["values"][0] = document.getElementById("priceMin").value;
        mileageRange[0] =  document.getElementById("priceMin").value;
    });
    priceMax.addEventListener("change", function () {
        vehicle_mileage["values"][1] = document.getElementById("priceMax").value;
        mileageRange[1] =  document.getElementById("priceMax").value;
        document.getElementById("priceMax").value = document.getElementById("priceMax").value;
    });

    var mileageConfirm = document.createElement("button");
    mileageConfirm.setAttribute("id", "dropdownButton");
    mileageConfirm.innerHTML = "&#10003;";
    mileageConfirm.style.fontSize = "12px";
    mileageConfirm.style.marginLeft = "5px";
    mileageConfirm.style.display = "inherit";
    mileageConfirm.addEventListener("click", function () {
        priceMin = document.getElementById("priceMin").value;
        priceMax = document.getElementById("priceMax").value;
        vehicle_mileage["values"][0] = document.getElementById("priceMin").value;
        vehicle_mileage["values"][1] = document.getElementById("priceMax").value;
        sideFilter.removeChild(priceFilter);
        document.getElementById("mileage").innerText = "Mileage " + '✓';
    });

    priceFilter.setAttribute("class", "animateInput");
    priceFilter.appendChild(priceMin);
    priceFilter.appendChild(toLabel);
    priceFilter.appendChild(priceMax);
    priceFilter.appendChild(mileageConfirm);
    sideFilter.appendChild(priceFilter);

    if(mileageRange[0]){
        priceMin.value =  mileageRange[0];
    }
    if( mileageRange[1] > 0){
        priceMax.value =  mileageRange[1];
    }
    vehicleRequest["vehicle_mileage"] = vehicle_mileage;
}


function setYear() {
    document.getElementById("year").style.color = "white";
    document.getElementById("year").style.backgroundColor = "#0b568f";
    var vehicle_year = {};
    vehicle_year["type"] = "range";
    vehicle_year["values"] = [];
    removeInputs();
    if(document.getElementById("priceFilter")){
        document.getElementById("filterContainer").removeChild(document.getElementById("priceFilter"));
    }
    var sideFilter = document.getElementById("filterContainer");
    var priceFilter = document.createElement("div");
    priceFilter.setAttribute("id", "yearFilter");
    var priceMin = document.createElement("input");
    priceMin.setAttribute("id", "yearMin");
    priceMin.style.width = "70px";
    priceMin.style.borderBottom = "solid 1px black";
    var priceMax = document.createElement("input");
    priceMax.setAttribute("id", "yearMax");
    priceMax.style.width = "70px";
    priceMax.style.borderBottom = "solid 1px black";
    var toLabel = document.createElement("text");
    toLabel.innerText = "to";
    toLabel.style.color = "black";
    priceMin.addEventListener("change", function () {
        vehicle_year["values"][0] = document.getElementById("yearMin").value;
        yearRange[0] =  document.getElementById("yearMin").value;
        document.getElementById("yearMin").value = document.getElementById("yearMin").value;
    });
    priceMax.addEventListener("change", function () {
        vehicle_year["values"][1] = document.getElementById("yearMax").value;
        yearRange[1] =  document.getElementById("yearMax").value;
        document.getElementById("yearMax").value = document.getElementById("yearMax").value;
    });

    var mileageConfirm = document.createElement("button");
    mileageConfirm.setAttribute("id", "dropdownButton");
    mileageConfirm.innerHTML = "&#10003;";
    mileageConfirm.style.fontSize = "12px";
    mileageConfirm.style.marginLeft = "5px";
    mileageConfirm.style.display = "inherit";
    mileageConfirm.addEventListener("click", function () {
        priceMin = document.getElementById("yearMin").value;
        priceMax = document.getElementById("yearMax").value;

        if(priceMin < "1930" || priceMin > new Date().getFullYear())
        {
            alert("Please enter a year greater than 1930.");
            document.getElementById("yearMin").value = "";
            document.getElementById("yearMin").style.borderColor = "solid 1px red";
        }
        if (priceMax > new Date().getFullYear() || priceMax < "1930"){
            alert("Please enter the current year or a past year.");
            document.getElementById("yearMax").value = "";
        }
        else if( priceMin > "1930" && priceMax <= new Date().getFullYear()) {
            vehicle_year["values"][0] = document.getElementById("yearMin").value;
            vehicle_year["values"][1] = document.getElementById("yearMax").value;
            vehicleRequest["vehicle_year"] = vehicle_year;
            sideFilter.removeChild(priceFilter);
            document.getElementById("year").innerText = "Year " + '✓';
        }
    });

    priceFilter.setAttribute("class", "animateInput");
    priceFilter.appendChild(priceMin);
    priceFilter.appendChild(toLabel);
    priceFilter.appendChild(priceMax);
    priceFilter.appendChild(mileageConfirm);
    sideFilter.appendChild(priceFilter);

    if(yearRange[0]){
        priceMin.value =  yearRange[0];
    }
    if(yearRange[1]){
        priceMax.value =  yearRange[1];
    }
    vehicleRequest["vehicle_year"] = vehicle_year;
}


function setMake(){
    document.getElementById("make").style.color = "white";
    document.getElementById("make").style.backgroundColor = "#0b568f";
    var vehicle_make = {};
    vehicle_make["type"] = "selection";
    vehicle_make["selection"] = [];
    removeInputs();
    if(document.getElementById("priceFilter")){
        document.getElementById("filterContainer").removeChild(document.getElementById("priceFilter"));
    }
    var sideFilter = document.getElementById("filterContainer");
    var priceFilter = document.createElement("div");
    priceFilter.setAttribute("id", "makeFilter");
    console.log("SET MAKE");

    var makeContainer = document.createElement("div");
    makeContainer.setAttribute("class", "dropdownContainer");
    var makeDropdown = document.createElement("form");
    makeDropdown.setAttribute("id", "makeDropdown");
    makeContainer.appendChild(makeDropdown);
    priceFilter.appendChild(makeContainer);

    //select all
    var label = document.createElement("label");
    var selectAll = document.createElement("input");
    selectAll.setAttribute("type", "checkbox");
    selectAll.style.marginLeft = "5px";
    selectAll.setAttribute("value", "selectAll");
    label.innerText = "Select All";
    label.appendChild(selectAll);
    makeDropdown.appendChild(label);


    //list of models
    for(var i = 0; i < makes.length; i++) {
        var label = document.createElement("label");
        var makeInput = document.createElement("input");
        makeInput.setAttribute("type", "checkbox");
        makeInput.style.marginLeft = "5px";
        makeInput.setAttribute("value", makes[i]);
        label.innerText = makes[i];
        label.appendChild(makeInput);
        makeDropdown.appendChild(label);

        for(var j = 0; j < makeSelect.length; j++) {
            if (makes[i] == makeSelect[i]) {
                makeInput.checked = true;
            }
        }
        makeInput.addEventListener("change", function () {
            if (this.checked == true) {
                vehicle_make["selection"].push(this.value);
            } else {
                vehicle_make["selection"].splice(vehicle_make["selection"].indexOf(this.id));
            }
        });
    }

    selectAll.addEventListener("change", function () {
        var makeCheckboxes = makeDropdown.getElementsByTagName("input");
        console.log("select all: " + makeCheckboxes);
        for(var l = 0; l < makeCheckboxes.length; l++){
            makeCheckboxes[l].checked = selectAll.checked;
        }
    });

    var makeConfirm = document.createElement("button");
    makeConfirm.setAttribute("id", "dropdownButton");
    makeConfirm.innerText = "Apply";
    makeConfirm.addEventListener("click", function () {
        var makeCheckboxes = makeDropdown.getElementsByTagName("input");
        for(var i = 1; i < makeCheckboxes.length; i++) {
            if (makeCheckboxes[i].checked == true) {
                vehicle_make["selection"].push(makeCheckboxes[i].value);
            }
        }
        sideFilter.removeChild(priceFilter);
        document.getElementById("make").innerText = "Make " + '✓';
    });
    priceFilter.setAttribute("class", "animateDropdown");
    makeContainer.appendChild(makeDropdown);
    makeContainer.appendChild(makeConfirm);
    priceFilter.appendChild(makeContainer);
    sideFilter.appendChild(priceFilter);

    vehicleRequest["vehicle_make"] = vehicle_make;
    makeSelect = vehicle_make;
}

function setModel(){
    document.getElementById("model").style.color = "white";
    document.getElementById("model").style.backgroundColor = "#0b568f";
    var vehicle_model = {};
    vehicle_model["type"] = "selection";
    vehicle_model["selection"] = [];
    removeInputs();
    if(document.getElementById("priceFilter")){
        document.getElementById("filterContainer").removeChild(document.getElementById("priceFilter"));
    }
    var sideFilter = document.getElementById("filterContainer");
    var priceFilter = document.createElement("div");
    priceFilter.setAttribute("id", "modelFilter");
    console.log("SET MODEL");

    var makeContainer = document.createElement("div");
    makeContainer.setAttribute("class", "dropdownContainer");
    var modelDropdown = document.createElement("form");
    modelDropdown.setAttribute("id", "modelDropdown");
    makeContainer.appendChild(modelDropdown);
    priceFilter.appendChild(makeContainer);

    //select all
    var label = document.createElement("label");
    var selectAll = document.createElement("input");
    selectAll.setAttribute("type", "checkbox");
    selectAll.style.marginLeft = "5px";
    selectAll.setAttribute("value", "selectAll");
    label.innerText = "Select All";
    label.appendChild(selectAll);
    modelDropdown.appendChild(label);


    //list of makes
    for(var i = 0; i < models.length; i++) {
        var label = document.createElement("label");
        var makeInput = document.createElement("input");
        makeInput.setAttribute("type", "checkbox");
        makeInput.style.marginLeft = "5px";
        makeInput.setAttribute("value", models[i]);
        label.innerText = models[i];
        label.appendChild(makeInput);
        modelDropdown.appendChild(label);

        for(var j = 0; j < modelSelect.length; j++) {
            if (models[i] == modelSelect[i]) {
                makeInput.checked = true;
            }
        }
        makeInput.addEventListener("change", function () {
            if (this.checked == true) {
                vehicle_model["selection"].push(this.value);
            } else {
                vehicle_model["selection"].splice(vehicle_model["selection"].indexOf(this.id));
            }
        });
    }

    selectAll.addEventListener("change", function () {
        var modelCheckboxes = modelDropdown.getElementsByTagName("input");
        console.log("select all: " + modelCheckboxes);
        for(var l = 0; l < modelCheckboxes.length; l++){
            modelCheckboxes[l].checked = selectAll.checked;
        }
    });
    var modelConfirm = document.createElement("button");
    modelConfirm.setAttribute("id", "dropdownButton");
    modelConfirm.innerText = "Apply";
    modelConfirm.addEventListener("click", function () {
        var modelCheckboxes = modelDropdown.getElementsByTagName("input");
        for(var i = 1; i < modelCheckboxes.length; i++) {
            if (modelCheckboxes[i].checked == true) {
                vehicle_model["selection"].push(modelCheckboxes[i].value);
            }
        }
        sideFilter.removeChild(priceFilter);
        document.getElementById("model").innerText = "Model " + '✓';
    });
    priceFilter.setAttribute("class", "animateDropdown");
    makeContainer.appendChild(modelConfirm);
    sideFilter.appendChild(priceFilter);

    vehicleRequest["vehicle_model"] = vehicle_model;
    modelSelect = vehicle_model;
}

function setBodyType(){
    document.getElementById("bodyType").style.color = "white";
    document.getElementById("bodyType").style.backgroundColor = "#0b568f";
    var vehicle_bodyType = {};
    vehicle_bodyType["type"] = "selection";
    vehicle_bodyType["selection"] = [];
    removeInputs();
    if(document.getElementById("priceFilter")){
        document.getElementById("filterContainer").removeChild(document.getElementById("priceFilter"));
    }
    var sideFilter = document.getElementById("filterContainer");
    var priceFilter = document.createElement("div");
    priceFilter.setAttribute("id", "bodyTypeFilter");
    console.log("SET MODEL");
    var makeContainer = document.createElement("div");
    makeContainer.setAttribute("class", "dropdownContainer");
    var modelDropdown = document.createElement("form");
    modelDropdown.setAttribute("id", "modelDropdown");
    makeContainer.appendChild(modelDropdown);
    priceFilter.appendChild(makeContainer);

    //select all
    var label = document.createElement("label");
    var selectAll = document.createElement("input");
    selectAll.setAttribute("type", "checkbox");
    selectAll.style.marginLeft = "5px";
    selectAll.setAttribute("value", "selectAll");
    label.innerText = "Select All";
    label.appendChild(selectAll);
    modelDropdown.appendChild(label);


    //list of makes
    for(var i = 0; i < bodyType.length; i++) {
        var label = document.createElement("label");
        var makeInput = document.createElement("input");
        makeInput.setAttribute("type", "checkbox");
        makeInput.style.marginLeft = "5px";
        makeInput.setAttribute("value", bodyType[i]);
        label.innerText = bodyType[i];
        label.appendChild(makeInput);
        modelDropdown.appendChild(label);

        for(var j = 0; j < modelSelect.length; j++) {
            if (bodyType[i] == bodySelect) {
                makeInput.checked = true;
            }
        }
        makeInput.addEventListener("change", function () {
            if (this.checked == true) {
                vehicle_bodyType["selection"].push(this.value);
            } else {
                vehicle_bodyType["selection"].splice(vehicle_bodyType["selection"].indexOf(this.id));
            }
        });
    }

    selectAll.addEventListener("change", function () {
        var modelCheckboxes = modelDropdown.getElementsByTagName("input");
        console.log("select all: " + modelCheckboxes);
        for(var l = 0; l < modelCheckboxes.length; l++){
            modelCheckboxes[l].checked = selectAll.checked;
        }
    });
    var modelConfirm = document.createElement("button");
    modelConfirm.setAttribute("id", "dropdownButton");
    modelConfirm.innerText = "Apply";
    modelConfirm.addEventListener("click", function () {
        var modelCheckboxes = modelDropdown.getElementsByTagName("input");
        for(var i = 1; i < modelCheckboxes.length; i++) {
            if (modelCheckboxes[i].checked == true) {
                vehicle_bodyType["selection"].push(modelCheckboxes[i].value);
            }
        }
        sideFilter.removeChild(priceFilter);
        document.getElementById("bodyType").innerText = "Body Type " + '✓';
    });
    priceFilter.setAttribute("class", "animateDropdown");
    makeContainer.appendChild(modelConfirm);
    sideFilter.appendChild(priceFilter);

    vehicleRequest["vehicle_bodyType"] = vehicle_bodyType;
    modelSelect = vehicle_bodyType;
}

function setDrivetrain(){
    document.getElementById("drivetrain").style.color = "white";
    document.getElementById("drivetrain").style.backgroundColor = "#0b568f";
    var vehicle_drivetrain = {};
    vehicle_drivetrain["type"] = "selection";
    vehicle_drivetrain["selection"] = [];
    removeInputs();
    if(document.getElementById("priceFilter")){
        document.getElementById("filterContainer").removeChild(document.getElementById("priceFilter"));
    }
    var sideFilter = document.getElementById("filterContainer");
    var priceFilter = document.createElement("div");
    priceFilter.setAttribute("id", "drivetrainFilter");
    var makeContainer = document.createElement("div");
    makeContainer.setAttribute("class", "smallDropdownContainer");
    var modelDropdown = document.createElement("form");
    modelDropdown.setAttribute("id", "drivetrainDropdown");
    makeContainer.appendChild(modelDropdown);
    priceFilter.appendChild(makeContainer);

    //select all
    var label = document.createElement("label");
    var selectAll = document.createElement("input");
    selectAll.setAttribute("type", "checkbox");
    selectAll.style.marginLeft = "5px";
    selectAll.setAttribute("value", "selectAll");
    label.innerText = "Select All";
    label.appendChild(selectAll);
    modelDropdown.appendChild(label);


    //list of makes
    for(var i = 0; i < driveTrain.length; i++) {
        var label = document.createElement("label");
        var makeInput = document.createElement("input");
        makeInput.setAttribute("type", "checkbox");
        makeInput.style.marginLeft = "5px";
        makeInput.setAttribute("value", driveTrain[i]);
        label.innerText = driveTrain[i];
        label.appendChild(makeInput);
        modelDropdown.appendChild(label);

        for(var j = 0; j < modelSelect.length; j++) {
            if (driveTrain[i] == driveSelect) {
                makeInput.checked = true;
            }
        }
        makeInput.addEventListener("change", function () {
            if (this.checked == true) {
                vehicle_drivetrain["selection"].push(this.value);
            } else {
                vehicle_drivetrain["selection"].splice(vehicle_drivetrain["selection"].indexOf(this.id));
            }
        });
    }

    selectAll.addEventListener("change", function () {
        var modelCheckboxes = modelDropdown.getElementsByTagName("input");
        console.log("select all: " + modelCheckboxes);
        for(var l = 0; l < modelCheckboxes.length; l++){
            modelCheckboxes[l].checked = selectAll.checked;
        }
    });
    var modelConfirm = document.createElement("button");
    modelConfirm.setAttribute("id", "dropdownButton");
    modelConfirm.innerText = "Apply";
    modelConfirm.addEventListener("click", function () {
        var modelCheckboxes = modelDropdown.getElementsByTagName("input");
        for(var i = 1; i < modelCheckboxes.length; i++) {
            if (modelCheckboxes[i].checked == true) {
                vehicle_drivetrain["selection"].push(modelCheckboxes[i].value);
            }
        }
        sideFilter.removeChild(priceFilter);
        document.getElementById("drivetrain").innerText = "Drivetrain " + '✓';
    });
    priceFilter.setAttribute("class", "animateDropdown");
    makeContainer.appendChild(modelConfirm);
    sideFilter.appendChild(priceFilter);

    vehicleRequest["vehicle_drivetrain"] = vehicle_drivetrain;
    modelSelect = vehicle_drivetrain;
}

function setFuelType(){
    document.getElementById("fuelType").style.color = "white";
    document.getElementById("fuelType").style.backgroundColor = "#0b568f";
    var vehicle_fuelType = {};
    vehicle_fuelType["type"] = "selection";
    vehicle_fuelType["selection"] = [];
    removeInputs();
    if(document.getElementById("priceFilter")){
        document.getElementById("filterContainer").removeChild(document.getElementById("priceFilter"));
    }
    var sideFilter = document.getElementById("filterContainer");
    var priceFilter = document.createElement("div");
    priceFilter.setAttribute("id", "fuelTypeFilter");
    var makeContainer = document.createElement("div");
    makeContainer.setAttribute("class", "smallDropdownContainer");
    var modelDropdown = document.createElement("form");
    modelDropdown.setAttribute("id", "fuelTypeDropdown");
    makeContainer.appendChild(modelDropdown);
    priceFilter.appendChild(makeContainer);

    //select all
    var label = document.createElement("label");
    var selectAll = document.createElement("input");
    selectAll.setAttribute("type", "checkbox");
    selectAll.style.marginLeft = "5px";
    selectAll.setAttribute("value", "selectAll");
    label.innerText = "Select All";
    label.appendChild(selectAll);
    modelDropdown.appendChild(label);


    //list of makes
    for(var i = 0; i < fuelType.length; i++) {
        var label = document.createElement("label");
        var makeInput = document.createElement("input");
        makeInput.setAttribute("type", "checkbox");
        makeInput.style.marginLeft = "5px";
        makeInput.setAttribute("value", fuelType[i]);
        label.innerText = fuelType[i];
        label.appendChild(makeInput);
        modelDropdown.appendChild(label);

        for(var j = 0; j < modelSelect.length; j++) {
            if (fuelType[i] == fuelSelect) {
                makeInput.checked = true;
            }
        }
        makeInput.addEventListener("change", function () {
            if (this.checked == true) {
                vehicle_fuelType["selection"].push(this.value);
            } else {
                vehicle_fuelType["selection"].splice(vehicle_fuelType["selection"].indexOf(this.id));
            }
        });
    }

    selectAll.addEventListener("change", function () {
        var modelCheckboxes = modelDropdown.getElementsByTagName("input");
        console.log("select all: " + modelCheckboxes);
        for(var l = 0; l < modelCheckboxes.length; l++){
            modelCheckboxes[l].checked = selectAll.checked;
        }
    });

    var modelConfirm = document.createElement("button");
    modelConfirm.setAttribute("id", "dropdownButton");
    modelConfirm.innerText = "Apply";
    modelConfirm.addEventListener("click", function () {
        var modelCheckboxes = modelDropdown.getElementsByTagName("input");
        for(var i = 1; i < modelCheckboxes.length; i++) {
            if (modelCheckboxes[i].checked == true) {
                vehicle_fuelType["selection"].push(modelCheckboxes[i].value);
            }
        }
        sideFilter.removeChild(priceFilter);
        document.getElementById("fuelType").innerText = "Fuel Type " + '✓';
    });
    priceFilter.setAttribute("class", "animateDropdown");
    makeContainer.appendChild(modelConfirm);
    sideFilter.appendChild(priceFilter);

    vehicleRequest["vehicle_fuelType"] = vehicle_fuelType;
    modelSelect = vehicle_fuelType;
}

function setTransmission(){
    document.getElementById("trans").style.color = "white";
    document.getElementById("trans").style.backgroundColor = "#0b568f";
    var vehicle_transmission = {};
    vehicle_transmission["type"] = "selection";
    vehicle_transmission["selection"] = [];
    removeInputs();
    if(document.getElementById("priceFilter")){
        document.getElementById("filterContainer").removeChild(document.getElementById("priceFilter"));
    }
    var sideFilter = document.getElementById("filterContainer");
    var priceFilter = document.createElement("div");
    priceFilter.setAttribute("id", "transmissionFilter");
    var makeContainer = document.createElement("div");
    makeContainer.setAttribute("class", "smallDropdownContainer");
    var modelDropdown = document.createElement("form");
    modelDropdown.setAttribute("id", "transmissionDropdown");
    makeContainer.appendChild(modelDropdown);
    priceFilter.appendChild(makeContainer);

    //select all
    var label = document.createElement("label");
    var selectAll = document.createElement("input");
    selectAll.setAttribute("type", "checkbox");
    selectAll.style.marginLeft = "5px";
    selectAll.setAttribute("value", "selectAll");
    label.innerText = "Select All";
    label.appendChild(selectAll);
    modelDropdown.appendChild(label);


    //list of makes
    for(var i = 0; i < transmission.length; i++) {
        var label = document.createElement("label");
        var makeInput = document.createElement("input");
        makeInput.setAttribute("type", "checkbox");
        makeInput.style.marginLeft = "5px";
        makeInput.setAttribute("value", transmission[i]);
        label.innerText = transmission[i];
        label.appendChild(makeInput);
        modelDropdown.appendChild(label);

        for(var j = 0; j < modelSelect.length; j++) {
            if (transmission[i] == tranSelect) {
                makeInput.checked = true;
            }
        }
        makeInput.addEventListener("change", function () {
            if (this.checked == true) {
                vehicle_transmission["selection"].push(this.value);
            } else {
                vehicle_transmission["selection"].splice(vehicle_transmission["selection"].indexOf(this.id));
            }
        });
    }

    selectAll.addEventListener("change", function () {
        var modelCheckboxes = modelDropdown.getElementsByTagName("input");
        console.log("select all: " + modelCheckboxes);
        for(var l = 0; l < modelCheckboxes.length; l++){
            modelCheckboxes[l].checked = selectAll.checked;
        }
    });

    var modelConfirm = document.createElement("button");
    modelConfirm.setAttribute("id", "dropdownButton");
    modelConfirm.innerText = "Apply";
    modelConfirm.addEventListener("click", function () {
        var modelCheckboxes = modelDropdown.getElementsByTagName("input");
        for(var i = 1; i < modelCheckboxes.length; i++) {
            if (modelCheckboxes[i].checked == true) {
                vehicle_transmission["selection"].push(modelCheckboxes[i].value);
            }
        }
        sideFilter.removeChild(priceFilter);
        document.getElementById("trans").innerText = "Transmission " + '✓';
    });
    priceFilter.setAttribute("class", "animateDropdown");
    makeContainer.appendChild(modelConfirm);
    sideFilter.appendChild(priceFilter);

    vehicleRequest["vehicle_transmission"] = vehicle_transmission;
    modelSelect = vehicle_transmission;
}

function userFilters(){
    document.getElementById("filters").style.color = "#0b568f";
    var userFilters = ["2005-2015", "Cheap Cars", "Toyota"];

    //TODO get user filters as rows from the sql table
    removeInputs();
    if(document.getElementById("priceFilter")){
        document.getElementById("filterContainer").removeChild(document.getElementById("priceFilter"));
    }
    var sideFilter = document.getElementById("filterContainer");
    var priceFilter = document.createElement("div");
    priceFilter.setAttribute("id", "presetContainer");
    var modelDropdown = document.createElement("form");
    modelDropdown.setAttribute("id", "presetDropdown");
    priceFilter.appendChild(modelDropdown);

    //list of filters
    for(var i = 0; i < userFilters.length; i++) {
        var filterName = document.createElement("a");
        filterName.innerText = userFilters[i];
        modelDropdown.appendChild(filterName);
        filterName.addEventListener("change", function () {
            console.log("CUSTOM FILTER: " + userFilters[i]);
        //TODO CALL FUNCTION TO DEFINE THE 'vehicleRequest' obj with filter values
        });
    }

    var newFilter = document.createElement("button");
    newFilter.innerText = "new filter";
    newFilter.style.border = "none";
    newFilter.style.fontSize = "12px";
    newFilter.style.color = "white";
    newFilter.style.backgroundColor = "red";
    newFilter.setAttribute("id", "dropDownButton");
    newFilter.addEventListener("change", function () {
        console.log("CUSTOM FILTER: " + userFilters[i]);
        //TODO FUNCTION THAT WILL CREATE A NEW FORM FOR THE USER TO DEFINE A FILTER
        //THE NEW FILTER WILL BE ADDED TO mySQL table with userID.
    });
    priceFilter.setAttribute("class", "animateDropdown");
    modelDropdown.appendChild(newFilter);
    sideFilter.appendChild(priceFilter);
}

function applyFilter(){

    //make request to back end with the vehicleRequest obj containing all user input
    console.log(vehicleRequest);
    var data = JSON.stringify({
        'filters': vehicleRequest,
        'vehicle_count': vehicle_request_ct
    });

    var apiendpoint = "https://auctioncentral.com/getVehicles.php";
    fetch(apiendpoint, {
        method: 'POST',
        body: data
    }).then(response => {
        if (response.ok) {

            return response.json();
        }
        throw new Error('Request failed!');
    }, networkError => {
        console.log(networkError.message);
    }).then(jsonResponse => {
        createAuctionFeed(jsonResponse);

    });
}

//when user selects a filter close all the other filter inputs from being open
function removeInputs(){
    var filterContainer = document.getElementById("filterContainer");

    if(document.getElementById("priceFilter")){
        filterContainer.removeChild(document.getElementById("priceFilter"));
        if(vehicleRequest["bid_price"]["values"] == 0){
            document.getElementById("price").style.color = "black";
            document.getElementById("price").style.backgroundColor = "#f0f0f0";
        }
    }
    if(document.getElementById("mileageFilter")){
        filterContainer.removeChild(document.getElementById("mileageFilter"));
        if(vehicleRequest["vehicle_mileage"]["values"] == 0){
            document.getElementById("mileage").style.color = "black";
            document.getElementById("mileage").style.backgroundColor = "#f0f0f0";
        }
    }
    if(document.getElementById("yearFilter")){
        filterContainer.removeChild(document.getElementById("yearFilter"));
        if(vehicleRequest["vehicle_year"]["values"] == 0){
            document.getElementById("year").style.color = "black";
            document.getElementById("year").style.backgroundColor = "#f0f0f0";
        }
    }
    if(document.getElementById("makeFilter")){
        filterContainer.removeChild(document.getElementById("makeFilter"));
        if(vehicleRequest["vehicle_make"]["selection"] == 0){
            document.getElementById("make").style.color = "black";
            document.getElementById("make").style.backgroundColor = "#f0f0f0";
    }
    }
    if(document.getElementById("modelFilter")){
        filterContainer.removeChild(document.getElementById("modelFilter"));
        if(vehicleRequest["vehicle_model"]["selection"] == 0){
            document.getElementById("model").style.color = "black";
            document.getElementById("model").style.backgroundColor = "#f0f0f0";
        }
    }
    if(document.getElementById("bodyTypeFilter")){
        filterContainer.removeChild(document.getElementById("bodyTypeFilter"));
        if(vehicleRequest["vehicle_bodyType"]["selection"] == 0){
            document.getElementById("bodyType").style.color = "black";
            document.getElementById("bodyType").style.backgroundColor = "#f0f0f0";
        }
    }

    if(document.getElementById("drivetrainFilter")){
        filterContainer.removeChild(document.getElementById("drivetrainFilter"));
        if(vehicleRequest["vehicle_drivetrain"]["selection"] == 0){
            document.getElementById("drivetrain").style.color = "black";
            document.getElementById("drivetrain").style.backgroundColor = "#f0f0f0";
        }
    }

    if(document.getElementById("fuelTypeFilter")){
        filterContainer.removeChild(document.getElementById("fuelTypeFilter"));
        if(vehicleRequest["vehicle_fuelType"]["selection"] == 0){
            document.getElementById("fuelType").style.color = "black";
            document.getElementById("fuelType").style.backgroundColor = "#f0f0f0";
        }
    }
    if(document.getElementById("transmissionFilter")){
        filterContainer.removeChild(document.getElementById("transmissionFilter"));
        if(vehicleRequest["vehicle_transmission"]["selection"] == 0){
            document.getElementById("trans").style.color = "black";
            document.getElementById("trans").style.backgroundColor = "#f0f0f0";
        }
    }
    if(document.getElementById("presetContainer")){
        filterContainer.removeChild(document.getElementById("presetContainer"));
        document.getElementById("filters").style.color = "black";
        document.getElementById("filters").style.backgroundColor = "#f0f0f0";
    }
}