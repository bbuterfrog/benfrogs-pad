<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>ArrayObject Demo</title>
</head>

<body>
<?php require_once 'displayTable.php';
$fruits = array ( 'one' => 'banana',
                  'two' => 'orange',
		  'three' => 'watermelon',
		  'four' => 'grapefruit');
$tableDisplay = new displayTable ($fruits);
print $tableDisplay->displayAsTable();
?>

</body>
</html>

