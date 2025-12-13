import React, { createContext, useContext, useEffect, useState } from "react";
import type { IAthlete } from "../interfaces/IAthlete";
import type { IAthletesContext } from "../interfaces/IAthletesContext";
import {
  getAthletes,
  createAthlete,
  updateAthlete,
  deleteAthlete,
  purchaseAthlete,
} from "../services/AthleteService";

interface IAthletesProvider {
  children: React.ReactNode;
}

export const AthletesContext = createContext<IAthletesContext | undefined>(
  undefined
);

export const AthletesProvider = ({ children }: IAthletesProvider) => {
  const [athletes, setAthletes] = useState<IAthlete[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const refreshAthletes = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await getAthletes();
      setAthletes(response.data ?? []);
    } catch (err) {
      console.error(err);
      setError("Could not load athletes");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshAthletes();
  }, []);

  const addAthlete = async (athlete: IAthlete) => {
    try {
      await createAthlete(athlete);
      await refreshAthletes();
    } catch (err) {
      console.error(err);
      setError("Could not create athlete");
    }
  };

  const editAthlete = async (athlete: IAthlete) => {
    try {
      await updateAthlete(athlete);
      await refreshAthletes();
    } catch (err) {
      console.error(err);
      setError("Could not update athlete");
    }
  };

  const removeAthlete = async (id: number) => {
    try {
      await deleteAthlete(id);
      setAthletes((prev) => prev.filter((a) => a.id !== id));
    } catch (err) {
      console.error(err);
      setError("Could not delete athlete");
    }
  };

  const purchase = async (id: number) => {
    try {
      await purchaseAthlete(id);
      await refreshAthletes();
    } catch (err) {
      console.error(err);
      setError("Could not purchase athlete");
    }
  };

  const value: IAthletesContext = {
    athletes,
    isLoading,
    error,
    searchQuery,
    setSearchQuery,
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
};

export const useAthletes = () => {
  const ctx = useContext(AthletesContext);
  if (!ctx) {
    throw new Error("useAthletes must be used inside AthletesProvider");
  }
  return ctx;
};
