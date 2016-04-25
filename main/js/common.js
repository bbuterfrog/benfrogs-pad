function getHeader ( ) {
	$.ajax ({
		   url: '../main/php/serverHTML.php?type=HTML&content=header',
		   beforeSend: showLoadingImage ('header'),
		   contentType : 'html',
		   
	   })
	   .done (function ( content ) {
		   $('#header').html(content);
});
}

function showLoadingImage (div) {
	$('#'+div).html('<center><img src="../main/img/loading.gif"></img></center>');
}
