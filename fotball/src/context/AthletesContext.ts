import { createContext, useContext, useEffect, useState } from "react";

import { IAthlete } from "../interfaces/Athlete";
import {
  getAthletes,
  createAthlete,
  updateAthlete,
  deleteAthlete,
} from "../services/athleteService";
import { purchaseAthlete } from "../services/purchaseService";

interface AthletesContextType {
  athletes: IAthlete[];
  isLoading: boolean;
  error: string | null;

  refreshAthletes: () => Promise<void>;
  addAthlete: (athlete: IAthlete) => Promise<void>;
  editAthlete: (athlete: IAthlete) => Promise<void>;
  removeAthlete: (id: number) => Promise<void>;
  purchase: (id: number) => Promise<void>;
}

const AthletesContext = createContext<AthletesContextType | undefined>(
  undefined
);

export function AthletesProvider({ children }: { children: ReactNode }) {
  const [athletes, setAthletes] = useState<IAthlete[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load all athletes once when app loads
  async function refreshAthletes() {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getAthletes();
      setAthletes(data);
    } catch (err) {
      console.error(err);
      setError("Could not load athletes");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    refreshAthletes();
  }, []);

  // Create new athlete
  async function addAthlete(athlete: IAthlete) {
    try {
      await createAthlete(athlete);
      await refreshAthletes();
    } catch (err) {
      console.error(err);
      setError("Could not create athlete");
    }
  }

  // Update athlete
  async function editAthlete(athlete: IAthlete) {
    try {
      await updateAthlete(athlete);
      await refreshAthletes();
    } catch (err) {
      console.error(err);
      setError("Could not update athlete");
    }
  }

  // Delete athlete
  async function removeAthlete(id: number) {
    try {
      await deleteAthlete(id);
      setAthletes((prev) => prev.filter((a) => a.id !== id));
    } catch (err) {
      console.error(err);
      setError("Could not delete athlete");
    }
  }

  // Purchase an athlete
  async function purchase(id: number) {
    try {
      await purchaseAthlete(id);
      await refreshAthletes();
    } catch (err) {
      console.error(err);
      setError("Could not purchase athlete");
    }
  }

  const value: AthletesContextType = {
    athletes,
    isLoading,
    error,
    refreshAthletes,
    addAthlete,
    editAthlete,
    removeAthlete,
    purchase,
  };

  return (
    <AthletesContext.Provider value={value}>
      {children}
    </AthletesContext.Provider>
  );
}

export function useAthletes() {
  const ctx = useContext(AthletesContext);
  if (!ctx) {
    throw new Error("useAthletes must be used inside AthletesProvider");
  }
  return ctx;
}
