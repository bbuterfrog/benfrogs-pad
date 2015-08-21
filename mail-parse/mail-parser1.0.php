<?php
require_once 'Archive/Tar.php'; 
require_once 'php-mime-mail-parser-read-only/MimeMailParser.class.php';
class mailParser {
    
    private $tmp_dir;
    private $mailfile;

    function __construct ( $tmp_dir = '/tmp/email/'  ) {
        $this->tmp_dir = $tmp_dir;
    }

    function __destruct () {
    }

    /*This function is a basic file upload-getter
     * Can be rather dangerous, for trusted sites only
     *  
     *
     * @RETURN bool true if sucessful, false if not
     */
    public function getUpload () {
        $name = $_FILES['file']["name"]; 
        $this->mailfile = $name;
        $uploadfile = $this->tmp_dir . '/' . $name;
        return move_uploaded_file ($_FILES['file']['tmp_name'], $uploadfile);

    }
    
    /*This function decompresses the gzipped tarball of
     * email messages to the class's specified folder
     * @RETURN bool true on success or false on failure
     */
    public function decompMail ($mailfile ) {
        
	$filename = $this->tmp_dir . '/' . $mailfile;

       $tar = new Archive_Tar( $filename, true);
       if ($tar->extract($this->tmp_dir)) {
           unlink ( $filename );
       }
    }

    /*This function parses the mail messages (at 
     * location $tmp_dir ) and returns an
     * array of their header contents (date sent, 
     * sender, and subject)
     * @RETURN array $mail_headers header information 
     * (date_sent, sender, and subject, indexed by
     * those keys) for messages
     */ 
    public function parseMail (  ) {
        $Parser = new MimeMailParser();
        $di = new RecursiveDirectoryIterator($this->tmp_dir);
        $mail_headers = array();
        foreach (new RecursiveIteratorIterator($di) as $filename => $file) {
            $header_row = array();

            $Parser->setPath($filename);
            $header_row['from'] = $Parser->getHeader('from');
            $header_row['subject'] = $Parser->getHeader('subject');
            $header_row['date']= $Parser->getHeader('date');
            array_push($mail_headers, $header_row);
        }
        return $mail_headers;
    }




}
?>
