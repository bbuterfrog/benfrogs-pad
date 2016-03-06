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
	//once the tiles have loaded
	google.maps.event.addListener(map, 'tilesloaded', function(evt) {
	 var mapBounds = map.getBounds();
	 var NELat = mapBounds.getNorthEast.lat();
	 var NELng = mapBounds.getNorthEast.lng();
	 console.log (NEBounds);
     var SWLat = mapBounds.getSouthWest.lat();
     var SWLng = mapBounds.getSouthWest.lng();
     console.log(SWBounds);
	 var rectangle = new google.maps.Polygon({
	     paths : [
	       new google.maps.LatLng(NELat, NELng),
           new google.maps.LatLng(SWLat, NELng),
           new google.maps.LatLng(SWLat, SWLng),
           new google.maps.LatLng(NELat, SWLng),
	     ],
	    strokeOpacity: 0,
	    fillOpacity : 0,
	    map : map
	  });
	  google.maps.event.addListener(rectangle, 'click', function(args) {  
	     console.log('latlng', args.latLng);
	  });
	});
}