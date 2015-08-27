$(document).ready(function() {
	getHeader ( );
	getFooter ();
});

function getHeader ( ) {
	$.ajax ({
		   url: '../main/php/serverHTML.php?content=header',
		   beforeSend: showLoadingImage ('header'),
		   contentType : 'html',
		   
	   });
	   .done (function ( content ) {
		   $('#header').html(content);
		   getTabs ( );
	   });
}

function getFooter ( ) {
	$.ajax ({
		   url: '../main/php/serverHTML.php?content=footer',
		   beforeSend: showLoadingImage ('footer'),
		   contentType : 'html',
		   
	   });
	   .done (function ( content ) {
		   $('#footer').html(content);
		   if (document.documentElement.clientWidth < 600) {
			   $.ajax ({
				  url '../main/php/serverHTML.php?content=contact',
				  beforeSend: showLoadingImage ('contact'),
			      contentType: 'html',
		      });
		      .done (function) (contactContent) {
			      $('#contact').html(contactContent);
		      });
           }
		)};
}

function getTabs ( ){
	   $.ajax ({
		   url: '../main/php/serverHTML.php?content=nav-header',
		   beforeSend: showLoadingImage ( 'nav-header' ),
		   contentType : 'html',
		   
	   });
	   .done (function ( content ) {
		   $('#nav-header').html(content);
		   $( '#nav-header' ).tabs();
		   $('#nav-header').tabs({
			    add: function(event, ui) {
			        $(ui.panel).appendTo('content');
			    }
			}); 
	   }); 
	}

function showLoadingImage (div) {
	$('#'+div).html('<center><img src="../main/img/loading.gif"></img></center>');
}

