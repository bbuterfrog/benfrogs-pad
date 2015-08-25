$(document).ready(function() {
	getHTML ( 'header', 'header' );
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