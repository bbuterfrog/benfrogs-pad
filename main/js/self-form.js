$(document).ready(function() {
	getHeader ( );
	getHTML ( 'footer', 'footer');
	populateOptions();
	prettyPrint();
});

function populateOptions () {
	 $.getJSON("../main/php/serverHTML.php?type=JSON&content=departments",{id: $(this).val(), ajax: 'true'}, function(j){
	      var options = '';
	      for (var i = 0; i < j.length; i++) {
	        options += '<option value="' + j[i].dept_no + '">' + j[i].dept_name + '</option>';
	      }
	      $("select#department").html(options);
	    });
}