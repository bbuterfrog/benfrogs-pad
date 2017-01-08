$(document).ready(function() {
	getHeader ( );
	getHTML ( 'footer', 'footer');
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
