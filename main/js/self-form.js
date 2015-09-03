$(document).ready(function() {
	getHeader ( );
	getHTML ( 'footer', 'footer');
	$( "#firstHire" ).datepicker();
	$( "#lastHire" ).datepicker();
	prettyPrint();
	$('#search').click(function() {
	   submitSearch();
	});
});

function submitSearch() {
	/*var department = $('#department').val();
	var empNo = $('#empNo').val();
	var firstName = $('#firstName').val();
	var lastName = $('#lastName').val();
	var lowSalary = $('#lowSalary').val();
	var highSalary = $('#highSalary').val();
	var title = $('#title').val();
	var firstHire = $('firstHire').val();
	var lastHire = $('lastHire').val();*/
	
	var params = { department : $('#department').val() };
}
