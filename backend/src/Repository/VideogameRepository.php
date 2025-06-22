<?php

namespace App\Repository;

use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use App\Entity\Videogame;

/**
 * @extends ServiceEntityRepository<Videogame>
 */
class VideogameRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Videogame::class);
    }
   
    public function findAllVideogames(): array
    {
        return $this->findAll();
    }

    public function findVideogameById(int $id): ?Videogame
    {
        return $this->find($id);
    }

    public function searchVideogames(?string $search = "", ?string $sort = null): array
    {
        $qb = $this->createQueryBuilder('v')
            ->where('LOWER(v.title) LIKE :search OR LOWER(v.company) LIKE :search')
            ->setParameter('search', '%' . strtolower($search) . '%');

        if ($sort) {
            $allowed = ['title', 'year', 'price'];
            if (in_array($sort, $allowed)) {
                $qb->orderBy('v.' . $sort, 'ASC');
            }
        }

        return $qb->getQuery()->getResult();
    }

    public function findAllVideogamesSorted(string $sort): array
    {
        $allowed = ['title', 'year', 'price'];
        if (!in_array($sort, $allowed)) {
            $sort = 'title';
        }

        return $this->createQueryBuilder('v')
            ->orderBy('v.' . $sort, 'ASC')
            ->getQuery()
            ->getResult();
    }
}