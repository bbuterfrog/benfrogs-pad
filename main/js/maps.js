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
		    
});

/**
 * This function initalizes the Google Map
 */
function initalize (){ 
  map = new google.maps.Map(document.getElementById('map'), mapOptions); 
	//Resize Function
	google.maps.event.addDomListener(window, "resize", function() {
		var center = map.getCenter();
		google.maps.event.trigger(map, "resize");
		map.setCenter(center);
	});
	google.maps.event.addListener(map, 'tilesloaded', function() {      
	    var lat1 = -72;
	      var lat2 = 72;
	      var lng1 = -180;
	      var lng2 = 180;  

	      var rectangle = new google.maps.Polygon({
	         paths : [
	           new google.maps.LatLng(lat1, lng1),
	           new google.maps.LatLng(lat2, lng1),
	           new google.maps.LatLng(lat2, lng2),
	           new google.maps.LatLng(lat1, lng2)
	         ],
	        strokeOpacity: 0,
	        fillOpacity : 0,
	        map : map
	      });
	      console.log (rectangle);
	      google.maps.event.addListener(rectangle, 'click', function(args) {  
	         console.log('latlng', args.latLng);
	      });
	  });
	}
