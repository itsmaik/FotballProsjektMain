import { AthletesProvider } from "./context/AthletesContext";
import AppRouting from "./routing/AppRouting";

function App() {
  return (
    <>
      <AthletesProvider>
        <AppRouting />
      </AthletesProvider>
    </>
  );
}

export default App;
