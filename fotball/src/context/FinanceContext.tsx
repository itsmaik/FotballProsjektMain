import React, { createContext, useContext, useEffect, useState } from "react";
import type { IFinance } from "../interfaces/IFinance";
import type { IFinanceContext } from "../interfaces/IFinanceContext";
import { financeService } from "../services/FinanceService";
import { getErrorMessage } from "../services/error";
interface IFinanceProvider {
  children: React.ReactNode;
}

export const FinanceContext = createContext<IFinanceContext | undefined>(
  undefined
);

export const FinanceProvider = ({ children }: IFinanceProvider) => {
  const [finance, setFinance] = useState<IFinance | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  async function loadFinance() {
    try {
      setIsLoading(true);
      setError(null);
      const data = await financeService.get();
      setFinance(data);
    } catch (err) {
      console.error(err);
      setError(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadFinance();
  }, []);

  async function takeLoanAmount(amount: number) {
    if (amount <= 0) return;
    try {
      const updated = await financeService.takeLoan(amount);
      setFinance(updated);
    } catch (err) {
      console.error(err);
      setError(getErrorMessage(err));
    }
  }

  async function updateFinanceState(financeToUpdate: IFinance) {
    try {
      await financeService.update(financeToUpdate);
      setFinance(financeToUpdate);
    } catch (err) {
      console.error(err);
      setError(getErrorMessage(err));
    }
  }

  const value: IFinanceContext = {
    finance,
    isLoading,
    error,
    refreshFinance: loadFinance,
    takeLoanAmount,
    updateFinanceState,
  };

  return (
    <FinanceContext.Provider value={value}>{children}</FinanceContext.Provider>
  );
};

export function useFinance() {
  const ctx = useContext(FinanceContext);
  if (!ctx) {
    throw new Error("useFinance must be used within a FinanceProvider");
  }
  return ctx;
}
