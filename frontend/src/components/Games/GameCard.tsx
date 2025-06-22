import { Link } from "react-router";
import { Videogame } from "../../types";

const GameCard: React.FC<{ game: Videogame }> = ({ game }) => (
  <div className="bg-white rounded-lg shadow-md p-4 flex flex-col hover:shadow-xl transition">
    <h3 className="text-lg font-bold mb-1">{game.title}</h3>
    <p className="text-sm text-gray-600 mb-1">Azienda: {game.company}</p>
    <p className="text-sm text-gray-600 mb-1">Anno: {game.year}</p>
    <p className="text-base font-semibold text-accent mb-2">
      {game.price === 0 ? "Gratis" : game.price + "€"}
    </p>
    <Link
      to={`/games/${game.id}`}
      className="mt-auto inline-block bg-gradient-to-l from-chart-5/70 to-chart-1/70 text-white font-semibold px-4 py-2 rounded hover:bg-accent/90 text-center"
    >
      Dettagli
    </Link>
  </div>
);

export default GameCard;
