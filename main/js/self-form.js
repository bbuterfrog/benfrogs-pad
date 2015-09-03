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
	$.ajax ({
		  url: '../main/php/contentServer.php?type=HTML&content=searchTable',
		  contentType : 'html',
	   })
	.done (function (content ) {
		var params = { department : $('#department').val(),
			       empNo : $('#empNo').val(),
			       firstName : $('#firstName').val(),
			       lastName : $('#lastName').val(),
			       lowSalary : $('#lowSalary').val(),
			       highSalary : $('#highSalary').val(),
			       title : $('#title').val(),
			       firstHire : $('#firstHire').val(),
			       lastHire : $('#lastHire').val()};
	    var table = $('#employees').DataTable({  
	    
	   "ajax" : { 
		   "url" : '../main/php/searchServer.php',
		   "method": 'POST',
           "contentType": "application/json",
           "data" : params
	    },
	    "columns" :  [  {"data": 'emp_no' },
                        {'data': 'name'},
                        {'data': 'title'},
                        {'data': 'dept_name'},
                        {'data': 'salary'},
                        {'data': 'hire_date'}
	                 ],
	                 "scrollX": true

	   });
    });
}

