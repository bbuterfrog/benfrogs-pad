<?php
class contentServer {
	
	
	public function __construct(  ) {
	}
	
	/* This function simply gets static html from a given file via
	 * a file_get_contents (simplest case for this class)
	 * 
	 * @arg page string: html filename (without .html on the end) of
	 * web page you want (no path, must be in /html directory)
	 * @return: string (html), web page contents you want
	 */
	public function getHTML ( $page ) {
        $filename = "../main/html/" . $page . ".html";
		return file_get_contents ($filename);
	}
}