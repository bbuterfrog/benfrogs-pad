<?php
require_once 'contentServer.php';
$content = $_GET['content'];
$server = new ContentServer;
die ( $server->getHTML($content));