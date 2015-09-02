$(document).ready(function() {
	getHeader ( );
	getHTML ( 'footer', 'footer');
	populateOptions();
	prettyPrint();
});

function populateOptions () {
	$.getJSON("../main/serverHTML.php?type=JSON&content=departments", function(result) {
		var options = $("#departments");
		$.each(result, function() {
		    options.append($("<option />").val(this.ImageFolderID).text(this.Name));
		});
	});     
}