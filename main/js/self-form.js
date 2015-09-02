$(document).ready(function() {
	getHeader ( );
	getHTML ( 'footer', 'footer');
	populateOptions();
	prettyPrint();
});

function populateOptions () {
	$.getJSON("../main/php/serverHTML.php?type=JSON&content=departments", function(result) {
		var options = $("#departments");
		for (var i = 0; i < result.length; i++) {
	    	options += '<option value="' + result[i].dept_no + '">' + result[i].dept_name + '</option>';
	    }
	});     
}