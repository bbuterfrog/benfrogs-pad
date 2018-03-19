<?php
    require_once 'contentServer.php';
    $server = new ContentServer;
    $content = $_GET['content'];
    header('Content-Type: application/json');
    if ( $content == 'employee-dept') {
		$sql = "SELECT d.dept_no, d.dept_name FROM departments d INNER JOIN dept_emp de ON d.dept_no = de.dept_no
                INNER JOIN employees e on de.emp_no = e.emp_no GROUP BY d.dept_no";
		die ($server->getSimpleJSON($sql));
	}
    else if ($content == 'employees') {
        if(isset($_GET['dept'])){
		    $deptNo = $_GET['dept'];
		    $sql = "SELECT e.emp_no, concat(first_name, ' ', last_name ) AS name, title, CONCAT('$', max(salary)) AS salary FROM
               employees e INNER JOIN salaries s ON e.emp_no = s.emp_no INNER JOIN titles t
               ON e.emp_no = t.emp_no INNER JOIN dept_emp de ON e.emp_no = de.emp_no WHERE
               de.dept_no = :deptNo GROUP BY s.emp_no";
            die($server->getSimpleJSON($sql, array(':deptNo' => $deptNo)));
        }
        else {
            $sql = "SELECT d.dept_name, e.emp_no, concat(first_name, ' ', last_name ) AS name, title, CONCAT('$', max(salary)) AS salary FROM
               employees e INNER JOIN salaries s ON e.emp_no = s.emp_no INNER JOIN titles t
               ON e.emp_no = t.emp_no INNER JOIN dept_emp de ON e.emp_no = de.emp_no
               INNER JOIN departments d ON d.dept_no = de.dept_no GROUP BY de.dept_no, s.emp_no";
               die($server->getSimpleJSON($sql, array()));
        }
    }
    else {
		$sql = "SELECT dept_no, dept_name FROM departments";
		die ($server->getSimpleJSON($sql));
	}
