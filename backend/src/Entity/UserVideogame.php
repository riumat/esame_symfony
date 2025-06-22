<?php

namespace App\Entity;

use App\Repository\UserVideogameRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: UserVideogameRepository::class)]
class UserVideogame
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(targetEntity: User::class)]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $user = null;

    #[ORM\ManyToOne(targetEntity: Videogame::class)]
    #[ORM\JoinColumn(nullable: false)]
    private ?Videogame $videogame = null;

    #[ORM\Column(type: 'integer', nullable: true)]
    private ?int $rating = null;

    

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }

    public function getVideogame(): ?Videogame
    {
        return $this->videogame;
    }

    public function setVideogame(?Videogame $videogame): self
    {
        $this->videogame = $videogame;

        return $this;
    }

    public function getRating(): ?int
    {
        return $this->rating;
    }

    public function setRating(?int $rating): self
    {
        $this->rating = $rating;

        return $this;
    }
   
}