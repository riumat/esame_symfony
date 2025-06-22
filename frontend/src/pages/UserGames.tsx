import React, { useEffect, useState } from "react";
import UserGameList from "../components/Games/UserGameList";
import { fetchUserGames } from "../api/user";
import { UserVideogame, Videogame } from "../types";
import { useNavigate } from "react-router";

const UserGames: React.FC = () => {
  const [userGames, setUserGames] = useState<UserVideogame[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleRemoveGame = (id: number) => {
    setUserGames((prev) => prev.filter((g) => g.id !== id));
  };

  useEffect(() => {
    const getUserGames = async () => {
      try {
        const games = await fetchUserGames();
        setUserGames(games);
      } catch (err: any) {
        if (err?.response?.status === 401) {
          navigate("/login");
        }
        setUserGames([]);
      } finally {
        setLoading(false);
      }
    };

    getUserGames();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        I miei Videogiochi
      </h1>
      <UserGameList
        games={userGames}
        loading={loading}
        onDelete={handleRemoveGame}
      />
    </div>
  );
};

export default UserGames;
