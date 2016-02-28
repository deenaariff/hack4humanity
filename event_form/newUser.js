function submitEvent() {
	var firstName = document.getElementsByName("name")[0].value;

	console.log("First Name: ", firstName);


    var text = '{"firstName": firstName}'

    
$.ajax({
  url: "/worker/new/:name"
  data: text,
  success: success,
  dataType: JSON
});    
    

}