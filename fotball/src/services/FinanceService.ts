import axios from "axios";
import type { IFinance } from "../interfaces/IFinance";

const baseUrl = "http://localhost:5212/api/";
const financesEndpoint = "finances";

export const getFinance = async (): Promise<IFinance> => {
  const res = await axios.get<IFinance>(baseUrl + financesEndpoint);
  return res.data;
};

const updateFinance = async (finance: IFinance): Promise<void> => {
  if (!finance.id) throw new Error("Finance id is missing");
  await axios.put(baseUrl + financesEndpoint, finance);
};

export const takeLoan = async (amount: number): Promise<IFinance> => {
  const res = await axios.post<IFinance>(
    `${baseUrl + financesEndpoint}/loan`,
    null,
    {
      params: { amount },
    }
  );
  return res.data;
};
