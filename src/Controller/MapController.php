<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Cookie;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use App\Utils\GmapUtil;
use App\Entity\AddrEntity;
use App\Form\MapForm;

class MapController extends Controller
{
	public function map(Request $request)
	{
		$AddrEntity = new AddrEntity();
		$mapForm = $this->createForm(MapForm::class, $AddrEntity);
		$mapForm->handleRequest($request);
		
		if ($mapForm->isSubmitted()) {
			
			$google_maps_geocode = new GmapUtil('AIzaSyDEJApn1weBvRmXgpTTvhkpbPrfUiXPkM8');
			$AddrEntity = $google_maps_geocode->getLatLng($AddrEntity->getAddress());
			
			$coordinations = array(
				'latitude' => $AddrEntity->getLatitude(),
				'longitude' => $AddrEntity->getLongitude(),
				'address' => $AddrEntity->getAddress(),
				'changeIcon' => $mapForm->getData()->getChangeIcon(),
				'changeColor' => $mapForm->getData()->getChangeColor());
				
				$mapForm = $this->createForm(MapForm::class, $AddrEntity);
				
				$cookies = $request->cookies;
				if ($cookies->has('allCoords')) {
					$allCoords = json_decode($cookies->get('allCoords'));
					array_push($allCoords, $coordinations);
				} else {
					$allCoords = [];
					array_push($allCoords, $coordinations);
				}
				
				$coordData = $this->render("map.html.twig", array('form' => $mapForm->createView(), 'allCoords' => $allCoords));
				$coordData->headers->setCookie(new Cookie('allCoords', json_encode($allCoords)));
				return $coordData;
			}
			return $this->render("map.html.twig", array('form' => $mapForm->createView()));
		}
		
	}
	
	// Resources
	// https://symfony.com/doc/current/page_creation.html
	// https://stackoverflow.com/questions/19245800/how-to-change-icon-on-google-map-marker
	// https://developers.google.com/maps/documentation/javascript/styling
	// https://developers.google.com/maps/documentation/javascript/custom-markers
	// 	https://stackoverflow.com/questions/35546041/google-map-marker-customization-by-google-maps-symbolpath-circle
	// https://developers.google.com/maps/documentation/javascript/symbols
	// https://symfony.com/doc/current/introduction/from_flat_php_to_symfony2.html
	// http://symfony.com/doc/current/doctrine.html#generating-getters-and-setters
	// https://symfony.com/doc/current/forms.html
	// http://symfony.com/doc/current/doctrine.html#creating-the-database-tables-schema
	// http://symfony.com/doc/current/best_practices/business-logic.html
	// http://symfony.com/doc/current/bundles/best_practices.html
	// http://docs.guzzlephp.org/en/stable/
	// https://packagist.org/packages/cirovargas/google-distance-matrix
	// https://packagist.org/packages/metasyntactical/google-directions-client
	// https://symfony.com/doc/master/bundles/SensioGeneratorBundle/commands/generate_doctrine_entity.html
	// https://symfony.com/doc/current/components/http_foundation.html
	// https://straightupcraft.com/articles/testing-if-something-exists-is-defined-length-is-not-null-is-not-empty
