<?php
require_once 'contentServer.php';
$content = $_GET['content'];
if (isset( $_GET['type'] )) {
	$type = $_GET['type'];
}
else {
	$type = 'HTML';
}
$server = new ContentServer;
if ( $type == 'HTML') {
   die ( $server->getHTML($content));
}
else if ( $type == 'JSON') {
	header('Content-Type: application/json');
	if ( $content == 'employee-dept') {
		$sql = "SELECT d.dept_no, d.dept_name FROM departments d INNER JOIN dept_emp de ON d.dept_no = de.dept_no 
                INNER JOIN employees e on de.emp_no = e.emp_no GROUP BY d.dept_no";
		die($server->getJSON($sql));
	}
	else if ($content == 'employees') {
		$deptNo = $_GET['dept'];
		$sql = "SELECT e.emp_no, concat(first_name, ' ', last_name ) AS name, title, CONCAT ('$', max(salary)) AS salary FROM 
               employees e INNER JOIN salaries s ON e.emp_no = s.emp_no INNER JOIN titles t 
               ON e.emp_no = t.emp_no INNER JOIN dept_emp de ON e.emp_no = de.emp_no WHERE
               de.dept_no = '$deptNo' GROUP BY s.emp_no";
		die($server->getJSON($sql));
	}
	else if ( $content == 'departments') {
		$sql = "SELECT dept_no, dept_name FROM departments";
		die ($server->getSimpleJSON($sql));
	}
}