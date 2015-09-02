$(document).ready(function() {
	getHeader ( );
	getHTML ( 'footer', 'footer');
	populateOptions();
	prettyPrint();
});

function populateOptions () {
	$.getJSON("../main/php/serverHTML.php?type=JSON&content=departments", function(result) {
		var options = $("#departments");
		var i = 0;
		$.each(result, function() {
		    options.append($("<option />").val(result.data[i]['emp_no']).text(result.data[i]['dept_name']));
		    i++;
		});
	});     
}