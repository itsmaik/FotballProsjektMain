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
    <article className="bg-white shadow rounded-lg p-4 flex flex-col gap-2">
      <h2 className="font-bold">{player.name}</h2>
      <img
        className="w-full min-h-72 max-h-72 object-cover rounded-md"
        src={`http://localhost:5212/images/athletes/${player.image}`}
        alt=""
      />
      <p>Price: {player.price}M</p>
      <p>
        {player.purchaseStatus ? (
          "Utilgjengelig for kjøp"
        ) : (
          <button className="w-full px-3 py-1 rounded bg-green-600 text-white text-sm">
            Kjøp Spiller
          </button>
        )}
      </p>

      <div className="flex justify-center gap-4">
        <button
          className="px-3 py-1 rounded bg-blue-600 text-white text-sm"
          onClick={() => startEdit(player)}
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
