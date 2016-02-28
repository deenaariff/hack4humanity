function sendAJAX() {
    var firstName = document.getElementsByName("name")[0].value;
    console.log("First Name: ", firstName);

    var text = '{"firstName": firstName}'

$.ajax({
    type: "POST",
    url: "http://51491492.ngrok.io/worker/new/" + firstName,
    dataType: JSON,
    error: function (data) {
        console.log("error");
        console.log(data);
    },
    success: function(userId){
        console.log("Executing");
        console.log(userId);
    },
});
    
}


function sendAJAX1() {
    var userID = document.getElementsByName("name")[0].value;
    console.log("User ID: ", userID);

    var text = '{"userID": userID}'

$.ajax({
    type: "GET",
    url: "http://51491492.ngrok.io/worker/requests/" + userID,
    dataType: JSON,
    error: function (data) {
        console.log("request error");
        console.log(data);
    },
    success: function(userId){
        console.log("request executing");
        console.log(userId);
    },
});
    
} 
    


function sendAJAX2() {
    var userID = document.getElementsByName("id")[0].value;
    var event = document.getElementsByName("event")[0].value;
    var invite = document.getElementsByName("invitation")[0].value;
    
    console.log("User ID: ", userID);
    console.log("Event Name: ", event);
    console.log("Accept/Deny: ", invite);


$.ajax({
    type: "POST",
    url: "http://51491492.ngrok.io/worker/" + userID + "/" + event + "/" + invite,
    dataType: JSON,
    error: function (data) {
        console.log("event error");
        console.log(data);
    },
    success: function(userId){
        console.log("event executing");
        console.log(userId);
    },
});
    
} 