//globals

var map;
var markers = {};

function registerHandlers(){
  updateMap();
}

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 37.773972, lng: -122.4167},
    zoom: 13
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

  // setMapOnAll(null);
  // delete markers[0];
  // setMapOnAll(map);

  //console.log("Marker Removed");
  //markers = markers.filter(function(marker){marker.euid != euid})
}

function updateMap(){
  var unparsed_events = $.get("http://51491492.ngrok.io/events/getAll");
  console.log(unparsed_events);
  var events = JSON.parse(unparsed_events.responseText);

  len = events.length;

  console.log(len);

  addMarker(events[0].euid, events[0].position, 2);

  // for (i = 0; i < len; i++){
  //   console.log("Test");
  //   addMarker(events[i].euid, events[i].position, 2);
  // }
}

function test(){
  for (i = 0; i < 3; i++){
    console.log("Test");
    addMarker(events[i].euid, events[i].position, 2);
  }
}
