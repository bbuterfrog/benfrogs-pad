<?php
require_once('database.php');
class maps extends database {

	function __construct( ) {
		parent::__construct('sakila');
	}

	/**
	 * This function gets the points on a map between a given set of borders/lat/lng 
	 * points from the address table, returning the address_id and coordinates of those
	 * markers
	 * @param float NELat Latitude of the NorthWest corner 
	 * @param float NELon Longitude of the NorthWest corner
	 * @param float SWLat Latitude of the SouthWest corner
	 * @param float SWLon Longitude of the SouthWest corner
	 * @return array address_id's and coordinates of the points inside of the bounds
	 */
	public function getPoints ($NELat, $NELng, $SWLat, $SWLng) {
		$sql = "SELECT address_id, lat, lng FROM lat_lng WHERE lng <= :NELng AND
		        lat >= :NELat AND 
		        lng >= :SWLng AND
		        lat <= :SWLng";
		$params = array ( ':NELat' => $NELat,
				':NELng' => $NELng,
				':SWLat' => $SWLat,
				':SWLng' => $SWLng);
		return parent::boundQuery($sql, $params);
	}
}