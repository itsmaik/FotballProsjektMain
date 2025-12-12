import { useAthletes } from "../context/AthletesContext";
import type { IAthlete } from "../interfaces/IAthlete";

const AthleteItem = ({ player }: { player: IAthlete }) => {
  const { athletes, removeAthlete } = useAthletes();

  const handleDelete = async (id?: number) => {
    if (!id) return;
    if (!confirm("Delete athlete?")) return;
    await removeAthlete(id);
  };

  return (
    <article className="w-64 p-2 border-2 rounded border-gray-200 shadow-lg shadow-gray-300/50">
      <h2 className="font-bold">{player.name}</h2>
      <img
        className="h-60 w-full object-cover"
        src={`http://localhost:5212/images/athletes/${player.image}`}
        alt=""
      />
      <h4>Price: {player.price}M</h4>
      <h3>
        {player.purchaseStatus ? (
          "Utilgjengelig for kjøp"
        ) : (
          <button className="px-3 py-1 rounded bg-green-400 text-white text-sm">
            Kjøp Spiller
          </button>
        )}
      </h3>

      <div>
        <button
          className="px-3 py-1 rounded bg-blue-600 text-white text-sm"
          onClick={() => startEdit(athlete)}
        >
          Edit
        </button>

        <button
          className="px-3 py-1 rounded bg-red-600 text-white text-sm"
          onClick={() => handleDelete(player.id)}
        >
          Delete
        </button>
      </div>
    </article>
  );
};

export default AthleteItem;
