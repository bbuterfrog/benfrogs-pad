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
		.done (function ( item ) {
        $.each(content, function() {
           options.append($("<option />").val(this.ImageFolderID).text(this.Name));
        });
   });     
        
}