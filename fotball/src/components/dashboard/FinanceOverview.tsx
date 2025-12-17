import { useFinance } from "../../context/FinanceContext";
import Feedback from "../globals/Feedback";

export default function FinanceOverview() {
  const { finance, isLoading, error } = useFinance();

  return (
    <section className="bg-white shadow rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-3">Financial situation</h2>

      {isLoading && <p>Loading finance...</p>}

      <Feedback message={error} variant="error" className="mb-3" />

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
  );
}
