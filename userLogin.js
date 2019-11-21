function formToJSON(elements) {
    const data = new FormData();

    for (let i = 0; i < elements.length; i++) {
        if (elements[i].name && elements[i].value) {
            //store multi-values of checkbox into array
            if (elements[i].type ==='checkbox') {
                data.append(elements[i].name, elements[i].checked);
                console.log(elements[i].name, elements[i].checked)
            }
            else if (elements[i].options && elements[i].multiple) {
                data.append(elements[i].name, getSelectValues(elements[i]))
            }
            else {
                data.append(elements[i].name, elements[i].value)
            }
        }
    }

    return data;
}


const handleFormSubmit = event => {
    var apiendpoint = "https://auctioncentral.com/userLogin.php";

    event.preventDefault();

    //call function to get the form data
    const data = formToJSON(form.elements);
    console.log(JSON.stringify(data));

    fetch(apiendpoint, {
        method: 'POST',
        body: data})
        .then(response => {


            if (response.status === 200) {
                console.log("VALID");
                document.location.href = "https://auctioncentral.com/liveAuctions.php";
            }
            else {
                if(response.status = 401) {
                    console.log("Invalid Credentials");
                    alert("Invalid Credentials");
                }
            }

        }).catch(err => {
        console.log("Request Failed");
        console.log(err);
    })

};

const  resetPassword = event => {
    var apiendpoint = "https://auctioncentral.com/resetPwd.php";

    const data = formToJSON(form.elements);
    console.log(data);
    //send data to the php
    fetch(apiendpoint, {
        method: 'POST',
        body: data})
        .then(response => {


            if (navigator.cookieEnabled) {
                if (response.status === 200) {
                    console.log("VALID");

                    var email = document.getElementById("email").value;
                    var message = 'A password reset email has been sent to ' + email;
                    if(confirm(message)) {
                        document.location.href = ('http://auctioncentral.com/liveAuctions.php');
                    }

                }
                else {
                    alert("Please enter the email you use to login");
                }
            }
            else{
                alert('Please Enable Cookies!');
            }

        }).catch(err => {
        console.log("Request Failed");
        console.log(err);
    })
}


//document.getElementById("forgotPwd").addEventListener("click", resetPassword);
const form = document.getElementsByClassName("loginform")[0];
form.addEventListener('submit', handleFormSubmit);

