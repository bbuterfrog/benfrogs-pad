//universal variable for the map
var map;
//universal variable for mapOptions
var mapOptions;
//universal rectangle to listen for clicks
var rectangle;
//listener variable for when map bounds change
var boundsChanged;
//listener variable for when a polygon is clicked on 
var polyClicked;
//geocoder object
var geocoder;
//universal array of markers
var markers = [];
//boolean variable to see if we are zooming to a marker
var markerZoom = false;
var infowindow;
$(document).ready(function() {
	getHeader ( );
	getHTML ( 'footer', 'footer');
	getHTML ('innerHowItWorks', 'mapsHowItWorks');
	getHTML ('addressSearch', 'addressSearch');
	prettyPrint();
});

/**
 * This function initalizes the Google Map
 */
function initalize (){
	mapOptions = {
	        center: new google.maps.LatLng(0,0),
	        zoom: 2,
	        mapTypeControl: false
	    };
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
	      polyClicked = google.maps.event.addListener(rectangle, 'click', function(args) {  
	          //zoom to country with reverse, then forward geocoding
	    	  countryName = reverseGeocode (args.latLng, 'country');
	       });    
	  });
	// Create the search box and link it to the UI element.
    var input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function() {
      searchBox.setBounds(map.getBounds());
    });
    
    searchBox.addListener('places_changed', function() {
    	var bounds = new google.maps.LatLngBounds();
        var places = searchBox.getPlaces();
        if (places.length == 0) {
          return;
        }
        places.forEach(function(place) {
        if (place.geometry.viewport) {
            // Only geocodes have viewport.
            bounds.union(place.geometry.viewport);
          } else {
            bounds.extend(place.geometry.location);
          }
        });  
        map.fitBounds(bounds);
        rectangle = null;
	    google.maps.event.removeListener(boundsChanged);
	    getMarkers(bounds);
        });
}
/**
 * This function reverse geocodes a set of coordinates to an address 
 * then zooms to its viewport
 * @param object latLng lat/lng of the coordinates to geocode
 * @param string type Google Maps type of the address component to return
 */
function reverseGeocode (latLng, type) {
	 geocoder.geocode( { 'location': latLng}, function(results, status) {
	      if (status === google.maps.GeocoderStatus.OK) {
	      $.each (results[0].address_components, function( key, value ) {
	      //run an each loop to find the type we want over results
	    	  if ( value.types[0] == type) {
	    		  google.maps.event.removeListener(polyClicked);
	    		  zoomToViewport(value.long_name);
	    	  }
	      });
	      }
	    else {
	      console.log('Could not find ' + type + ' due to: ' + status);
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
	      getMarkers (results[0].geometry.viewport);
	   }
	   else {
	      console.log('Could not find viewport due to: ' + status);
	   }
	});
}

/**
 * This function gets markers within a given set of bounds, then adds them
 * to the map
 * @param object bounds
 */
function getMarkers (bounds) {
   markers = [];
   //make a dataObject of the bounds to post
   var dataObject = { NELat: bounds.getNorthEast().lat(),
		   NELng : bounds.getNorthEast().lng(),
		   SWLat : bounds.getSouthWest().lat(),
		   SWLng : bounds.getSouthWest().lng()};
   //ajax in the marker points and address id's within the bounds
	$.ajax ({
		   url: '../main/php/mapsServer.php?content=getPoints&contentType=json',
		   data: dataObject,
		   type : "POST",
		   dataType : "json"	   
	   })
	   .done (function ( content ) {
		   for (var i = 0; i < content.length; i++) {
		      var addressID = content[i].address_id;
		      var lat = content[i].lat;
		      var lng = content[i].lng;
		      var latLng = new google.maps.LatLng(lat, lng);
		      var marker = new google.maps.Marker ({
		    	 position : latLng,
		    	 map: map
		      });
		      google.maps.event.addListener(marker, 'click', (function(marker, addressID) {
		          return function() {
		        	  openInfoBubble (marker, addressID )
		          }
		     })(marker, addressID));
		     markers[addressID] = marker;
		    
		   }
		  //add listener for when user (not "us", that is not when we zoom to a marker),
		  //zooms or moves the map, then stops
		   google.maps.event.addListener(map, 'idle', function() {
		       if (markerZoom == false) {
		    	 //call this very function again
		    	   var bounds = map.getBounds();
		    	   getMarkers(bounds);
		       }
		   });
      });
}

/**
 * This function opens an "infoBubble" (aka infoWindow) when a marker is clicked, by getting
 * the html template via an ajax call and filling it in with handlebars.js
 * @param float lat
 * @param float lng
 * @param object addressID
 * @param object marker
 */
function openInfoBubble (marker, addressID ) {
	var dataObject = { addressID: addressID };
	$.ajax ({ 
		   url: '../main/php/mapsServer.php?contentType=json&content=customerBubble',
		   data: dataObject,
		   type : "POST",
		   dataType : "json"	   
	   })
	   .done (function ( windowContent ) {
		   $.ajax ({
			   url: '../main/php/mapsServer.php?contentType=html&content=infoBubble',
			   contentType : 'html'
		   })
		   .done (function ( templateHTML ) {
			   var template = Handlebars.compile(templateHTML);
			   var infoBubbleHTML = template(windowContent[0]);
			   if (infowindow) {
				   infowindow.close();
			   }
			   infowindow = new google.maps.InfoWindow();
			   infowindow.setContent(infoBubbleHTML);
			   infowindow.open(map, marker);
		   });	
	});
}
