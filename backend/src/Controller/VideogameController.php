<?php

namespace App\Controller;

use App\Repository\VideogameRepository;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Attribute\Route;

final class VideogameController extends AbstractController
{
    #[Route("api/games", name: "all-games")]
    public function getVideogameList(Request $request, VideogameRepository $repo): JsonResponse
    {
        $games = $repo->findAllVideogames();

        $gamesData = array_map(function ($game) {
            return [
                'id' => $game->getId(),
                'title' => $game->getTitle(),
                'company' => $game->getCompany(),
                'year' => $game->getYear(),
                'price' => $game->getPrice(),
            ];
        }, $games);

        return $this->json([
            'data' => $gamesData,
        ]);
    }

    #[Route("api/games/search", name: "search-games")]
    public function searchVideogames(Request $request, VideogameRepository $repo): JsonResponse
    {
        $search = $request->query->get('q');
        $sort = $request->query->get('sort');

        $games = $repo->searchVideogames($search, $sort);

        $gamesData = array_map(function ($game) {
            return [
                'id' => $game->getId(),
                'title' => $game->getTitle(),
                'company' => $game->getCompany(),
                'year' => $game->getYear(),
                'price' => $game->getPrice(),
            ];
        }, $games);

        return $this->json([
            'data' => $gamesData,
        ]);
    }

    #[Route('/api/games/{id}', name: 'videogame_detail', methods: ['GET'])]
    public function getVideogameDetail(
        int $id,
        VideogameRepository $repo,
        \App\Repository\UserVideogameRepository $userVideogameRepository
    ): JsonResponse {
        $game = $repo->findVideogameById($id);

        if (!$game) {
            return $this->json(['error' => 'Videogioco non trovato'], 404);
        }

        $user = $this->getUser();
        $inUserList = false;

        if ($user) {
            $userGame = $userVideogameRepository->findOneByUserAndVideogame($user, $game);
            $inUserList = $userGame !== null;
        }

        $gameData = [
            'id' => $game->getId(),
            'title' => $game->getTitle(),
            'company' => $game->getCompany(),
            'year' => $game->getYear(),
            'price' => $game->getPrice(),
            'listed' => $inUserList,
        ];

        return $this->json([
            'data' => $gameData,
        ]);
    }
}