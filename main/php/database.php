<?php
ini_set ('memory_limit', '512M');
class database {
	private $dbh;

	function __construct($database = 'employees') {
		$parameters = parse_ini_file( '../config/db.ini');
		$user = $parameters['DB_USER'];
		$password = $parameters['DB_PASSWD'];
		$server = $parameters['DB_SERVER'];
		$dsn = "mysql:dbname=$database;host=$server";
		try {
		   $this->dbh = new PDO($dsn, $user, $password);
		   
		}
		catch (PDOException $e) {
			echo "Database connection failed " . $e->getMessage();
		}
		//this allows binding of LIMIT attributes
		$this->dbh->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
	}

	/**
	 * This function executes a simple query with no parameters (retaining the
	 * possible performance advatage gained by preparing it)
	 * @param: $sql (string) sql query to be execueted (no bound parameters)
	 * @return: (array) all results of query
	 */
	protected function query ( $sql ) {
		$sth = $this->dbh->prepare($sql);
		$sth->execute();
		return $sth->fetchAll(PDO::FETCH_ASSOC);
	}

	/**
	 * This function executes a bound query (with parameters passed in via an array)
	 * @param: $sql (string) sql query to be execueted (with parameters as :param)
	 * @param $params (array) array of parameters, need to be named as ':param' =>$param
	 * @param $fetch (bool) if we are fetching anything from the db (defaults to true)
	 * @return: (array) all results of query
	 */
	protected function boundQuery ( $sql, $params, $fetch=true ) {
		$sth = $this->dbh->prepare($sql);
		$sth->execute($params);
		if ($fetch == true) {
		   return $sth->fetchAll(PDO::FETCH_ASSOC);
		}
	}
}
