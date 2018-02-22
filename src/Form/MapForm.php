<?php

namespace App\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\FormBuilderInterface;
use App\Entity\AddrEntity;

class MapForm extends AbstractType
{
	public function buildForm(FormBuilderInterface $builder, array $options)
	{
		$builder
		->add('address', TextType::class, array('label' => False))
		->add('changeIcon', ChoiceType::class, array('label' => 'Choose Different Icon ', 'choices' => array('Circle' => 'circle','Arrow Down' => 'down', 'Arrow Up' => 'up')))
		->add('changeColor', ChoiceType::class, array('label' => 'Choose Different Color ', 'choices' => array('black' => '#000','Green' => '#00FF00','red' => '#FF0000')))
		->add('save', SubmitType::class, array('label' => 'Find', 'attr' => array('class' => 'btn')));
	}
}
