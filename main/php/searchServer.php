<?php
require_once 'search.php';
die ($_POST);
$employeeSearch = new searchEmployees ($_POST);
die (json_encode($employeeSearch->advancedSearch()));