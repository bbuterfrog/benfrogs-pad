$(document).ready(function() {
	getHTML ( 'footer', 'test2');
	

});

function getHTML (div, content){
   $.ajax ({
	   url: '../main/php/serverHTML.php?type=HTML&content=' + content,
	   beforeSend: showLoadingImage (div),
	   contentType : 'html',
	   
   })
   .done (function ( content ) {
	   $('#'+div).html(content);
	   if ($('#small').is(":hidden")) { 
		    getHTML ('medium', 'medium');
		}
		if ( $('#medium').is(":hidden")) {
		   getHTML ('small', 'small');
		}
   }); 
}

function showLoadingImage (div) {
	$('#'+div).html('<center><img src="../main/img/loading.gif"></img></center>');
}
