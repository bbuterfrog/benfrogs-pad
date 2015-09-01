$(document).ready(function() {
	getHeader ( );
	getHTML ( 'footer', 'footer');
});

function getHeader ( ) {
	$.ajax ({
		   url: '../main/php/serverHTML.php?type=HTML&content=header',
		   beforeSend: showLoadingImage ('header'),
		   contentType : 'html',
		   
	   })
	   .done (function ( content ) {
		   $('#header').html(content);
		   getTabs ( )
	   });
}

function getHTML (div, content){
   $.ajax ({
	   url: '../main/php/serverHTML.php?type=HTML&content=' + content,
	   beforeSend: showLoadingImage (div),
	   contentType : 'html',
	   
   })
   .done (function ( content ) {
	   $('#'+div).html(content);
   }); 
}

function getTabs ( ){
	   $.ajax ({
		   url: '../main/php/serverHTML.php?type=HTML&content=nav-header',
		   beforeSend: showLoadingImage ( 'nav-header' ),
		   contentType : 'html',
		   
	   })
	   .done (function ( content ) {
		   $('#nav-header').html(content);
		   $('#nav-header').tabs({
			    add: function(event, ui) {
			        $(ui.panel).appendTo('content');
			    },
		   load: function(event, ui ) {
			   var $activeTab = $('#nav-header').tabs('option', 'active');
			   if ( $activeTab == 0 ){
				   initStaticDeptTable();
				   initDeptTable();
			   }
			   else if ($activeTab == 2) {
			    	if (document.documentElement.clientWidth < 600) {
			    		getHTML ( 'contact', 'contact');      		
			    	}
			    }
		   } 
	   }); 
	});
}	   
function showLoadingImage (div) {
	$('#'+div).html('<center><img src="../main/img/loading.gif"></img></center>');
}

function initStaticDeptTable () {
	$('#dept-table').DataTable({
	"scrollX": true,
	"searching": false,
	"lengthChange": false
	});
}


function initDeptTable () {
	var table = $('#employee-dept').DataTable({
		"ajax" : { 
			"url" : '../main/php/serverHTML.php?type=JSON&content=employee-dept',
	        "cache": false,
            "contentType": "application/json",
		},
        "columns" :  [  {"data": 'dept_no', "className" : 'never' },
                        { "className":      'details-control',
                          "orderable":      false,
                          "data":           null,
                          "defaultContent": ''
                         },
				         
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
	            table.columns.adjust();
	            table.responsive.recalc();
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