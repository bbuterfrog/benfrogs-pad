//universal variable for the map
var map;
//universal variable for mapOptions
var mapOptions;

$(document).ready(function() {
	getHeader ( );
	getHTML ( 'footer', 'footer');
	getHTML ('innerHowItWorks', 'mapsHowItWorks');
	prettyPrint();
	 mapOptions = {
		        center: new google.maps.LatLng(0,0),
		        zoom: 1
		    };
	 google.maps.event.addDomListener(window, 'load', initalize());
});

/**
 * This function initalizes the Google Map
 * @param float centerLat center latitude
 * @param float centerLon cetner longitude
 * @param integer zoom level
 */
function initalize (){ 
  map = new google.maps.Map(document.getElementById('map'), mapOptions); 
	//Resize Function
	google.maps.event.addDomListener(window, "resize", function() {
		var center = map.getCenter();
		google.maps.event.trigger(map, "resize");
		map.setCenter(center);
	});
}