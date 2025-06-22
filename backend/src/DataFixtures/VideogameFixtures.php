<?php

namespace App\DataFixtures;

use App\Entity\Videogame;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class VideogameFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $videogames = [
            ['title' => 'The Legend of Zelda', 'company' => 'Nintendo', 'year' => '1986', 'price' => '59.99'],
            ['title' => 'Super Mario Bros.', 'company' => 'Nintendo', 'year' => '1985', 'price' => '49.99'],
            ['title' => 'Minecraft', 'company' => 'Mojang', 'year' => '2011', 'price' => '26.95'],
            ['title' => 'The Witcher 3', 'company' => 'CD Projekt', 'year' => '2015', 'price' => '39.99'],
            ['title' => 'Cyberpunk 2077', 'company' => 'CD Projekt', 'year' => '2020', 'price' => '59.99'],
            ['title' => 'Grand Theft Auto V', 'company' => 'Rockstar Games', 'year' => '2013', 'price' => '29.99'],
            ['title' => 'Red Dead Redemption 2', 'company' => 'Rockstar Games', 'year' => '2018', 'price' => '59.99'],
            ['title' => 'Call of Duty: Modern Warfare', 'company' => 'Activision', 'year' => '2019', 'price' => '59.99'],
            ['title' => 'Fortnite', 'company' => 'Epic Games', 'year' => '2017', 'price' => '0.00'],
            ['title' => 'Apex Legends', 'company' => 'Respawn Entertainment', 'year' => '2019', 'price' => '0.00'],
            ['title' => 'Overwatch', 'company' => 'Blizzard Entertainment', 'year' => '2016', 'price' => '39.99'],
            ['title' => 'League of Legends', 'company' => 'Riot Games', 'year' => '2009', 'price' => '0.00'],
            ['title' => 'Valorant', 'company' => 'Riot Games', 'year' => '2020', 'price' => '0.00'],
            ['title' => 'Hollow Knight', 'company' => 'Team Cherry', 'year' => '2017', 'price' => '14.99'],
            ['title' => 'Celeste', 'company' => 'Maddy Makes Games', 'year' => '2018', 'price' => '19.99'],
            ['title' => 'Dark Souls III', 'company' => 'FromSoftware', 'year' => '2016', 'price' => '59.99'],
            ['title' => 'Elden Ring', 'company' => 'FromSoftware', 'year' => '2022', 'price' => '59.99'],
            ['title' => 'Animal Crossing: New Horizons', 'company' => 'Nintendo', 'year' => '2020', 'price' => '59.99'],
            ['title' => 'Stardew Valley', 'company' => 'ConcernedApe', 'year' => '2016', 'price' => '14.99'],
            ['title' => 'Terraria', 'company' => 'Re-Logic', 'year' => '2011', 'price' => '9.99'],
            ['title' => 'Among Us', 'company' => 'Innersloth', 'year' => '2018', 'price' => '4.99'],
            ['title' => 'Fall Guys', 'company' => 'Mediatonic', 'year' => '2020', 'price' => '19.99'],
            ['title' => 'Portal 2', 'company' => 'Valve', 'year' => '2011', 'price' => '9.99'],
            ['title' => 'Half-Life 2', 'company' => 'Valve', 'year' => '2004', 'price' => '9.99'],
            ['title' => 'BioShock', 'company' => '2K Games', 'year' => '2007', 'price' => '19.99'],
            ['title' => 'BioShock Infinite', 'company' => '2K Games', 'year' => '2013', 'price' => '29.99'],
            ['title' => 'Mass Effect 2', 'company' => 'BioWare', 'year' => '2010', 'price' => '19.99'],
            ['title' => 'Mass Effect: Legendary Edition', 'company' => 'BioWare', 'year' => '2021', 'price' => '59.99'],
            ['title' => 'The Elder Scrolls V: Skyrim', 'company' => 'Bethesda', 'year' => '2011', 'price' => '39.99'],
            ['title' => 'DOOM Eternal', 'company' => 'id Software', 'year' => '2020', 'price' => '59.99'],
        ];

        foreach ($videogames as $data) {
            $videogame = new Videogame();
            $videogame->setTitle($data['title']);
            $videogame->setCompany($data['company']);
            $videogame->setYear($data['year']);
            $videogame->setPrice($data['price']);
            $manager->persist($videogame);
        }

        $manager->flush();
    }
}
