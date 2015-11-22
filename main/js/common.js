function getHeader ( title, script ) {
	$.ajax ({
		   url: '../main/php/serverHTML.php?type=HTML&content=header',
		   beforeSend: showLoadingImage ('header'),
		   contentType : 'html',
		   
	   })
	   .done (function ( content ) {
		   content = headerSub(content, title, script);
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

function headerSub ( content, title, script ) {
	$(content).('#page-title').html(title);
	$(content).('#page-script').html(script);
}