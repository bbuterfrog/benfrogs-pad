//universal variable for the map
var map;
//universal variable for mapOptions
var mapOptions;
//universal rectangle to listen for clicks
var rectangle;
//geocoder object
var geocoder;

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
});

/**
 * This function initalizes the Google Map
 */
function initalize (){ 
  geocoder = new google.maps.Geocoder();
  map = new google.maps.Map(document.getElementById('map'), mapOptions); 
	//Resize Function
	google.maps.event.addDomListener(window, "resize", function() {
		var center = map.getCenter();
		google.maps.event.trigger(map, "resize");
		map.setCenter(center);
	});
	google.maps.event.addListener(map, 'bounds_changed', function() {
		  var mapBounds = map.getBounds();
	      rectangle = new google.maps.Rectangle({
	        bounds: map.getBounds(),
	        strokeOpacity: 0,
	        fillOpacity : 0,
	        map : map
	      });
	      google.maps.event.addListener(rectangle, 'click', function(args) {  
	          //zoom to country with reverse geocoding
	    	  reverseGeocode (args.latLng);
	       });    
	  });
	}

/**
 * This function reverse geocodes a set of coordinates to an address and returns the viewport of 
 * that address, based on a provided type
 * @param object latLng lat/lng of the coordinates to geocode
 * @param string type Google Maps type of the address component to return the viewport of
 */
function reverseGeocode (latLng, type) {
	 geocoder.geocode( { 'location': latLng}, function(results, status) {
	      if (status === google.maps.GeocoderStatus.OK) {
	      $.each (results[0].address_components, function( key, value ) {
	      //run an each loop to find the type we want over results
	    	  if ( address_components[key].types[0] == type) {
	    		  console.log(value);
	    	  }
	      });
	      }
	    else {
	      console.log('Geocoder failed due to: ' + status);
	    }
	  });
}
