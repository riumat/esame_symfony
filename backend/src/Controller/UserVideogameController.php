<?php

namespace App\Controller;

use App\Entity\UserVideogame;
use App\Repository\VideogameRepository;
use App\Repository\UserVideogameRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Attribute\Route;

final class UserVideogameController extends AbstractController
{
    #[Route('/api/user/games', name: 'get_user_games', methods: ['GET'])]
    public function getUserGames(UserVideogameRepository $userVideogameRepository): JsonResponse
    {
        $user = $this->getUser();
        if (!$user) {
            return $this->json(['error' => 'Utente non autenticato'], 401);
        }

        $userGames = $userVideogameRepository->findBy(['user' => $user]);

        $games = array_map(function (UserVideogame $userGame) {
            return [
                'id' => $userGame->getVideogame()->getId(),
                'title' => $userGame->getVideogame()->getTitle(),
                'rating' => $userGame->getRating(),
            ];
        }, $userGames);

        return $this->json($games);
    }

    #[Route('/api/user/games', name: 'add_user_game', methods: ['POST'])]
    public function addUserGame(
        Request $request,
        EntityManagerInterface $em,
        VideogameRepository $videogameRepository,
        UserVideogameRepository $userVideogameRepository
    ): JsonResponse {
        $user = $this->getUser();
        if (!$user) {
            return $this->json(['error' => 'Utente non autenticato'], 401);
        }

        $data = json_decode($request->getContent(), true);
        if (!isset($data['videogame_id'])) {
            return $this->json(['error' => 'videogame_id richiesto'], 400);
        }

        $videogame = $videogameRepository->findVideogameById($data['videogame_id']);
        if (!$videogame) {
            return $this->json(['error' => 'Videogioco non trovato'], 404);
        }

        $existing = $userVideogameRepository->findOneByUserAndVideogame($user, $videogame);
        if ($existing) {
            return $this->json(['error' => 'Gioco già presente nella lista'], 409);
        }

        $userGame = new UserVideogame();
        $userGame->setUser($user);
        $userGame->setVideogame($videogame);

        $em->persist($userGame);
        $em->flush();

        return $this->json(['message' => 'Gioco aggiunto alla lista']);
    }

    #[Route('/api/user/games/{id}', name: 'remove_user_game', methods: ['DELETE'])]
    public function removeUserGame(
        int $id,
        EntityManagerInterface $em,
        VideogameRepository $videogameRepository,
        UserVideogameRepository $userVideogameRepository
    ): JsonResponse {
        $user = $this->getUser();
        if (!$user) {
            return $this->json(['error' => 'Utente non autenticato'], 401);
        }

        $videogame = $videogameRepository->findVideogameById($id);
        if (!$videogame) {
            return $this->json(['error' => 'Videogioco non trovato'], 404);
        }

        $userGame = $userVideogameRepository->findOneByUserAndVideogame($user, $videogame);
        if (!$userGame) {
            return $this->json(['error' => 'Gioco non presente nella lista utente'], 404);
        }

        $em->remove($userGame);
        $em->flush();

        return $this->json(['message' => 'Gioco rimosso dalla lista utente']);
    }

    #[Route('/api/user/games/{id}', name: 'update_user_game_rating', methods: ['PUT'])]
    public function updateUserGameRating(
        int $id,
        Request $request,
        EntityManagerInterface $em,
        VideogameRepository $videogameRepository,
        UserVideogameRepository $userVideogameRepository
    ): JsonResponse {
        $user = $this->getUser();
        if (!$user) {
            return $this->json(['error' => 'Utente non autenticato'], 401);
        }

        $data = json_decode($request->getContent(), true);
        if (!isset($data['rating'])) {
            return $this->json(['error' => 'Rating richiesto'], 400);
        }

        if (!is_numeric($data['rating']) || $data['rating'] < 1 || $data['rating'] > 5) {
            return $this->json(['error' => 'Il rating deve essere un numero tra 1 e 5'], 400);
        }

        $videogame = $videogameRepository->findVideogameById($id);
        if (!$videogame) {
            return $this->json(['error' => 'Videogioco non trovato'], 404);
        }

        $userGame = $userVideogameRepository->findOneByUserAndVideogame($user, $videogame);
        if (!$userGame) {
            return $this->json(['error' => 'Gioco non presente nella lista utente'], 404);
        }

        $userGame->setRating($data['rating']);
        $em->flush();

        return $this->json(['message' => 'Rating aggiornato con successo']);
    }
}