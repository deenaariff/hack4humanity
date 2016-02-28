//globals

var map;
var markers = {};
var events;
var len;

//async parse
var data = $.get("http://51491492.ngrok.io/events/getAll", function(){parseEvents();});

function registerHandlers(){
  dumpMarkers();
  dumpTable();

  //document.getElementById("submit-button").addEventListener('click',update(),false)
}

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 37.773972, lng: -122.4167},
    zoom: 11
  });

  var infoWindow = new google.maps.InfoWindow({map: map});

  //event listener should be replaced with incoming requests
  document.getElementById("drop-pin").addEventListener('click',function(){addMarker(0, {lat: 37.773972, lng: -122.4167},2)});
}

function setMapOnAll(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

function addMarker(euid, location, color) {
  console.log("test")
  //marker.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png');
  switch(color){
    case 1:
      color = 'blue';
      break;
    case 2:
      color = 'red';
      break;
    default:
      color = 'purple';
  }

  var color_icon = 'http://maps.google.com/mapfiles/ms/icons/'+color+'-dot.png';

  var marker = new google.maps.Marker({
    //icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
    euid: euid,
    icon: color_icon,
    position: location,
    map: map
  });

  markers[euid] = marker;

  //console.log(markers);
}

function removeMarker(euid){
  console.log("Removing Marker"+euid);
  markers[euid].setMap(null);

}

//var unparsed_events;

function parseEvents(){
  events = JSON.parse(data.responseText);
  //console.log(events);

  len = events.length;

  //update();
}

function dumpMarkers(){
  for(i = 0; i < len; i++){
    addMarker(events[i].euid, events[i].position, 2);
  }
}



function dumpTable(){
  //update Table / Feed

  //console.log(events[0]);
  //console.log(events[0].workers_needed);
  //console.log(parseInt(events[0].workers_needed));

  var sum = 0;
  for(i = 0; i < len; i++){
    console.log(parseInt(events[i].workers_needed));
    sum += parseInt(events[i].workers_needed);
    console.log("Running sum: " + sum);
  }

  console.log("Total Sum:" + sum);

  $("#workers-needed").text("Workers Needed: " + sum);

  var tbl=$("<table/>").attr("id","mytable");
      $("#div1").append(tbl);
      for(i = 0; i < len; i++)
      {
          var tr="<tr>";
          var td1="<td>"+events[i].type+"</td>";
          var td2="<td>"+events[i].commited_workers.length+"</td></tr>";

         $("#table-feed").append(tr+td1+td2);

      }
  //end table
}

function update(){
  var data = $.post("http://51491492.ngrok.io/events/new/" + type + "/" + severity + "/" + workers_needed, function(){handleUpdate();});

  function handleUpdate(){
    dumpMarkers();

    console.log(data);

    //increments workers needed
    $("#workers-needed").text("Workers Needed: " + workers_needed);

    var tr="<tr>";
    var td1="<td>"+type+"</td>";
    var td2="<td>"+events[events.length-1]["commited_workers"].length+"</td></tr>";

   $("#table-feed").append(tr+td1+td2);

  }

}

//EVENT FORM SHIT

function submitEvent(callback) {
	type = document.getElementsByName("type")[0].value;
	severity = document.getElementsByName("severity")[0].value;
	workers_needed = document.getElementsByName("workers_needed")[0].value;
	workers = document.getElementsByName("workers")[0].value;
	latitude = document.getElementsByName("lat")[0].value;
	longitude = document.getElementsByName("long")[0].value;
	leader = document.getElementsByName("leader")[0].value;
	priority = (workers_needed - workers) * severity;

	console.log("Type: ", type);
	console.log("Severity: ", severity);
	console.log("Workers Needed: ", workers_needed);
	console.log("Workers: ", workers);
	console.log("Latitude: ", latitude);
	console.log("Longitude: ", longitude);
	console.log("Leader: ", leader);
	console.log("Priority: ", priority);

  callback();
}


function getEvent() {
$.ajax({
    type: "GET",
    url: "http://51491492.ngrok.io/events/getAll",
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
