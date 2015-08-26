$(document).ready(function() {
	getHTML ( 'header', 'header' );
	if ( document.documentElement.clientWidth < 600 ) {
	    //getTabs ('head-navbar', 'mobile-head-navbar');	
	}
	else {
		getTabs ('nav-header', 'nav-header' );
	}
	getHTML ( 'footer', 'footer');
});

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
	   }); 
	}

function showLoadingImage (div) {
	$('#'+div).html('<center><img src="../main/img/loading.gif"></img></center>');
}

