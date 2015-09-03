<?php
require_once 'search.php';
$employeeSearch = new searchEmployees ($_POST);
print_r($employeeSearch->advancedSearch());
die();
die (json_encode($$employeeSearch->advancedSearch()));