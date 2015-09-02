$(document).ready(function() {
	getHeader ( );
	getHTML ( 'footer', 'footer');
	populateOptions();
	prettyPrint();
});

function populateOptions () {
	$.getJSON("../main/php/serverHTML.php?type=JSON&content=departments", function(result) {
	    var options = $("#options");
	    $.each(result, function() {
	        options.append($("<option />").val(this.dept_no).text(this.dept_name));
	    });
	});
}