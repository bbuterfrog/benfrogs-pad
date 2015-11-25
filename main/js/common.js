function getFooter ( ) {
	$.ajax ({
		   url: '../main/php/serverHTML.php?type=HTML&content=header',
		   beforeSend: showLoadingImage ('header'),
		   contentType : 'html',
		   
	   })
	   .done (function ( content ) {
		   $('#header').html(content);
});
}

function getHTML (div, content){
   $.ajax ({
	   url: '../main/php/serverHTML.php?type=HTML&content=' + content,
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
