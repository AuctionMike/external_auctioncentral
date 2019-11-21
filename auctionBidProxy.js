
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyB7XSCaQVSMtKM7SKgxe4JJKjtpIcWHkrk",
    authDomain: "auction-central-211613.firebaseapp.com",
    databaseURL: "https://auction-central-211613.firebaseio.com",
    projectId: "auction-central-211613",
    storageBucket: "auction-central-211613.appspot.com",
    messagingSenderId: "128337713411",
    appId: "1:128337713411:web:929e0023fb7fe359"
};
// Initialize Firebase
var fB =  firebase.initializeApp(firebaseConfig);


function raiseBid(id){
    id = id.substring(6);
    console.log(id);
    //when user clicks the bid+100 button confirm their decision
    //with an alert message and
    var reportID = document.getElementById("btnBid"+id).getAttribute("value");
    console.log("REP"+ reportID);
    var price = parseInt((document.getElementById("BID"+id).value).substring(1));
    console.log("CURRENT BID: "+price);
    var bid = ( price +100);

    fB.database().ref('2019-11-07').child(id).update({
        bid_price: bid
    });
    document.getElementById("BID"+id).value = "$"+bid;
}

function auctionProxy(id){
    id = id.substring(5);
    console.log(id);
}