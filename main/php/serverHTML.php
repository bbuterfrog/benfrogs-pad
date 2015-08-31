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
	if ( $content == 'employee-dept') {
		$sql = "SELECT d.dept_no, d.dept_name FROM departments d INNER JOIN dept_emp de ON d.dept_no = de.dept_no 
                INNER JOIN employees e on de.emp_no = e.emp_no GROUP BY d.dept_no";
		die($server->getJSON($sql));
	}
}