import { AthletesProvider } from "./context/AthletesContext";
import { FinanceProvider } from "./context/FinanceContext";
import AppRouting from "./routing/AppRouting";

function App() {
  return (
    <>
      <AthletesProvider>
        <FinanceProvider>
          <AppRouting />
        </FinanceProvider>
      </AthletesProvider>
    </>
  );
}

export default App;
