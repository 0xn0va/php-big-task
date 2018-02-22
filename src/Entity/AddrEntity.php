<?php

namespace App\Entity;

class AddrEntity
{
	protected $address;
	protected $latitude;
	protected $longitude;
	protected $changeIcon;
	protected $changeColor;
	
	/**
	* @return mixed
	*/
	public function getAddress()
	{
		return $this->address;
	}
	
	/**
	* @param mixed $address
	*/
	public function setAddress($address): void
	{
		$this->address = $address;
	}
	
	/**
	* @return mixed
	*/
	public function getLatitude()
	{
		return $this->latitude;
	}
	
	/**
	* @param mixed $latitude
	*/
	public function setLatitude($latitude): void
	{
		$this->latitude = $latitude;
	}
	
	/**
	* @return mixed
	*/
	public function getLongitude()
	{
		return $this->longitude;
	}
	
	/**
	* @param mixed $longitude
	*/
	public function setLongitude($longitude): void
	{
		$this->longitude = $longitude;
	}
	
	/**
	* @return mixed
	*/
	public function getChangeColor()
	{
		return $this->changeColor;
	}
	
	/**
	* @param mixed $markerColor
	*/
	public function setChangeColor($changeColor): void
	{
		$this->changeColor = $changeColor;
	}
	
	/**
	* @return mixed
	*/
	public function getChangeIcon()
	{
		return $this->changeIcon;
	}
	
	/**
	* @param mixed $changeIcon
	*/
	public function setChangeIcon($changeIcon): void
	{
		$this->changeIcon = $changeIcon;
	}
}
