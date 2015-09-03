<?php
require_once('database.php');
class searchEmployees extends database {
	
	private $searchParams;
	
	public function __construct($searchParams) {
		parent::construct();
		$this->searchParams = $searchParams;
	}
	
	/*
	 * This function puts together a query based upon the parameters provided in $searchParams
	 * @return (array) query results 
	 */
	public function advancedSearch () {
		//build the where clause and params array
		//this is here for the later OUTER JOINs
		$where = "WHERE de2.emp_no IS NULL AND s2.emp_no IS NULL 
                 AND t2.emp_no IS NULL ";
		$params = array();
		if ($searchParams['department'] != '' ) {
			$where .= "AND department = :department";
			$deptRow = ['department' => $searchParms['department']];
			$params[] = $deptRow;
		}
		print_r ($where);
		print_r ($params);
		die();
		
	}
}