<?php
require_once 'maps.php';
$mapsServer = new maps();
if ( isset($_GET['content']) ) {
   $content = $_GET['content'];
}
else {
	die ('error: unknown request');
}
if ( isset($_GET['contentType']) ) {
   $contentType = $_GET['contentType'];
}
else {
	die ('error: must set contentType');
}
if ( $contentType == 'json' ) {
   header('Content-Type: application/json');
}
switch  ($content) {   
	case 'getPoints':
		if(isset($_POST['NELat'])) {
			$NELat = $_POST['NELat'];
		}
		else {
			die ('error: parameter NELat not set' );
		}
		if(isset($_POST['NELng'])) {
			$NELng = $_POST['NELng'];
		}
		else {
			die ('error: parameter NELng not set' );
		}
		if(isset($_POST['SWLat'])) {
			$SWLat = $_POST['SWLat'];
		}
		else {
			die ('error: parameter SWLat not set' );
		}
		if(isset($_POST['SWLng'])) {
			$SWLng = $_POST['SWLng'];
		}
		else {
			die ('error: parameter SWLng not set' );
		}
		$data = $mapsServer->getPoints($NELat, $NELng, $SWLat, $SWLng);
		break;
	case 'infoBubble' :
		$data = file_get_contents('../infoBubble.html');
		break;
	case 'customerBubble' :
		if(isset($_POST['addressID'])) {
			$addressID = $_POST['addressID'];
		}
		else {
			die ('error: parameter addressID not set' );
		}
		$data = $mapsServer->getCustomerBubble($addressID);
		break;
	case 'customerTable':
		if(isset($_POST['NELat'])) {
			$NELat = $_POST['NELat'];
		}
		else {
			die ('error: parameter NELat not set' );
		}
		if(isset($_POST['NELng'])) {
			$NELng = $_POST['NELng'];
		}
		else {
			die ('error: parameter NELng not set' );
		}
		if(isset($_POST['SWLat'])) {
			$SWLat = $_POST['SWLat'];
		}
		else {
			die ('error: parameter SWLat not set' );
		}
		if(isset($_POST['SWLng'])) {
			$SWLng = $_POST['SWLng'];
		}
		else {
			die ('error: parameter SWLng not set' );
		}
		$data = $mapsServer->getCustomerTable($NELat, $NELng, $SWLat, $SWLng);
	    break;
	default:
		die ('error: unknown request');
}
if ($contentType == 'json') {
   die (json_encode($data));
}
else { 
   die ($data);
}
