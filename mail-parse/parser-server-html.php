<?php
$content = $_GET['content'];
switch ($content) {
    
    case 'upload-form' :
    //simple file upload form
    $return = "<form enctype=\"multipart/form-data\">
        <input type=\"hidden\" name=\"MAX_FILE_SIZE\" value=\"100000\" />
        Choose a file to upload: <input name=\"uploadedfile\" id=\"uploadedfile\" type=\"file\" /><br />
        <input class=\"btn\" id=\"submit\" value=\"Upload File\" />
        </form>";
        print ($return);
    break;

case 'upload-file' :
    //call upload function, return table text
    require_once 'mail-parser.php';
    $filename = $_GET['mail-file'];
    $parser = new mailParser ( );
    if ( $parser->getUpload ( ) == true ) {
    //table of email headers
    $return .= "<div id=\"headers\">".
            "<h2>Email Headers</h2>".
            "<table id=\"header_table\" class=\"display\" cellspacing=\"0\" width=\"100%\">".
                    "<thead>".
                        "<tr>".
                "<th>Filename</th>".
                "<th>From</th>".
                "<th>Subject</th>".
                "<th>Date</th>".
            "</tr>".
        "</thead>".   
        "<tbody>".
        "</tbody>".
        "</table>";
    "</div>";
    }
    
    else ( $return = "<div id=\"Headers\"><h2> Error: Could not upload file</h2></div>");
    print ($return);
    break;

}
?>
