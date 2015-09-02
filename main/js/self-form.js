$(document).ready(function() {
	getHeader ( );
	getHTML ( 'footer', 'footer');
	populateOptions();
	prettyPrint();
});

function populateOptions () {
   var options = $('#department');
   $.ajax ({ 
		"url" : '../main/php/serverHTML.php?type=JSON&content=departments'
   })	
		.done (function ( result ) {
        $.each(result, function() {
           options.append($("<option />").val(this.dept_no).text(this.dept_name));
        });
   });     
        
}