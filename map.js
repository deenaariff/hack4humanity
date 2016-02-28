function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 37.773972, lng: -122.4167},
    zoom: 13
  });

  var infoWindow = new google.maps.InfoWindow({map: map});

  //event listener should be replaced with incoming requests
  document.getElementById("drop-pin").addEventListener('click',function(){addMarker({lat: 37.773972, lng: -122.4167},map,2)});
}

function addMarker(location, map, color) {
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
    icon: color_icon,
    position: location,
    map: map
  });
}
