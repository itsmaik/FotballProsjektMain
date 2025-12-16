import { useState } from "react";
import { useAthletes } from "../context/AthletesContext";
import type { IAthlete } from "../interfaces/IAthlete";

const AthleteItem = ({ player }: { player: IAthlete }) => {
  const { removeAthlete, editAthlete, purchase } = useAthletes();
  const [editing, setEditing] = useState<IAthlete | null>(null);

  const handleDelete = async (id?: number) => {
    if (!id) return;
    if (!confirm("Delete athlete?")) return;
    await removeAthlete(id);
  };

  function startEdit(athlete: IAthlete) {
    setEditing({ ...athlete });
  }

  async function handleSaveEdit() {
    if (!editing) return;
    await editAthlete(editing);
    setEditing(null);
  }

  const handlePurchase = async (id?: number) => {
    if (!id) return;
    await purchase(id);
  };

  return (
    <article className="bg-white shadow rounded-lg p-4 flex flex-col gap-2">
      <h2 className="font-bold">{player.name}</h2>
      <img
        className="w-full h-full object-cover rounded-md"
        src={`http://localhost:5212/images/athletes/${player.image}`}
        alt=""
      />
      <p>Price: {player.price}M</p>
      <p>
        {player.purchaseStatus ? (
          "Utilgjengelig for kjøp"
        ) : (
          <button
            onClick={() => handlePurchase(player.id)}
            className="w-full px-3 py-1 rounded bg-green-600 text-white text-sm"
          >
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

      {editing && (
        <div className="mt-8 border-t pt-4">
          <h2 className="text-xl font-semibold mb-2">Edit athlete</h2>
          <div className="flex flex-col gap-2 max-w-md">
            <input
              className="border rounded px-3 py-2"
              value={editing.name}
              onChange={(e) => setEditing({ ...editing, name: e.target.value })}
            />
            <input
              className="border rounded px-3 py-2"
              value={editing.gender}
              onChange={(e) =>
                setEditing({ ...editing, gender: e.target.value })
              }
            />
            <input
              type="number"
              className="border rounded px-3 py-2"
              value={editing.price}
              onChange={(e) =>
                setEditing({ ...editing, price: Number(e.target.value) })
              }
            />
            {/* image & purchaseStatus edit fields if you want */}

            <div className="flex gap-2 mt-2">
              <button
                className="px-3 py-1 rounded bg-green-600 text-white text-sm"
                onClick={handleSaveEdit}
              >
                Save
              </button>
              <button
                className="px-3 py-1 rounded bg-slate-300 text-sm"
                onClick={() => setEditing(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </article>
  );
};

export default AthleteItem;
