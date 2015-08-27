$(document).ready(function() {
	getHeader ( );
	getHTML ( 'footer', 'footer');
});

function getHeader ( ) {
	$.ajax ({
		   url: '../main/php/serverHTML.php?content=header',
		   beforeSend: showLoadingImage ('header'),
		   contentType : 'html',
		   
	   })
	   .done (function ( content ) {
		   $('#header').html(content);
		   getTabs ( )
	   });
}

function getHTML (div, content){
   $.ajax ({
	   url: '../main/php/serverHTML.php?content=' + content,
	   beforeSend: showLoadingImage (div),
	   contentType : 'html',
	   
   })
   .done (function ( content ) {
	   $('#'+div).html(content);
   }); 
}

function getTabs ( ){
	   $.ajax ({
		   url: '../main/php/serverHTML.php?content=nav-header',
		   beforeSend: showLoadingImage ( 'nav-header' ),
		   contentType : 'html',
		   
	   })
	   .done (function ( content ) {
		   $('#nav-header').html(content);
		   $( '#nav-header' ).tabs();
		   $('#nav-header').tabs({
			    add: function(event, ui) {
			        $(ui.panel).appendTo('content');
			    }
		   });
		   $('#nav-header').tabs({
		   load: function(event, ui ) {
			    //	if (document.documentElement.clientWidth < 600) {
			    		getHTML ( 'contact', 'contact');      		
			    	}
			   // }
			}); 
	   }); 
	}

function showLoadingImage (div) {
	$('#'+div).html('<center><img src="../main/img/loading.gif"></img></center>');
}

