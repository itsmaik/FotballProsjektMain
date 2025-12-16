import type { IAthlete } from "./IAthlete";

export interface IAthletesContext {
  athletes: IAthlete[];
  isLoading: boolean;
  error: string | null;

  searchQuery: string;
  setSearchQuery: (q: string) => void;

  refreshAthletes: () => Promise<void>;
  addAthlete: (athlete: IAthlete) => Promise<boolean>;
  editAthlete: (athlete: IAthlete) => Promise<boolean>;
  removeAthlete: (id: number) => Promise<boolean>;
  purchaseAthlete: (id: number) => Promise<boolean>;
}
