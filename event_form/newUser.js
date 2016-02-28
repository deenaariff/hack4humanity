function sendAJAX() {
    var firstName = document.getElementsByName("name")[0].value;
    console.log("First Name: ", firstName);

    var text = '{"firstName": firstName}'

$.ajax({
    type: "POST",
    url: "http://42bc8ac7.ngrok.io/worker/new/" + firstName,
    success: function(msg){},
    dataType: JSON
});
    
} 
    