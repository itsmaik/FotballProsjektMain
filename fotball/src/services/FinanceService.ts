import axios from "axios";
import type { IFinance } from "../interfaces/IFinance";
import { path } from "./PathService";

// const baseUrl = "http://localhost:5212/api/";
// const financesEndpoint = "finances";

export const getFinance = async (): Promise<IFinance> => {
  const res = await axios.get<IFinance>(path.baseUrl + path.financesEndpoint);
  return res.data;
};

export const updateFinance = async (finance: IFinance): Promise<void> => {
  if (!finance.id) throw new Error("Finance id is missing");
  await axios.put(path.baseUrl + path.financesEndpoint, finance);
};

export const takeLoan = async (amount: number): Promise<IFinance> => {
  const res = await axios.post<IFinance>(
    `${path.baseUrl + path.financesEndpoint}/loan`,
    null,
    {
      params: { amount },
    }
  );
  return res.data;
};
