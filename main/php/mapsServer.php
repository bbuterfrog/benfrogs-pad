<?php
require_once 'maps.php';
$mapsServer = new maps();
$content = $_GET['content'];
switch  ($content) {   
	case 'getPoints':
		if(isset($_POST['NWLat'])) {
			$NWLat = $_POST['NWLat'];
		}
		else {
			die ('error: parameter NWLat not set' );
		}
		if(isset($_POST['NWLng'])) {
			$NWLng = $_POST['NWLng'];
		}
		else {
			die ('error: parameter NWLng not set' );
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
		$data = $mapsServer->getPoints($NWLat, $NWLng, $SWLat, $SWLng);
		break;
	default:
		die ('error: unknown request');
}
die (json_encode($data));