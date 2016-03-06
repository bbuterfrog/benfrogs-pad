$(document).ready(function() {
	getHeader ( );
	getHTML ( 'footer', 'footer');
	getHTML ('innerHowItWorks', 'mapsHowItWorks');
	$('#howItWorks').on('shown.bs.collapse', function () {
		getHTML ('innerHowItWorks', 'howItWorks');
	});
	prettyPrint();
});