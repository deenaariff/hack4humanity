function submitEvent() {
	var type = document.getElementsByName("type")[0].value;
	var severity = document.getElementsByName("severity")[0].value;
	var workers_needed = document.getElementsByName("workers_needed")[0].value;
	var workers = document.getElementsByName("workers")[0].value;
	var latitude = document.getElementsByName("lat")[0].value;
	var longitude = document.getElementsByName("long")[0].value;
	var leader = document.getElementsByName("leader")[0].value;
	var priority = (workers_needed - workers) * severity;

	console.log("Type: ", type);
	console.log("Severity: ", severity);
	console.log("Workers Needed: ", workers_needed);
	console.log("Workers: ", workers);
	console.log("Latitude: ", latitude);
	console.log("Longitude: ", longitude);
	console.log("Leader: ", leader);
	console.log("Priority: ", priority);
}