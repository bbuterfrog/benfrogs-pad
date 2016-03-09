<?php
require_once 'maps.php';
$mapsServer = new maps();
$content = $_GET['content'];
switch  ($content) {   
	case 'getPoints':
		if(isset($_POST['NELat'])) {
			$NWLat = $_POST['NELat'];
		}
		else {
			die ('error: parameter NELat not set' );
		}
		if(isset($_POST['NELng'])) {
			$NWLng = $_POST['NELng'];
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
			$SWLat = $_POST['SWLng'];
		}
		else {
			die ('error: parameter SWLng not set' );
		}
		$data = $mapsServer->getPoints($NELat, $NELng, $SWLat, $SWLng);
		break;
	default:
		die ('error: unknown request');
}
die (json_encode($data));