import React, { useState } from "react";
import { UserVideogame } from "../../types";
import { updateUserGameRating, removeUserGame } from "../../api/user";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

type Props = {
  games: UserVideogame[];
  loading: boolean;
  onDelete: (id: number) => void;
};

const UserGameCard: React.FC<{
  game: UserVideogame;
  onDelete: (id: number) => void;
}> = ({ game, onDelete }) => {
  const [rating, setRating] = useState<number | undefined>(game.rating);
  const [modalOpen, setModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [removing, setRemoving] = useState(false);
  const [ratingError, setRatingError] = useState<string>(""); // aggiunto stato errore
  const navigate = useNavigate();

  const handleRatingChange = () => {
    setInputValue(rating ? rating.toString() : "");
    setRatingError("");
    setModalOpen(true);
  };

  const handleModalSave = async () => {
    const parsedRating = parseInt(inputValue, 10);
    if (parsedRating >= 1 && parsedRating <= 5) {
      setRating(parsedRating);
      setRatingError("");
      try {
        await updateUserGameRating(game.id, parsedRating);
        setModalOpen(false);
        toast.success("Voto aggiornato con successo!");
      } catch (err: any) {
        if (err?.response?.status === 401) {
          navigate("/login");
        }
        toast.error("Errore nella modifica del voto.");
      }
    } else {
      setRatingError("Il voto deve essere un numero tra 1 e 5.");
    }
  };

  const handleRemove = async () => {
    setRemoving(true);
    try {
      await removeUserGame(game.id);
      onDelete(game.id);
      toast.success("Gioco rimosso dalla lista!");
    } catch (err: any) {
      if (err?.response?.status === 401) {
        navigate("/login");
      }
      toast.error("Errore nella rimozione del gioco.");
    } finally {
      setRemoving(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col hover:shadow-xl transition">
      <h3 className="text-lg font-bold mb-1">{game.title}</h3>
      {rating !== undefined && (
        <p className="text-sm text-foreground mb-1">
          Il tuo voto: {rating ? rating + "/5" : "N/D"}
        </p>
      )}
      <div className="flex gap-2 mt-2 justify-end">
        <button
          onClick={handleRatingChange}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition cursor-pointer"
        >
          Modifica voto
        </button>
        <button
          onClick={handleRemove}
          disabled={removing}
          className="px-4 py-2 bg-red-700 text-white rounded hover:bg-red-600 transition disabled:opacity-60 cursor-pointer"
        >
          {removing ? "Rimozione..." : "Rimuovi"}
        </button>
      </div>
      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xs">
            <h4 className="text-lg font-semibold mb-4">Modifica il tuo voto</h4>
            <input
              type="number"
              min={1}
              max={5}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 w-full mb-2 focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="Voto (1-5)"
            />
            {ratingError && (
              <div className="text-red-600 text-sm mb-2">{ratingError}</div>
            )}
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 transition"
              >
                Annulla
              </button>
              <button
                onClick={handleModalSave}
                className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition"
              >
                Salva
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const UserGameList: React.FC<Props> = ({ games, loading, onDelete }) => {
  if (loading) {
    return <div className="text-center text-accent">Caricamento...</div>;
  }

  if (!games.length) {
    return (
      <div className="text-center text-gray-500">
        Nessun videogioco nella tua lista.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
      {games.map((game) => (
        <UserGameCard key={game.id} game={game} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default UserGameList;
