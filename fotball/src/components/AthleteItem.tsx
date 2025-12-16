import { useState } from "react";
import { useAthletes } from "../context/AthletesContext";
import type { IAthlete } from "../interfaces/IAthlete";
import AthleteForm, { type AthleteFormValues } from "./globals/AthleteForm";

export default function AthleteItem({ player }: { player: IAthlete }) {
  const { removeAthlete, editAthlete, purchase } = useAthletes();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleDelete = async () => {
    if (!player.id) return;
    if (!confirm("Delete athlete?")) return;
    await removeAthlete(player.id);
  };

  // const handlePurchase = async () => {
  //   if (!player.id) return;
  //   await purchase(player.id);
  // };

  const handleEditSubmit = async (values: AthleteFormValues) => {
    try {
      await editAthlete({
        ...player,
        name: values.name.trim(),
        gender: values.gender.trim(),
        price: Number(values.price),
        // image unchanged
        // purchaseStatus unchanged
      });
      setStatusMessage("Saved!");
      setIsModalOpen(false);
    } catch (e) {
      console.error(e);
      setStatusMessage("Could not save changes.");
    } finally {
      setTimeout(() => setStatusMessage(null), 3000);
    }
  };

  return (
    <>
      <article className="bg-white shadow rounded-lg p-4 flex flex-col gap-2">
        <h2 className="font-bold">{player.name}</h2>

        <img
          className="w-full h-full object-cover rounded-md"
          src={`http://localhost:5212/images/athletes/${player.image}`}
          alt=""
        />

        <p>Price: {player.price}M</p>

        <div>
          {player.purchaseStatus ? (
            <p className="text-sm text-slate-600">Utilgjengelig for kjøp</p>
          ) : (
            <button
              // onClick={handlePurchase}
              className="w-full px-3 py-1 rounded bg-green-600 text-white text-sm"
            >
              Kjøp Spiller
            </button>
          )}
        </div>

        <div className="flex justify-center gap-4 pt-2">
          <button
            className="px-3 py-1 rounded bg-blue-600 text-white text-sm"
            onClick={() => setIsModalOpen(true)}
          >
            Edit
          </button>

          <button
            className="px-3 py-1 rounded bg-red-600 text-white text-sm"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>

        {statusMessage && (
          <p className="text-center text-sm text-slate-600">{statusMessage}</p>
        )}
      </article>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div className="w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
            <AthleteForm
              title="Edit athlete"
              submitLabel="Save"
              statusMessage={statusMessage}
              initialValues={{
                name: player.name,
                gender: player.gender,
                price: player.price,
              }}
              onSubmit={handleEditSubmit}
              onCancel={() => setIsModalOpen(false)}
            />
          </div>
        </div>
      )}
    </>
  );
}
