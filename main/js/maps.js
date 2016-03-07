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
	      console.log(rectangle);
	      google.maps.event.addListener(rectangle, 'click', function(args) {  
	          //zoom to country with reverse geocoding
	    	  reverseGeocode (args.latLng());
	       });    
	  });
	}

/**
 * This function reverse geocodes a set of coordinates to an address
 * @param object latLng lat/lng of the coordinates to geocode
 */
function reverseGeocode (latLng) {
	 geocoder.geocode( { 'location': latLng}, function(results, status) {
	      if (status === google.maps.GeocoderStatus.OK) {
	      if ( results[0] ) {
	    	if (results[0].address_components.types.country) {
	    		console.log(results[0].address_components.types.country);
	    	}
	    	else {
		    	  console.log('No Country Found');
	    	}
	      }
	      else {
	    	  console.log('No Country Found');
	      }
	   }
	 else {
	      console.log('Geocoder failed due to: ' + status);
	    }
	  });
}
