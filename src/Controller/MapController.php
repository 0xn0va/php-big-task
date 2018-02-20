<?php
namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class MapController extends Controller
{
    public function map()
    {
        $number = mt_rand(0, 100);

				return $this->render('map.html.twig', array(
	            'number' => $number,
	        ));
    }
}

// Resources
// https://symfony.com/doc/current/page_creation.html
