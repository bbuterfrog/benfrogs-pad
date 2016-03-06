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
		        zoom: 2
		    };
	 google.maps.event.addDomListener(window, 'load', initalize());
	//add click listener for any point on the map
	 google.maps.event.addListener(marker, "click", function (event) {
		    var latitude = event.latLng.lat();
		    var longitude = event.latLng.lng();
		    console.log( latitude + ', ' + longitude );
	 });	    
});

function mapClicks () {
	var mapBounds = map.getBounds();
var rectangle = new google.maps.Polygon({
    paths : [
      mapBounds;
    ],
   strokeOpacity: 0,
   fillOpacity : 0,
   map : map
 });
 google.maps.event.addListener(rectangle, 'click', function(args) {  
    console.log('latlng', args.latLng);
 });
}

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