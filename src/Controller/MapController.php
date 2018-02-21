<?php
namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class MapController extends Controller
{
    public function map()
    {
			return $this->render('map.html.twig');
			
    }
}

// Resources
// https://symfony.com/doc/current/page_creation.html
// https://stackoverflow.com/questions/19245800/how-to-change-icon-on-google-map-marker
// https://developers.google.com/maps/documentation/javascript/styling
// https://developers.google.com/maps/documentation/javascript/custom-markers
// 	https://stackoverflow.com/questions/35546041/google-map-marker-customization-by-google-maps-symbolpath-circle
// https://developers.google.com/maps/documentation/javascript/symbols
