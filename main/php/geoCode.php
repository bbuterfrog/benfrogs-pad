<?php
require_once 'database.php';
class geoCode extends database {
	private $geoKey;
	function __construct() {
		parent::__construct('sakila');
		//parse ini file to get key to Google geocoder API
		$parameters = parse_ini_file( '../config/geocode.ini');
		$this->geoKey = $parameters['geoKey']; 
	}
    /**
     * This function gets all addresses from a table in the database (joins address with a city table, 
     * by city id, then country table by country id) "sticks them together", and geocodes them to the
     * lat/lon table 
     */
	public function geoCoder () {
		$sql = "SELECT address_id, address, postal_code, city, country FROM address a INNER JOIN city c ON a.city_id
               = c.city_id INNER JOIN country co ON c.country_id = co.country_id";
		$addressArray = parent::query($sql);
		//implode address array line-by-line and feed it to Google Geocoder web service
		foreach ( $addressArray as $key => $row ){ 
		   $address = str_replace(' ', '+', $row['address']) . "+" . str_replace(' ', '+', $row['city']) . "+" . 
		   $row['postal_code'];
		   $geoCoderRequest = 'https://maps.googleapis.com/maps/api/geocode/json?address=' . $address . 
				   '&components=country:' .  str_replace(' ', '+', $row['country']) . '&key=' .
		      $this->geoKey;
		   //get result, json_decode it
		   $geoCoderResult = json_decode(file_get_contents($geoCoderRequest), true);
		   if ($geoCoderResult['status'] == 'OK') {
   		      //insert lat,lon into table from results
		      $sql = "INSERT INTO lat_lng (address_id, lat, lon) VALUES (:address_id, :lat, :lng) ON DUPLICATE KEY UPDATE
		   		   SET lat = :lat, lng = :lng";
		      $params[':address_id'] = $row['address_id'];
		      $params[':lat'] = $geoCoderResult['results'][0]['geometry']['location']['lat'];
		      $params[':lng'] = $geoCoderResult['results'][0]['geometry']['location']['lng'];
		      parent::boundQuery($sql, $params);
		   }
		 else { 
		 	print ("GeoCoder Error: {$geoCoderResult['status']}\n");
		 }	
		 }
	}
}
