import FinanceOverview from "./FinanceOverview";
import LoanSection from "./LoanSection";
import PurchaseAthletesSection from "./PurchaseAthletesSection";

export default function Dashboard() {
  return (
    <section className="space-y-8">
      <h1 className="text-2xl font-semibold">Dashboard</h1>

      <FinanceOverview />
      <LoanSection />
      <PurchaseAthletesSection />
    </section>
  );
}
