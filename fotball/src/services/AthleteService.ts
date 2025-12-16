import { http } from "./http";
import type { IAthlete } from "../interfaces/IAthlete";

export const athleteService = {
  getAll: async (): Promise<IAthlete[]> => {
    const res = await http.get<IAthlete[]>("athletes");
    return res.data;
  },

  create: async (athlete: IAthlete): Promise<IAthlete> => {
    const res = await http.post<IAthlete>("athletes", athlete);
    return res.data;
  },

  update: async (athlete: IAthlete): Promise<void> => {
    if (!athlete.id) throw new Error("Missing athlete id");
    await http.put(`athletes/${athlete.id}`, athlete);
  },

  remove: async (id: number): Promise<void> => {
    await http.delete(`athletes/${id}`);
  },

  purchase: async (id: number): Promise<void> => {
    await http.post(`purchase/${id}`);
  },
};
