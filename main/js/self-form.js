$(document).ready(function() {
	getHeader ( );
	getHTML ( 'footer', 'footer');
	$( "#firstHire" ).datepicker();
	$( "#lastHire" ).datepicker();
	prettyPrint();
});
