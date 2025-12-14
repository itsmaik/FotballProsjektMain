import axios from "axios";
import type { IAthlete } from "../interfaces/IAthlete";
import { financesEndpoint } from "./FinanceService";
import type {
  IAthletesResponseList,
  IAthleteResponse,
  IVenuesResponseList,
  IFinanceResponseList,
} from "../interfaces/IApiRespons";

const baseUrl = "http://localhost:5212/api/";

const athletesEndpoint = "athletes/";
const venuesEndpoint = "venues";
const purchaseEndpoint = "purchase";

//Get all Athletes
export const getAthletes = async (): Promise<IAthletesResponseList | null> => {
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

//Get one Athlete
export const getAthletesById = async (
  id: string
): Promise<IAthleteResponse | null> => {
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

//Create new Athlete
export const createAthlete = async (
  newPlayer: IAthlete
): Promise<IAthleteResponse | null> => {
  try {
    const res = await axios.post(baseUrl + athletesEndpoint, newPlayer);
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

//Update Athletes Information
export const updateAthlete = async (
  athlete: IAthlete
): Promise<IAthleteResponse | null> => {
  try {
    const res = await axios.put(`${URL}/${athlete.id}`, athlete);
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

//Delete an Athlete
export const deleteAthlete = async (id: number): Promise<void> => {
  const res = await axios.delete(baseUrl + athletesEndpoint + id);
};

export const purchaseAthlete = async (athleteId: number) => {
  const res = await axios.post(baseUrl + purchaseEndpoint + athleteId);
  return res.data;
};

//Venues
const getVenues = async (): Promise<IVenuesResponseList | null> => {
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
const getFinance = async (): Promise<IFinanceResponseList | null> => {
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
