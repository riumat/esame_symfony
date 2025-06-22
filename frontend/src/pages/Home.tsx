import React, { useEffect, useState } from "react";
import { Videogame } from "../types";
import { fetchVideogames, searchVideogames } from "../api/videogames";
import GameCard from "../components/Games/GameCard";
import { useNavigate } from "react-router";

const Home: React.FC = () => {
  const [videogames, setVideogames] = useState<Videogame[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [sort, setSort] = useState("");
  const navigate = useNavigate();

  // Debounce per la searchbar
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);
    return () => clearTimeout(handler);
  }, [search]);

  useEffect(() => {
    const loadGames = async () => {
      setLoading(true);
      try {
        let data;
        if (debouncedSearch) {
          data = await searchVideogames(debouncedSearch, sort);
        } else if (sort) {
          data = await searchVideogames("", sort);
        } else {
          data = await fetchVideogames();
        }
        setVideogames(data);
      } catch (err: any) {
        if (err?.response?.status === 401) {
          navigate("/login");
        } else {
          setVideogames([]);
        }
      } finally {
        setLoading(false);
      }
    };
    loadGames();
  }, [debouncedSearch, sort, navigate]);

  const handleReset = () => {
    setSearch("");
    setSort("");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Videogiochi
      </h1>
      <div className="flex flex-col md:flex-row gap-4 mb-8 justify-between items-center">
        {/* Componente ricerca */}
        <input
          type="text"
          placeholder="Cerca per titolo o azienda..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-accent"
        />
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 w-full md:w-1/4 focus:outline-none focus:ring-2 focus:ring-accent"
        >
          <option value="">Ordina per...</option>
          <option value="title">Titolo (A-Z)</option>
          <option value="year">Anno (crescente)</option>
          <option value="price">Prezzo (crescente)</option>
        </select>
        <button
          onClick={handleReset}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition w-full md:w-auto"
        >
          Reset filtri
        </button>
      </div>
      {loading ? (
        <div className="text-center text-accent">Caricamento...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {videogames.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;