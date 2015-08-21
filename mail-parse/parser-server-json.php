<?php
require_once 'mail-parser.php';
$content = $_GET['content'];
switch ($content) {
case 'header-table':
    $mailfile = $_GET['mailfile'];
        $parser = new mailParser ();
        $parser->decompMail($mailfile);
        $headert = $parser->parseMail();        
        
        //datatables formatting...
        $return = array();
        foreach ( $headert as $row ) {    
            $returnRow = array();
            array_push ( $returnRow, $row['filename']);
            array_push ( $returnRow, $row['from']);
            array_push ( $returnRow, $row['subject']);
            array_push ( $returnRow, $row['date']);
        array_push ($return, $returnRow);
        
        }
        break;

}
//datatables formatting...
$return = array("aaData" => $return);
header('Content-Type: application/json');
die (json_encode ($return));


?>
