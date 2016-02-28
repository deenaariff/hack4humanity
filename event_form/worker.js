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
    