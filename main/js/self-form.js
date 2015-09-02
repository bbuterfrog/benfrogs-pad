$(document).ready(function() {
	getHeader ( );
	getHTML ( 'footer', 'footer');
	populateOptions();
	prettyPrint();
});

function populateOptions () {
   var options = $('#department');
   $.ajax ({ 
		"url" : '../main/php/serverHTML.php?type=JSON&content=departments',
   })	
		.done (function ( content ) {
        $.each(content, function() {
           options.append($("<option />").val(content['dept_no']).text(conent['dept_name']));
        });
   });     
        
}