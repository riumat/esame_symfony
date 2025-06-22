import React, { useEffect, useState } from "react";
import { Videogame } from "../types";
import { fetchVideogameById } from "../api/videogames";
import { useNavigate, useParams } from "react-router";
import { addUserGame, removeUserGame } from "../api/user";
import toast from "react-hot-toast";

const GameDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [videogame, setVideogame] = useState<Videogame | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadGameDetails = async () => {
      try {
        const data = await fetchVideogameById(Number(id));
        setVideogame(data);
      } catch (err: any) {
        if (err?.response?.status === 401) {
          navigate("/login");
        } else {
          setError("Errore nel caricamento dei dettagli del videogame.");
        }
      } finally {
        setLoading(false);
      }
    };
    loadGameDetails();
  }, [id]);

  const handleAddToUserList = async () => {
    if (!videogame) return;
    setActionLoading(true);
    try {
      await addUserGame(videogame.id);
      setVideogame({ ...videogame, listed: true });
      toast.success("Videogame aggiunto alla tua lista!");
    } catch (err: any) {
      if (err?.response?.status === 401) {
        navigate("/login");
      }
      toast.error("Errore nell'aggiunta del videogame alla lista.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleRemoveFromUserList = async () => {
    if (!videogame) return;
    setActionLoading(true);
    try {
      await removeUserGame(videogame.id);
      setVideogame({ ...videogame, listed: false });
      toast.success("Videogame rimosso alla tua lista!");
    } catch (err: any) {
      if (err?.response?.status === 401) {
        navigate("/login");
      }
      toast.error("Errore nella rimozione del videogame dalla lista.");
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {loading ? (
        <div className="text-center text-accent">Caricamento...</div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : (
        videogame && (
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-4 text-center">
              {videogame.title}
            </h1>
            <div className="bg-white shadow-md rounded-lg p-6">
              <p className="text-lg mb-2">
                <strong>Compagnia:</strong> {videogame.company}
              </p>
              <p className="text-lg mb-2">
                <strong>Anno:</strong> {videogame.year}
              </p>
              <p className="text-lg mb-2">
                <strong>Prezzo:</strong> {videogame.price}€
              </p>
              {videogame.listed ? (
                <button
                  onClick={handleRemoveFromUserList}
                  disabled={actionLoading}
                  className="mt-4 bg-red-700 text-white font-bold py-2 px-4 rounded hover:bg-red-600 disabled:opacity-60"
                >
                  {actionLoading ? "Rimozione..." : "Rimuovi dalla mia lista"}
                </button>
              ) : (
                <button
                  onClick={handleAddToUserList}
                  disabled={actionLoading}
                  className="mt-4 bg-gradient-to-l from-chart-5/70 to-chart-1/70 text-white font-bold py-2 px-4 rounded hover:bg-accent/70 disabled:opacity-60 cursor-pointer"
                >
                  {actionLoading ? "Aggiunta..." : "Aggiungi alla mia lista"}
                </button>
              )}
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default GameDetails;
