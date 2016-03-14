//universal variable for the map
var map;
//whether map is a tab
var mapIsTab = false;
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
//universal infowindow to open/close
var infowindow;
//geolocation control area
var geolocationcontrolDiv;
//actual geolocation control
var geolocationcontrol;

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
  if($('#bigMap').is(":visible")) {
	  $.ajax ({
		   url: '../main/php/mapsServer.php?contentType=html&content=bigMap',
		   contentType : 'html'
	   })
	   .done  (function ( content ) {
		   $('#bigMap').html(content);
		   makeMap();
	  });
  }
  else {
	  $.ajax ({
		   url: '../main/php/mapsServer.php?contentType=html&content=tabMap',
		   contentType : 'html'
	   })
	   .done  (function ( content ) {
		   $('#mapTabs').html(content);
		   makeMap();
		   mapIsTab = true;
		   $('#mapTab a').click(function (e) {
			   e.preventDefault()
			   $(this).tab('show')
			 });
			 $('#customers a').click(function (e) {
			   e.preventDefault()
			   $(this).tab('show')
			 });
	  });
  }
  
}

/**
 * 
 */
function makeMap () {
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
     //add the geoCoding trigger element to the map
    geolocationcontrolDiv = document.createElement('div');
    geolocationcontrol = new geolocationControl(geolocationcontrolDiv, map);
    geolocationcontrolDiv.index = 1;
    map.controls[google.maps.ControlPosition.BOTTOM_LEFT].push(geolocationcontrolDiv);

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
    //make a table of the customers within these bounds
   makeMapTable(bounds);
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
		        	  markerZoom = true;
		        	  map.setCenter(marker.getPosition());
		        	  map.setZoom(8);
		        	  markerZoom = false;
		        	  openInfoBubble (marker, addressID );
		          }
		     })(marker, addressID));
		     markers[addressID] = marker;
		   }
		  //add listener for when user (not "us", that is not when we zoom to a marker),
		  //zooms or moves the map, then stops
		   google.maps.event.addListener(map, 'dragend', function() {
		       if (markerZoom == false) {
		    	 //call this very function again
		    	   var bounds = map.getBounds();
		    	   getMarkers(bounds);
		       }
		   });
		 //add listener for when user (not "us", that is not when we zoom to a marker),
			  //zooms or moves the map, then stops
			   google.maps.event.addListener(map, 'zoom_changed', function() {
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

/**
 * This function makes and ajaxes in a table of the customer information of the customers within the map
 * bounds
 * @param object bounds
 */
function makeMapTable (bounds) {
	var dataObject = { NELat: bounds.getNorthEast().lat(),
			   NELng : bounds.getNorthEast().lng(),
			   SWLat : bounds.getSouthWest().lat(),
			   SWLng : bounds.getSouthWest().lng()};
	   //ajax in the customer data for the customers within the bounds
		$.ajax ({
			url: '../main/php/mapsServer.php?contentType=json&content=customerTable',
			   data: dataObject,
			   type : "POST",
			   dataType : "json"
		})
				   .done (function ( customerTable ) {
					   $.ajax ({
						   url: '../main/php/mapsServer.php?contentType=html&content=mapsTable',
						   contentType : 'html'
					   })
					   .done (function ( templateHTML ) {
						   var template = Handlebars.compile(templateHTML);
						   var wrapper  = {objects: customerTable};
						   $('#mapsTable').html(template(wrapper));
						   $(document).on('click','.mapMarker',function(){
							   if ( mapIsTab == true ) {
								   $('.nav-tabs a[href="#mapTab"]').tab('show');
								   $('html,body').animate({
									   scrollTop: $("#map").offset().top - 10
									});
							   }
							   else {
								   $('html,body').animate({
									   scrollTop: $("#map").offset().top - 10
									});
							   }
							   google.maps.event.trigger(markers[this.id], 'click');
							});
					   });
				});
}


/**
 * This is nearly a direct copy/paste from the custom control example at Google, this will add a geolocation 
 * custom control 
 * @param object controlDiv
 * @param object map
 */
function geolocationControl(controlDiv, map) {

  // Set CSS for the control border.
  var controlUI = document.createElement('div');
  controlUI.style.backgroundColor = '#fff';
  controlUI.style.border = '2px solid #fff';
  controlUI.style.borderRadius = '3px';
  controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
  controlUI.style.cursor = 'pointer';
  controlUI.style.marginBottom = '22px';
  controlUI.style.textAlign = 'center';
  controlUI.title = 'Find Me';
  controlDiv.appendChild(controlUI);

  // Set CSS for the control interior.
  var controlText = document.createElement('div');
  controlText.style.color = 'rgb(25,25,25)';
  controlText.style.lineHeight = '38px';
  controlText.style.paddingLeft = '5px';
  controlText.style.paddingRight = '5px';
  controlText.innerHTML = '<i class="fa fa-crosshairs"></i>';
  controlUI.appendChild(controlText);
  //Setup the click event listeners: get viewport by location
  controlUI.addEventListener('click', function() {
	  getViewportByLocation();
  });

}

/**
 * This function gets the country via reverse geocoding after a geolocation request, then passes
 * it to reverseGeocode to zoom to that country's viewport
 */
function getViewportByLocation() {
	$.ajax ({
		   url: '../main/php/mapsServer.php?contentType=html&content=locationModal',
		   contentType : 'html'
	})
	   .done (function ( templateHTML ) {
		   if (!navigator.geolocation) {
			   locationModalTitle.html('<h3 class="modal-title">Error Finding Location</h3>');
			   locationModalBody.html('<i class="fa fa-exclamation-triangle fa-3x warning h3"></i>' +
					   'Sorry, your browser does not support location');   
			}
		   else {
			   function success(position) {
				    var latitude  = position.coords.latitude;
				    var longitude = position.coords.longitude;
				    var latLng = new google.maps.LatLng (latitude, longitude);
                    reverseGeocode(latLng, 'country'); 
			   }
			   function error(error) {
				   locationModalTitle.html('<h3 class="modal-title">Error Finding Location</h3>');
				   locationModalBody.html('<i class="fa fa-exclamation-triangle fa-3x warning h3"></i>' +
						   'Error finding location');
				   console.log(error);
			   }
		       navigator.geolocation.getCurrentPosition(success, error);	
			}
	});
	
}