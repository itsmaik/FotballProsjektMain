import type { IAthlete } from "./IAthlete";

export interface IAthletesContext {
  athletes: IAthlete[];
  isLoading: boolean;
  error: string | null;

  refreshAthletes: () => Promise<void>;
  addAthlete: (athlete: IAthlete) => Promise<void>;
  editAthlete: (athlete: IAthlete) => Promise<void>;
  removeAthlete: (id: number) => Promise<void>;
  purchase?: (id: number) => Promise<void>;
}
