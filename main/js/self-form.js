$(document).ready(function() {
	getHeader ( );
	getHTML ( 'footer', 'footer');
	populateOptions();
	prettyPrint();
});

function populateOptions () {
	$.getJSON("../main/php/serverHTML.php?type=JSON&content=departments", function(result) {
	    var options = $("#options");
	    //iterate over the data and append a select option
	    $.each(data, function(val){
	      options.append('<option id="' + val.dept_num + '">' + val.dept_name + '</option>');
	    })
	  });
}