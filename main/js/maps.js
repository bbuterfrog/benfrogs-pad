$(document).ready(function() {
	getHeader ( );
	getHTML ( 'footer', 'footer');
	getHTML ('example', 'mapsHowItWorks');
	$('#howItWorks').on('shown.bs.collapse', function () {
		getHTML ('innerHowItWorks', 'howItWorks');
	});
	prettyPrint();
});