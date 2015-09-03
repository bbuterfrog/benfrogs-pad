<?php
require_once('database.php');
class searchEmployees extends database {
	
	private $searchParams;
	
	public function __construct($searchParams) {
		parent::__construct();
		$this->searchParams = $searchParams;
	}
	
	/*
	 * This function puts together a query based upon the parameters provided in $searchParams
	 * @return (array) query results or (string) error message
	 */
	public function advancedSearch () {
		$select = "SELECT e.emp_no, concat(e.first_name, ' ', e.last_name) AS name, 
				   DATE_FORMAT(e.hire_date, '%c-%e-%Y') AS hire_date,
                   d.dept_name, concat('$', s.salary) AS salary, t.title 
                   FROM employees e INNER JOIN dept_emp de ON e.emp_no = de.emp_no
                   INNER JOIN departments d ON de.dept_no = d.dept_no
                   INNER JOIN salaries s ON s.emp_no = e.emp_no
                   INNER JOIN titles t ON e.emp_no = t.emp_no
                   LEFT OUTER JOIN dept_emp AS de2
                   ON de.emp_no = de2.emp_no 
                   AND de.from_date < de2.from_date  
                   LEFT OUTER JOIN salaries AS s2
                   ON s.emp_no = s2.emp_no 
                   AND s.from_date < s2.from_date
                   LEFT OUTER JOIN titles AS t2
                   ON t.emp_no = t2.emp_no 
                   AND t.from_date < t2.from_date ";
		//build the where clause and params array
		//this is here for the OUTER JOINs
		$where = "WHERE de2.emp_no IS NULL AND s2.emp_no IS NULL 
                 AND t2.emp_no IS NULL ";
		$params = array();
		if ($this->searchParams['department'] != '' ) {
			$where .= "AND department = :department ";
			$params[':department'] = $this->searchParams['department'];
		}
		else if ($this->searchParams['empNo'] != '' ) {
			$where .= "AND empNo = :empNo ";
			$empNo = [':empNo' => $this->searchParams['empNo']];
			$params[] = $empNo;
		}
		else if ($this->searchParams['firstName'] != '' ) {
			$where .= "AND firstName LIKE :firstName ";
			$firstName = [':firstName' => $this->searchParams['firstName']];
			$params[] = $firstName;
		}
		else if ($this->searchParams['lastName'] != '' ) {
			$where .= "AND lastName LIKE :lastName ";
			$lastName = [':lastName' => $this->searchParams['lastName']];
			$params[] = $lastName;
		}
		else if ($this->searchParams['title'] != '' ) {
			$where .= "AND title LIKE :title ";
			$title = [':title' => $this->searchParams['title']];
			$params[] = $title;
		}
		else if ( $this->searchParams['lowSalary'] != '') {
			if ($this->searchParams['highSalary'] != '') {
				$where .= "AND salary BETWEEN :lowSalary AND :highSalary ";
				$lowSalary = [':lowSalary' => $this->searchParams['lowSalary']];
				$highSalary = [':highSalary' => $this->searchParams['highSalary']];
				$params[] = $lowSalary;
				$params[] = $highSalary;
			}
			else {
			   return ("You must give both a high and low salary");
			}
		}
		else if ( $this->searchParams['highSalary'] != '') {
			if ($this->searchParams['lowSalary'] != '') {
				$where .= "AND salary BETWEEN :lowSalary AND :highSalary ";
				$lowSalary = [':lowSalary' => $this->searchParams['lowSalary']];
				$highSalary = [':highSalary' => $this->searchParams['highSalary']];
				$params[] = $lowSalary;
				$params[] = $highSalary;
			}
			else {
				return ("You must provide a range of salaries");
			}
		}
		
		else if ( $this->searchParams['firstHire'] != '') {
			if ($this->searchParams['lastHire'] != '') {
				$where .= "AND hire_date BETWEEN :firstHire AND :lastHire ";
				$lowSalary = [':firstHire' => $this->searchParams['firstHire']];
				$highSalary = [':lastHire' => $this->searchParams['lastHire']];
				$params[] = $firstHire;
				$params[] = $lastHire;
			}
			else {
				return ("You must provide a range of hire dates");
			}
		}
		else if ( $this->searchParams['lastHire'] != '') {
			if ($this->searchParams['firstHire'] != '') {
				$where .= "AND salary BETWEEN :firstHire AND :lastHire ";
				$lowSalary = [':firstHire' => $this->searchParams['lastHire']];
				$highSalary = [':lastHire' => $this->searchParams['lastHire']];
				$params[] = $firstHire;
				$params[] = $lastHire;
			}
			else {
				return ("You must provide a range of hire dates");
			}
		}
		else {
			return ("You must provide at least one search parameter");
		}
		$sql = $select . $where;
		print_r ($sql);
		die();
		return parent::boundQuery($sql, $params);
	}
}