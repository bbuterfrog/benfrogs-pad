$(document).ready(function() {
	getHeader ( );
	getHTML ( 'footer', 'footer');
	getHTML ('example', 'mapsHowItWorks');
	$('#mapsExample').on('shown.bs.collapse'), function () {
		getHTML ('example', 'mapsHowItWorks');
	});
	prettyPrint();
});