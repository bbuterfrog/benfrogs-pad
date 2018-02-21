<?php
require_once 'database.php';
/**
 * Gets content from either static HTML files or the database
 */
class contentServer extends database {


	/** Simply gets static html from a given file via
	 * a file_get_contents (simplest case for this class)
	 *
	 * @param string $page: html filename (without .html on the end) of
	 * web page you want (no path)
	 * @return string web page contents you want
	 */
	public function getHTML ( $page ) {
        $filename = "../" . $page . ".html";
		return file_get_contents ($filename);
	}

	/**
	 * Returns JSON formatted for a DataTable by querying the database
	 * (using the database class) with the provided $sql string
	 * @param string $sql SQL to query db with to get JSON
	 * @param array $params parameters to bind with the SQL
	 * @return string JSON to go into DataTable
	 *
	 *
	 */
	public function getJSON ( $sql,  $params = array()){
		if (!empty($params)) {
		    $resultArray = parent::boundQuery($sql, $params);
		}
		else {
			$resultArray = parent::query($sql);
		}
		$result = array ( 'data' => $resultArray);
		return (json_encode($result));
	}

	/**
	 * Returns JSON NOT formatted for a DataTable by querying the database
	 * (using the database class) with the provided $sql string (no bound
	 * parameters allowed in SQL)
	 * @param string $sql SQL to query db with to get JSON
	 * @return string JSON
	 *
	 */
	public function getSimpleJSON ( $sql ){
		$resultArray = parent::query($sql);
		return (json_encode($resultArray));
	}
}
