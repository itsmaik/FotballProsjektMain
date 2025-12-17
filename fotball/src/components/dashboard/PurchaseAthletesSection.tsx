import { useState } from "react";
import { useAthletes } from "../../context/AthletesContext";
import { useFinance } from "../../context/FinanceContext";
import type { IAthlete } from "../../interfaces/IAthlete";
import Feedback from "../globals/Feedback";

type Msg = { text: string; variant: "success" | "error" };

export default function PurchaseAthletesSection() {
  const { athletes, purchaseAthlete, isLoading, error, refreshAthletes } =
    useAthletes();
  const { finance, refreshFinance } = useFinance();

  const [purchaseError, setPurchaseError] = useState<string | null>(null);
  const [msg, setMsg] = useState<Msg | null>(null);

  const purchasableAthletes = athletes.filter((a) => !a.purchaseStatus);

  const handlePurchase = async (athlete: IAthlete) => {
    if (!finance) return;

    setPurchaseError(null);

    if (finance.moneyLeft < athlete.price) {
      setPurchaseError("Du har ikke nok penger til å kjøpe denne spilleren.");
      return;
    }

    const ok = await purchaseAthlete(athlete.id!);

    if (ok) {
      await refreshFinance();
      await refreshAthletes();
      setMsg({ text: "Kjøpt ✅", variant: "success" });
    } else {
      setMsg({ text: "Kunne ikke kjøpe spiller.", variant: "error" });
    }

    setTimeout(() => setMsg(null), 2500);
  };

  return (
    <section className="bg-white shadow rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-3">Purchase athletes</h2>

      <Feedback
        message={msg?.text ?? purchaseError}
        variant={msg?.variant ?? (purchaseError ? "error" : "success")}
        onClose={() => {
          setMsg(null);
          setPurchaseError(null);
        }}
        className="mb-3"
      />

      <Feedback message={error} variant="error" className="mb-3" />

      {isLoading ? (
        <p>Loading athletes...</p>
      ) : purchasableAthletes.length === 0 ? (
        <p>No available athletes to purchase.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {purchasableAthletes.map((athlete) => (
            <article
              key={athlete.id}
              className="border rounded-lg p-3 flex flex-col gap-2"
            >
              <h3 className="font-semibold">{athlete.name}</h3>
              <p className="text-sm text-slate-500">Gender: {athlete.gender}</p>
              <p className="text-sm">Price: {athlete.price}</p>

              <button
                className="mt-2 bg-indigo-600 text-white rounded px-3 py-1 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!finance || finance.moneyLeft < athlete.price}
                onClick={() => handlePurchase(athlete)}
              >
                Purchase
              </button>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
