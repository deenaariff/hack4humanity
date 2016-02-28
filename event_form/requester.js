function sendAJAX() {
    var userID = document.getElementsByName("name")[0].value;
    var numWorkers = document.getElementsByName("num")[0].value;
    
    console.log("UserID: ", userID);
    console.log("Number Workers: ", numWorkers);

$.ajax({
    type: "POST",
    url: "http://51491492.ngrok.io/requester/workersNeeded/" + userID + "/" + numWorkers,
    dataType: JSON,
    error: function (data) {
        console.log("requestor error");
        console.log(data);
    },
    success: function(userId){
        console.log("requestor Executing");
        console.log(userId);
    },
});
    
}


function sendAJAX1() {
    var userID = document.getElementsByName("name")[0].value;
    console.log("User ID: ", userID);


$.ajax({
    type: "GET",
    url: "http://51491492.ngrok.io/requester/myevent/" + userID,
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
    
