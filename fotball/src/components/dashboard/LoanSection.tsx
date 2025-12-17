import { useState } from "react";
import { useFinance } from "../../context/FinanceContext";
import Feedback from "../globals/Feedback";

type Msg = { text: string; variant: "success" | "error" };

export default function LoanSection() {
  const { takeLoanAmount } = useFinance();

  const [loanInput, setLoanInput] = useState<number | "">("");
  const [msg, setMsg] = useState<Msg | null>(null);

  const handleLoan = async () => {
    if (loanInput === "" || loanInput <= 0) return;

    await takeLoanAmount(Number(loanInput));
    setMsg({ text: "Penger lagt til ✅", variant: "success" });
    setLoanInput("");

    setTimeout(() => setMsg(null), 2500);
  };

  return (
    <section className="bg-white shadow rounded-lg p-4 max-w-md">
      <h2 className="text-xl font-semibold mb-3">Get more money (loan)</h2>

      <Feedback
        message={msg?.text ?? null}
        variant={msg?.variant}
        onClose={() => setMsg(null)}
        className="mb-3"
      />

      <div className="flex gap-2 items-center">
        <input
          type="number"
          className="border rounded px-3 py-2 flex-1"
          placeholder="Loan amount"
          min={0}
          value={loanInput}
          onChange={(e) =>
            setLoanInput(e.target.value === "" ? "" : Number(e.target.value))
          }
        />
        <button
          className="bg-emerald-600 text-white rounded px-4 py-2 disabled:opacity-50"
          onClick={handleLoan}
          disabled={loanInput === "" || loanInput <= 0}
        >
          Add
        </button>
      </div>
    </section>
  );
}
