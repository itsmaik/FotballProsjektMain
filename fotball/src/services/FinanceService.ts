import type { IFinance } from "../interfaces/IFinance";
import { http } from "./http";

export const financeService = {
  get: async (): Promise<IFinance> => {
    const res = await http.get<IFinance>("finances");
    return res.data;
  },

  update: async (finance: IFinance): Promise<void> => {
    if (!finance.id) throw new Error("Finance id is missing");
    await http.put(`finances/${finance.id}`, finance);
  },

  takeLoan: async (amount: number): Promise<IFinance> => {
    const res = await http.post<IFinance>("finances/loan", null, {
      params: { amount },
    });
    return res.data;
  },
};
