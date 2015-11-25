$(document).ready(function() {
	getHTML ( 'footer', 'test2');
	if ($('#small').is(":hidden")) { 
	    getHTML ('medium', 'medium');
	}
	if ( $('#medium').is(":hiddem")) {
	   getHTML ('small', 'small');
	}

});

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
