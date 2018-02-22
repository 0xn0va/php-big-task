<?php

namespace App\Utils;

use App\Entity\AddrEntity;

class GmapUtil
{
	protected $GmapAPI;
	public function __construct($GmapAPI)
	{
		$this->GmapAPI = $GmapAPI;
	}
	
	public function getLatLng($address)
	{
		$client = new \GuzzleHttp\Client();
		
		$response = $client->request('GET', 'https://maps.googleapis.com/maps/api/geocode/json', ['query' => ['address' => $address, 'key' => 'AIzaSyDEJApn1weBvRmXgpTTvhkpbPrfUiXPkM8']]);
		
		$data = json_decode($response->getBody());
		
		$AddrEntity = new AddrEntity();
		$AddrEntity->setAddress($data->results[0]->formatted_address);
		$AddrEntity->setLatitude($data->results[0]->geometry->location->lat);
		$AddrEntity->setLongitude($data->results[0]->geometry->location->lng);
		
		return $AddrEntity;
	}
}
