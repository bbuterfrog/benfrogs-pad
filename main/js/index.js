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

function initDeptTable () {
	$('#employee-dept').DataTable({
		"ajax" : { 
			"url" : '../main/php/serverHTML.php?type=JSON&content=employee-dept',
	        "cache": false,
            "contentType": "application/json",
		},
        "columns" :  [  { 'visible': false },
                        { "className":      'details-control',
                          "orderable":      false,
                          "data":           null,
                          "defaultContent": ''
                         },
				         
				         { "className" : 'all',
                        		 'data': 'dept_name', 'sType': 'string', 'visible': true}],
		"responsive" : {
			details : false
		},
		"searching": false,
		"lengthChange": false
		
	})
	.columns.adjust();
	
	 
}
