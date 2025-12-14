import type { IFinance } from "./IFinance";

export interface IFinanceContext {
  finance: IFinance | null;
  isLoading: boolean;
  error: string | null;
  refreshFinance: () => Promise<void>;
  takeLoanAmount: (amount: number) => Promise<void>;
  updateFinanceState: (finance: IFinance) => Promise<void>;
}
