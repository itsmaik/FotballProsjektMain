import { useState } from "react";
import { useFinance } from "../../context/FinanceContext";
import { useAthletes } from "../../context/AthletesContext";
import type { IAthlete } from "../../interfaces/IAthlete";

export default function Dashboard() {
  const {
    finance,
    isLoading: financeLoading,
    error: financeError,
    takeLoanAmount,
    refreshFinance,
  } = useFinance();

  const {
    athletes,
    purchase,
    isLoading: athletesLoading,
    error: athletesError,
    refreshAthletes,
  } = useAthletes();

  const [loanInput, setLoanInput] = useState<number>(0);
  const [purchaseError, setPurchaseError] = useState<string | null>(null);

  const handleLoan = async () => {
    if (loanInput <= 0) return;
    await takeLoanAmount(loanInput);
    setLoanInput(0);
  };

  const handlePurchase = async (athlete: IAthlete) => {
    if (!finance) return;

    setPurchaseError(null);

    if (finance.moneyLeft < athlete.price) {
      setPurchaseError("Not enough money to purchase this athlete.");
      return;
    }

    try {
      await purchase(athlete.id!);

      // Keep finance in sync after purchase
      await refreshFinance();
    } catch (err) {
      console.error(err);
      setPurchaseError("Could not complete purchase.");
    }
  };

  return (
    <section className="space-y-8">
      <h1 className="text-2xl font-semibold">Dashboard</h1>

      {/* Section 1: Finance overview */}
      <section className="bg-white shadow rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-3">Financial situation</h2>

        {financeLoading && <p>Loading finance...</p>}
        {financeError && <p className="text-red-600">{financeError}</p>}

        {finance && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-slate-500">Money left</p>
              <p className="text-2xl font-semibold">{finance.moneyLeft}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Number of purchases</p>
              <p className="text-2xl font-semibold">
                {finance.numberOfPurchases}
              </p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Money spent</p>
              <p className="text-2xl font-semibold">{finance.moneySpent}</p>
            </div>
          </div>
        )}
      </section>

      {/* Section 2: Take loan */}
      <section className="bg-white shadow rounded-lg p-4 max-w-md">
        <h2 className="text-xl font-semibold mb-3">Get more money (loan)</h2>
        <div className="flex gap-2 items-center">
          <input
            type="number"
            className="border rounded px-3 py-2 flex-1"
            placeholder="Loan amount"
            min={0}
            value={loanInput}
            onChange={(e) => setLoanInput(Number(e.target.value))}
          />
          <button
            className="bg-emerald-600 text-white rounded px-4 py-2"
            onClick={handleLoan}
          >
            Add
          </button>
        </div>
      </section>

      {/* Section 3: Purchase athletes */}
      <section className="bg-white shadow rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-3">Purchase athletes</h2>

        {purchaseError && <p className="mb-3 text-red-600">{purchaseError}</p>}
        {athletesError && <p className="mb-3 text-red-600">{athletesError}</p>}

        {athletesLoading ? (
          <p>Loading athletes...</p>
        ) : athletes.length === 0 ? (
          <p>No available athletes to purchase.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {athletes.map((athlete) => (
              <article
                key={athlete.id}
                className="border rounded-lg p-3 flex flex-col gap-2"
              >
                <h3 className="font-semibold">{athlete.name}</h3>
                <p className="text-sm text-slate-500">
                  Gender: {athlete.gender}
                </p>
                <p className="text-sm">Price: {athlete.price}</p>
                <button
                  className="mt-2 bg-indigo-600 text-white rounded px-3 py-1 text-sm"
                  onClick={() => handlePurchase(athlete)}
                >
                  Purchase
                </button>
              </article>
            ))}
          </div>
        )}
      </section>
    </section>
  );
}
