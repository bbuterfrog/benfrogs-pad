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
		if ($this->searchParams['deptNo'] != '' ) {
			$where .= "AND de.dept_no = :deptNo ";
			$params[':deptNo'] = $this->searchParams['deptNo'];
		}
		else if ($this->searchParams['empNo'] != '' ) {
			$where .= "AND e.emp_no = :empNo ";
			$params[':empNo'] = $this->searchParams['empNo'];
		}
		else if ($this->searchParams['firstName'] != '' ) {
			$where .= "AND e.first_name LIKE :firstName ";
			$params[':firstName'] = $this->searchParams['firstName'];
		}
		else if ($this->searchParams['lastName'] != '' ) {
			$where .= "AND e.last_name LIKE :lastName ";
			$params[':lastName'] = $this->searchParams['lastName'];
		}
		else if ($this->searchParams['title'] != '' ) {
			$where .= "AND t.title LIKE :title ";
			$params[':title'] = $this->searchParams['title'];
		}
		else if ( $this->searchParams['lowSalary'] != '') {
			if ($this->searchParams['highSalary'] != '') {
				$where .= "AND s.salary BETWEEN :lowSalary AND :highSalary ";
				$params[':lowSalary'] = $this->searchParams['lowSalary'];
				$params[':highSalary'] = $this->searchParams['highSalary'];
			}
			else {
				$where .= "AND s.salary >= :lowSalary ";
			    $params[':lowSalary'] = $this->searchParams['lowSalary'];
			}
		}
		else if ( $this->searchParams['highSalary'] != '') {
			if ($this->searchParams['lowSalary'] != '') {
				$where .= "AND s.salary BETWEEN :lowSalary AND :highSalary ";
				$params[':lowSalary'] = $this->searchParams['lowSalary'];
				$params[':highSalary'] = $this->searchParams['highSalary'];
			}
			else {
				$where .= "AND s.salary <= :highSalary ";
				$params[':highSalary'] = $this->searchParams['highSalary'];
			}
		}
		
		else if ( $this->searchParams['firstHire'] != '') {
			if ($this->searchParams['lastHire'] != '') {
				$where .= "AND e.hire_date >= :firstHire AND 
						   e.hire_date <= :lastHire ";
				$params[':firstHire'] = $this->searchParams['firstHire'];
				$params[':lastHire'] = $this->searchParams['lastHire'];
			}
			else {
				$where .= "AND e.hire_date >= :firstHire ";
				$params[':firstHire'] = $this->searchParams['firstHire'];
			}
		}
		else if ( $this->searchParams['lastHire'] != '') {
			if ($this->searchParams['firstHire'] != '') {
				$where .= "AND e.hire_date >= :firstHire AND 
						   e.hire_date <= :lastHire ";
				$params[':firstHire'] = $this->searchParams['lastHire'];
				$params[':lastHire'] = $this->searchParams['lastHire'];
			}
				else {
				$where .= "AND e.hire_date <= :lastHire ";
				$params[':lastHire'] = $this->searchParams['lastHire'];
			}
		}
		$sql = $select . $where;
		return parent::boundQuery($sql, $params);
	}
}