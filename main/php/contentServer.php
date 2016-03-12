<?php
require_once 'database.php';
class contentServer extends database {
	function __construct() {
		if (isset($_GET['database'])) {
			$database = $_GET['database'];
		}
		else {
			$database = 'employees';
		}
		parent::__construct($database);
	}
		
	/* This function simply gets static html from a given file via
	 * a file_get_contents (simplest case for this class)
	 * 
	 * @param $page (string): html filename (without .html on the end) of
	 * web page you want (no path)
	 * @return: (html), web page contents you want
	 */
	public function getHTML ( $page ) {
        $filename = "../" . $page . ".html";
		return file_get_contents ($filename);
	}
	
	/*
	 * This function returns JSON formatted for a DataTable by querying the database
	 * (using the database class) with the provided $sql string (no bound 
	 * parameters allowed in SQL)
	 * @param (string) $sql SQL to query db with to get JSON
	 * @return (string) JSON to go into DataTable
	 * 
	 */
	public function getJSON ( $sql ){
		$resultArray = parent::query($sql);
		$result = array ( 'data' => $resultArray);
		return (json_encode($result));
	}
	
	/*
	 * This function returns JSON NOT formatted for a DataTable by querying the database
	 * (using the database class) with the provided $sql string (no bound
	 * parameters allowed in SQL)
	 * @param (string) $sql SQL to query db with to get JSON
	 * @return (string) JSON 
	 *
	 */
	public function getSimpleJSON ( $sql ){
		$resultArray = parent::query($sql);
		return (json_encode($resultArray));
	}
}