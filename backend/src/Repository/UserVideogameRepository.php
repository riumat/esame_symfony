<?php

namespace App\Repository;

use App\Entity\UserVideogame;
use App\Entity\User;
use App\Entity\Videogame;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<UserVideogame>
 */
class UserVideogameRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, UserVideogame::class);
    }

    // Trova tutti i giochi di un utente.
    public function findByUser(User $user): array
    {
        return $this->createQueryBuilder('uv')
            ->andWhere('uv.user = :user')
            ->setParameter('user', $user)
            ->getQuery()
            ->getResult();
    }

    // Trova un UserVideogame per utente e videogioco.
    public function findOneByUserAndVideogame(User $user, Videogame $videogame): ?UserVideogame
    {
        return $this->findOneBy(['user' => $user, 'videogame' => $videogame]);
    }
}