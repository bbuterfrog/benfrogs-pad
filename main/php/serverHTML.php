<?php
require_once 'contentServer.php';
$content = $_GET['content'];
$type = $_GET['type'];
$server = new ContentServer;
if ( $type == 'HTML') {
   die ( $server->getHTML($content));
}
else if ( $type == 'JSON') {
	die ( $server->getJSON($content));
}