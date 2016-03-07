//universal variable for the map
var map;
//universal variable for mapOptions
var mapOptions;
//universal rectangle to listen for clicks
var rectangle;
var boundsChanged;
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
	boundsChanged = google.maps.event.addListener(map, 'bounds_changed', function() {
		  var mapBounds = map.getBounds();
	      rectangle = new google.maps.Rectangle({
	        bounds: map.getBounds(),
	        strokeOpacity: 0,
	        fillOpacity : 0,
	        map : map
	      });
	      google.maps.event.addListener(rectangle, 'click', function(args) {  
	          //zoom to country with reverse, then forward geocoding
	    	  countryName = reverseGeocode (args.latLng, 'country');
	       });    
	  });
	}

/**
 * This function reverse geocodes a set of coordinates to an address 
 * then zooms to its viewport
 * @param object latLng lat/lng of the coordinates to geocode
 * @param string type Google Maps type of the address component to return
 * @return string the name of the address component (long_name) 
 */
function reverseGeocode (latLng, type) {
	 geocoder.geocode( { 'location': latLng}, function(results, status) {
	      if (status === google.maps.GeocoderStatus.OK) {
	      $.each (results[0].address_components, function( key, value ) {
	      //run an each loop to find the type we want over results
	    	  if ( value.types[0] == type) {
	    		  zoomToViewport(value.long_name);
	    	  }
	      });
	      }
	    else {
	      console.log('Could not find country due to: ' + status);
	    }
	  });
}

/**
 * This functions zooms to the Google-supplied recommended viewport for the
 * provided area, finding it by geocoding
 * @param string area
 */
function zoomToViewport (area) {
	geocoder.geocode ({'address' : area}, function(results, status) {
	   if (status === google.maps.GeocoderStatus.OK) {
	      map.setCenter (results[0].geometry.location);
	      map.fitBounds(results[0].geometry.viewport);
	      rectangle = null;
	      google.maps.event.removeListener(boundsChanged);
	   }
	   else {
	      console.log('Could not find viewport due to: ' + status);
	   }
	});
}