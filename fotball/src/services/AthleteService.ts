import axios from "axios";
import type { IAthlete } from "../interfaces/IAthlete";
import type { IVenue } from "../interfaces/IVenue";
import type { IFinance } from "../interfaces/IFinance";

const baseUrl = "http://localhost:5212/api/";

const athletesEndpoint = "athletes/";
const venuesEndpoint = "venues";
const financesEndpoint = "finances";
const purchaseEndpoint = "purchase";

interface IAthleteResponsList {
  success: boolean;
  data: IAthlete[] | null;
}

//Get all Athletes
export const getAthletes = async (): Promise<IAthleteResponsList> => {
  try {
    const res = await axios.get(baseUrl + athletesEndpoint);
    return {
      success: true,
      data: res.data,
    };
  } catch {
    return {
      success: false,
      data: null,
    };
  }
};

//Get all Athletes
export const getAthletesById = async (
  id: string
): Promise<IAthleteResponsList> => {
  try {
    const res = await axios.get(baseUrl + athletesEndpoint + id);
    return {
      success: true,
      data: res.data,
    };
  } catch {
    return {
      success: false,
      data: null,
    };
  }
};

interface IDefaultAthleteResponse {
  success: boolean;
}

//Create new Athlete
export const createAthlete = async (
  newPlayer: IAthlete
): Promise<IDefaultAthleteResponse> => {
  try {
    const res = await axios.post(baseUrl + athletesEndpoint, newPlayer);
    return {
      success: true,
      data: res.data,
    };
  } catch {
    return { success: false };
  }
};

//Update Athletes Information
export const updateAthlete = async (
  athlete: IAthlete
): Promise<IDefaultAthleteResponse> => {
  try {
    const res = await axios.put(`${URL}/${athlete.id}`, athlete);
    return {
      success: true,
    };
  } catch {
    return { success: false };
  }
};

//Delete an Athlete
export const deleteAthlete = async (id: number): Promise<void> => {
  const res = await axios.delete(baseUrl + athletesEndpoint + id);
};

export const purchaseAthlete = async (athleteId: number) => {
  const res = await axios.post(baseUrl + purchaseEndpoint + athleteId);
  return res.data;
};

interface IVenueResponsList {
  success: boolean;
  data: IVenue[] | null;
}
const getVenues = async (): Promise<IVenueResponsList> => {
  try {
    const res = await axios.get(baseUrl + venuesEndpoint);
    return {
      success: true,
      data: res.data,
    };
  } catch {
    return {
      success: false,
      data: null,
    };
  }
};

//FIRMA
interface IFinanceResponsList {
  success: boolean;
  data: IFinance[] | null;
}
const getFinance = async (): Promise<IFinanceResponsList> => {
  try {
    const res = await axios.get(baseUrl + financesEndpoint);
    return {
      success: true,
      data: res.data,
    };
  } catch {
    return {
      success: false,
      data: null,
    };
  }
};

export default {
  getAthletes,
  createAthlete,
  updateAthlete,
  deleteAthlete,
  getVenues,
  getFinance,
};
