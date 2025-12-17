import { useState } from "react";
import { useAthletes } from "../context/AthletesContext";
import { useFinance } from "../context/FinanceContext";
import type { IAthlete } from "../interfaces/IAthlete";
import AthleteForm, { type AthleteFormValues } from "./globals/AthleteForm";
import Feedback from "./globals/Feedback";
import Modal from "./globals/Modal";
import { useFeedback } from "./hooks/useFeedback";

export default function AthleteItem({ player }: { player: IAthlete }) {
  const { removeAthlete, editAthlete, purchaseAthlete } = useAthletes();
  const { refreshFinance } = useFinance();

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [isDeleting, setIsDeleting] = useState(false);
  const [isBuying, setIsBuying] = useState(false);
  const [isSavingEdit, setIsSavingEdit] = useState(false);

  const { msg, clear, success, error } = useFeedback(2500);

  const handleDelete = async () => {
    if (!player.id) return;

    setIsDeleting(true);
    const ok = await removeAthlete(player.id);
    setIsDeleting(false);
    setIsDeleteOpen(false);

    ok ? success("Spiller slettet ✅") : error("Kunne ikke slette spilleren.");
  };

  const handlePurchase = async () => {
    if (!player.id) return;

    setIsBuying(true);
    const ok = await purchaseAthlete(player.id);
    setIsBuying(false);

    if (ok) {
      await refreshFinance();
      success("Kjøpt ✅");
    } else {
      error("Kunne ikke kjøpe spiller.");
    }
  };

  const handleEditSubmit = async (values: AthleteFormValues) => {
    setIsSavingEdit(true);

    const ok = await editAthlete({
      ...player,
      name: values.name.trim(),
      gender: values.gender.trim(),
      price: Number(values.price),
    });

    setIsSavingEdit(false);

    if (ok) {
      success("Endringer lagret ✅");
      setIsEditOpen(false);
    } else {
      error("Kunne ikke lagre endringer.");
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
          onClose={clear}
        />

        <div className="flex justify-center gap-4 pt-2">
          <button
            className="px-3 py-1 rounded bg-blue-600 text-white text-sm"
            onClick={() => setIsEditOpen(true)}
          >
            Rediger
          </button>

          <button
            className="px-3 py-1 rounded bg-red-600 text-white text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isDeleting}
            onClick={() => setIsDeleteOpen(true)}
          >
            {isDeleting ? "Sletter..." : "Slett"}
          </button>
        </div>
      </article>

      {/* Edit Modal */}
      <Modal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        maxWidthClassName="max-w-lg"
      >
        <AthleteForm
          title="Edit athlete"
          submitLabel="Save"
          initialValues={{
            name: player.name,
            gender: player.gender,
            price: player.price,
          }}
          onSubmit={handleEditSubmit}
          onCancel={() => setIsEditOpen(false)}
          statusMessage={isSavingEdit ? "Lagrer endringer..." : null}
          isSubmitting={isSavingEdit}
          feedbackVariant="success"
        />
      </Modal>

      {/* Delete Modal */}
      <Modal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        maxWidthClassName="max-w-md"
      >
        <div className="rounded-xl bg-white p-4 shadow">
          <h3 className="text-lg font-semibold mb-2">Slette spiller?</h3>
          <p className="text-sm text-slate-600 mb-4">Dette kan ikke angres.</p>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="rounded-lg bg-slate-200 px-3 py-2 text-sm font-semibold"
              onClick={() => setIsDeleteOpen(false)}
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
      </Modal>
    </>
  );
}
