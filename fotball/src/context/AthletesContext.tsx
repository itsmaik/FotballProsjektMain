import React, { createContext, useContext, useEffect, useState } from "react";
import type { IAthlete } from "../interfaces/IAthlete";
import type { IAthletesContext } from "../interfaces/IAthletesContext";
import { athleteService } from "../services/AthleteService";
import { getErrorMessage } from "../services/error";

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
    setError(null);
    try {
      setIsLoading(true);
      const data = await athleteService.getAll();
      setAthletes(data);
    } catch (err) {
      console.error(err);
      setError(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshAthletes();
  }, []);

  const addAthlete = async (athlete: IAthlete) => {
    setError(null);
    try {
      await athleteService.create(athlete);
      await refreshAthletes();
      return true;
    } catch (err) {
      console.error(err);
      setError(getErrorMessage(err));
      return false;
    }
  };

  const editAthlete = async (athlete: IAthlete) => {
    setError(null);
    try {
      await athleteService.update(athlete);
      await refreshAthletes();
      return true;
    } catch (err) {
      console.error(err);
      setError(getErrorMessage(err));
      return false;
    }
  };

  const removeAthlete = async (id: number) => {
    setError(null);
    try {
      await athleteService.remove(id);
      setAthletes((prev) => prev.filter((a) => a.id !== id));
      return true;
    } catch (err) {
      console.error(err);
      setError(getErrorMessage(err));
      return false;
    }
  };

  const purchaseAthlete = async (id: number) => {
    setError(null);
    try {
      await athleteService.purchase(id);
      await refreshAthletes();
      return true;
    } catch (err) {
      console.error(err);
      setError(getErrorMessage(err));
      return false;
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
    purchaseAthlete,
  };

  return (
    <AthletesContext.Provider value={value}>
      {children}
    </AthletesContext.Provider>
  );
};

export const useAthletes = () => {
  const ctx = useContext(AthletesContext);
  if (!ctx) throw new Error("useAthletes must be used inside AthletesProvider");
  return ctx;
};
