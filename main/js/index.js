$(document).ready(function() {
	getHTML ( 'header', 'header' );
});

function getHTML (div, content){
   $.ajax ({
	   url: '../main/php/serverHTML.php?content=' + content,
	   beforeSend: showLoadingImage (div),
	   contentType : 'html',
	   done: function ( html ) {
		   $('#'+div).html(html);
	   } 
   });
}

function showLoadingImage (div) {
	$('#'+div).html('<center><img src="../img/loading.gif"></img></center>');
}