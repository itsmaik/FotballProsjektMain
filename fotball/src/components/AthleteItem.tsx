import { useState } from "react";
import { useAthletes } from "../context/AthletesContext";
import { useFinance } from "../context/FinanceContext";
import type { IAthlete } from "../interfaces/IAthlete";
import AthleteForm, { type AthleteFormValues } from "./globals/AthleteForm";
import Feedback from "./globals/Feedback";

export default function AthleteItem({ player }: { player: IAthlete }) {
  const { removeAthlete, editAthlete, purchaseAthlete } = useAthletes();
  const { refreshFinance } = useFinance();

  const [isModalOpen, setIsModalOpen] = useState(false);

  type Msg = { text: string; variant: "success" | "error" };
  const [msg, setMsg] = useState<Msg | null>(null);

  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [isBuying, setIsBuying] = useState(false);

  const handleDelete = async () => {
    if (!player.id) return;

    setIsDeleting(true);
    const ok = await removeAthlete(player.id);
    setIsDeleting(false);
    setIsDeleteModalOpen(false);

    if (ok) {
      setMsg({ text: "Spiller slettet ✅", variant: "success" });
    } else {
      setMsg({ text: "Kunne ikke slette spilleren.", variant: "error" });
    }

    setTimeout(() => setMsg(null), 2500);
  };

  const handlePurchase = async () => {
    if (!player.id) return;

    setIsBuying(true);
    const ok = await purchaseAthlete(player.id);
    setIsBuying(false);

    if (ok) {
      await refreshFinance();
      setMsg({ text: "Kjøpt ✅", variant: "success" });
    } else {
      setMsg({ text: "Kunne ikke kjøpe spiller.", variant: "error" });
    }

    setTimeout(() => setMsg(null), 2500);
  };

  const handleEditSubmit = async (values: AthleteFormValues) => {
    const ok = await editAthlete({
      ...player,
      name: values.name.trim(),
      gender: values.gender.trim(),
      price: Number(values.price),
    });

    if (ok) {
      setMsg({ text: "Lagret ✅", variant: "success" });
      setIsModalOpen(false);
    } else {
      setMsg({ text: "Kunne ikke lagre endringer.", variant: "error" });
    }

    setTimeout(() => setMsg(null), 2500);
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
            <p className="text-sm text-red-600">Utilgjengelig for kjøp</p>
          ) : (
            <button
              onClick={handlePurchase}
              disabled={isBuying}
              className="w-full px-3 py-1 rounded bg-green-600 text-white text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isBuying ? "Kjøper..." : "Kjøp Spiller"}
            </button>
          )}
        </div>

        <Feedback
          message={msg?.text ?? null}
          variant={msg?.variant}
          onClose={() => setMsg(null)}
        />

        <div className="flex justify-center gap-4 pt-2">
          <button
            className="px-3 py-1 rounded bg-blue-600 text-white text-sm"
            onClick={() => setIsModalOpen(true)}
          >
            Rediger
          </button>

          <button
            className="px-3 py-1 rounded bg-red-600 text-white text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isDeleting}
            onClick={() => setIsDeleteModalOpen(true)}
          >
            {isDeleting ? "Sletter..." : "Slett"}
          </button>
        </div>
      </article>

      {/* Edit Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div className="w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
            <AthleteForm
              title="Edit athlete"
              submitLabel="Save"
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

      {/* Delete Modal */}
      {isDeleteModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setIsDeleteModalOpen(false)}
        >
          <div
            className="w-full max-w-md rounded-xl bg-white p-4 shadow"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold mb-2">Slette spiller?</h3>
            <p className="text-sm text-slate-600 mb-4">
              Dette kan ikke angres.
            </p>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                className="rounded-lg bg-slate-200 px-3 py-2 text-sm font-semibold"
                onClick={() => setIsDeleteModalOpen(false)}
                disabled={isDeleting}
              >
                Avbryt
              </button>
              <button
                type="button"
                className="rounded-lg bg-red-600 px-3 py-2 text-sm font-semibold text-white disabled:opacity-50"
                onClick={handleDelete}
                disabled={isDeleting}
              >
                Slett
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
