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
		   getTabs ('nav-header', 'content')
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

function getTabs (div, content){
	   $.ajax ({
		   url: '../main/php/serverHTML.php?content=' + content,
		   beforeSend: showLoadingImage (div),
		   contentType : 'html',
		   
	   })
	   .done (function ( content ) {
		   $('#'+div).html(content);
		   $( '#'+div ).tabs();
		   $('#'+div).tabs({
			    add: function(event, ui) {
			        $(ui.panel).appendTo('content');
			    }
			}); 
	   }); 
	}

function showLoadingImage (div) {
	$('#'+div).html('<center><img src="../main/img/loading.gif"></img></center>');
}

