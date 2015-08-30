<?php
class database {
	private $dbh;
	
	public function __construct() {
		$parameters = parse_ini_file( 'config/db.ini');
		$user = $parameters['DB_USER'];
		$password = $parameters['DB_PASS'];
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
		$sth->fetchAll(PDO::FETCH_ASSOC);
	}
}