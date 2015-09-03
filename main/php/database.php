<?php
class database {
	private $dbh;
	
	public function __construct() {
		$parameters = parse_ini_file( '../config/db.ini');
		$user = $parameters['DB_USER'];
		$password = $parameters['DB_PASSWD'];
		$database = $parameters['DB_NAME'];
		$server = $parameters['DB_SERVER'];
		$dsn = "mysql:dbname=$database;host=$server";
		try {
		   $this->dbh = new PDO($dsn, $user, $password);
		}
		catch (PDOException $e) {
			echo "Database connection failed " . $e->getMessage();
		}
	}
	
	/*
	 * This function executes a simple query with no parameters (retaining the 
	 * possible performance advatage gained by preparing it)
	 * @param: $sql (string) sql query to be execueted (no bound parameters)
	 * @return: (array) all results of query
	 */
	public function query ( $sql ) {
		$sth = $this->dbh->prepare($sql);
		$sth->execute();
		return $sth->fetchAll(PDO::FETCH_ASSOC);
	}
	
	/*
	 * This function executes a bound query (with parameters passed in via an array)
	 * @param: $sql (string) sql query to be execueted (with parameters as :param)
	 * @param $params (array) array of parameters, need to be named as ':param' =>$param
	 * @return: (array) all results of query
	 */
	public function boundQuery ( $sql, $params ) {
		$sth = $this->dbh->prepare($sql);
		print_r ($params);
		die();
		$sth->execute($params);
		return $sth->fetchAll(PDO::FETCH_ASSOC);
	}
}