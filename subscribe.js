const getSelectValues = options => [].reduce.call(options,(values, option) => {
    return option.selected ? values.concat(option.value) :
        values;
}, []);


//retrieve input data and return it as a JSON object
function formToJSON(elements) {
    const data = new FormData();
    for (let i = 0; i < elements.length; i++) {
        if (elements[i].name && elements[i].value) {
            //store multi-values of checkbox into array
            if (elements[i].type ==='checkbox') {
                data.append(elements[i].name, elements[i].checked);
            }
            else if (elements[i].options && elements[i].multiple) {
                data.append(elements[i].name, getSelectValues(elements[i]))
            }
            else {
                data.append(elements[i].name, elements[i].value);
            }
        }
    }

    return data;
}


const handleFormSubmit = event => {

    var data = formToJSON(form.elements);

        apiendpoint = "https://auctioncentral.com/subUpsert.php";
        var message = 'Subscribe to Auction Central?';
        var success = "Success, thank you for subscribing to Auction Central.";
        if (confirm(message)) {

            event.preventDefault();
// Prevent default functionality from submit button (HTTP Response - cancelled)

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
                console.log(jsonResponse);
                if (jsonResponse["success"] === false) {
                    alert(jsonResponse["errorMsg"]);
                }
                else {
                    alert(success);
                }
            })
        }
    }


const form = document.getElementsByClassName("formstyle")[0];
form.addEventListener("submit", handleFormSubmit);