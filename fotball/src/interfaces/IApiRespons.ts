import type { IAthlete } from "./IAthlete";
import type { IVenue } from "./IVenue";
import type { IFinance } from "./IFinance";

// T = placholder for et Interface
//  (som vi merger etterpå senere ved med typescript.)
export interface IApiResponse<T> {
  success: boolean;
  data: T | null;
}

export interface IAthletesResponseList extends IApiResponse<IAthlete[]> {}

export interface IAthleteResponse extends IApiResponse<IAthlete> {}

export interface IVenuesResponseList extends IApiResponse<IVenue[]> {}

export interface IFinanceResponseList extends IApiResponse<IFinance[]> {}
