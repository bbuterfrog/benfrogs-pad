$(document).ready(function() {
	getHTML ( 'header', 'header' );
	if ( document.documentElement.clientWidth < 600 ) {
	    getHTML ('head-navbar', 'mobile-head-navbar');	
	}
	else {
		getHTML ('head-navbar', 'head-navbar' );
		('#head-navbar').tabs();
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

function showLoadingImage (div) {
	$('#'+div).html('<center><img src="../main/img/loading.gif"></img></center>');
}

