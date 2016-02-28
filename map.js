//globals

var map;
var markers = {};

function registerHandlers(){
  //updateMarkers();
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

  console.log(markers);
}

function removeMarker(euid){
  console.log("Removing Marker"+euid);
  markers[euid].setMap(null);

}

//async parse
var events;
var len;
var data = $.get("http://51491492.ngrok.io/events/getAll", function(){parseEvents();});

//var unparsed_events;

function parseEvents(){
  events = JSON.parse(data.responseText);
  console.log(events);

  len = events.length;

  updateMarkers();

}

function updateMarkers(){
  for(i = 0; i < len; i++){
    addMarker(events[i].euid, events[i].position, 2);
  }
}


// function updateTable(){
//   //update Table / Feed
//   var tbl=$("<table/>").attr("id","mytable");
//   $("#div1").append(tbl);
//   for(i = 0; i < len; i++)
//   {
//       var tr="<tr>";
//       var td1="<td>"+events[i]["euid"]+"</td>";
//       var td2="<td>"+events[i]["name"]+"</td>";
//       var td3="<td>"+events[i]["color"]+"</td></tr>";
//
//       $("#mytable").append(tr+td1+td2+td3);
//  }
// }

function update(){
  updateMarker();
  updateTable();
}
