<?php
namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class MapController extends Controller
{
    public function map()
    {
        $coords = "65.0121° N, 25.4651° E";

				return $this->render('map.html.twig', array(
	            'coords' => $coords,
	        ));
    }
}

// Resources
// https://symfony.com/doc/current/page_creation.html
