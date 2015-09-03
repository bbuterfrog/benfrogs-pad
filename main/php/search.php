<?php
require_once('database.php');
class search extends database {
	
	private $searchParams;
	
	/*
	 * Constructor requires comment--decodes search parameters that should be passed in as a 
	 * JSON string
	 */
	public function __construct($searchParams) {
		parent::construct();
		$this->searchParms = json_decode($searchParams);
	}
	
	public function advancedSearch () {
		
	}
}