<?php
require_once 'database.php';
class contentServer {
	
	private $database;
	public function __construct(  ) {
	$this->database = new database();
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
		$resultArray = $this->database->query($sql);
		print_r($resultArray);
	}
}