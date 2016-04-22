$(document).ready(function() {
	getHeader ( );
	getHTML ( 'footer', 'footer');
	initStaticDeptTable();
	initDeptTable();
	hljs.initHighlightingOnLoad();
	
});

function initStaticDeptTable () {
	$('#dept-table').DataTable({
	"scrollX": true,
	"searching": false,
	"lengthChange": false
	});
}

!function ($) {
    $(function(){
      window.prettyPrint && prettyPrint()
    })
  }(window.jQuery)


function initDeptTable () {
	var table = $('#employee-dept').DataTable({
		"ajax" : { 
			"url" : '../main/php/serverHTML.php?type=JSON&content=employee-dept',
	        "cache": false,
            "contentType": "application/json",
		},
        "columns" :  [  
                        { "className":      'details-control',
                          "orderable":      false,
                          "data":           null,
                          "defaultContent": ''
                         },
                         {"data": 'dept_no'},
				         { "className" : 'all',
                        		 'data': 'dept_name', 'sType': 'string', 'visible': true}],
		"scrollX" : true,
		"searching": false,
		"lengthChange": false
		
	});

	   $('#employee-dept tbody').on('click', 'td.details-control', function () {
	        var tr = $(this).closest('tr');
	        var row = table.row( tr );
	 
	        if ( row.child.isShown() ) {
	            // This row is already open - close it
	            row.child.hide();
	            tr.removeClass('shown');
	        }
	        else {
	            // Open this row
	        	//get dept no
	        	var data = row.data();
	        	var deptNo = data['dept_no'];
	        	row.child( format(row.data()) ).show();
	        	var empTable = initEmployeeTable (deptNo);
	            tr.addClass('shown');
	        }
	    } );
	 
}

function format (d) {
	return '<div id=\"'+d.dept_no+'\"></div>';
		  
}
function initEmployeeTable (deptNo) {
	$.ajax ({
		   url: '../main/php/serverHTML.php?type=HTML&content=employee-table',
		   beforeSend: showLoadingImage (deptNo),
		   contentType : 'html',
	   })
	   .done (function (content ) {
	   $('#'+deptNo).html(content);	   
	   var table = $('#employees').DataTable({
		"ajax" : { 
			"url" : '../main/php/serverHTML.php?type=JSON&content=employees&dept='+deptNo,
	        "cache": false,
            "contentType": "application/json",
		},
        "columns" :  [  {"data": 'emp_no' },
                        {'data': 'name'},
                        {'data': 'title'},
                        {'data': 'salary'}
	                 ],
	                 "scrollX": true
    
	   });
    });
}


