$(document).ready(function() {
	getHTML ( 'test2', 'footer');
	if ($('#medium').is(":visible")) { 
	    getHTML ('medium', 'medium');
	}
	if ( $('#small').is(":visible")) {
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
