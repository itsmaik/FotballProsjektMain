import axios from "axios";
import type { IAthlete } from "../interfaces/IAthlete";
import type { IVenue } from "../interfaces/IVenue";
import type { IFinance } from "../interfaces/IFinance";

const baseUrl = "http://localhost:5212/api";

const athletesEndpoint = "/athletes";
const venuesEndpoint = "venues";
const financesEndpoint = "/finances";

//SPILLERE
interface IAthleteResponsList {
  success: boolean;
  data: IAthlete[] | null;
}

const getAllAthletes = async (): Promise<IAthleteResponsList> => {
  try {
    const playerResponse = await axios.get(baseUrl + athletesEndpoint);
    return {
      success: true,
      data: playerResponse.data,
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

const addNewAthlete = async (
  newPlayer: IAthlete
): Promise<IDefaultAthleteResponse> => {
  try {
    const athletesResponse = await axios.post(
      baseUrl + athletesEndpoint,
      newPlayer
    );
    return {
      success: true,
    };
  } catch {
    return { success: false };
  }
};

interface IVenueResponsList {
  success: boolean;
  data: IVenue[] | null;
}
const getAllVenues = async (): Promise<IVenueResponsList> => {
  try {
    const venueResponse = await axios.get(baseUrl + venuesEndpoint);
    return {
      success: true,
      data: venueResponse.data,
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
const getAllFinances = async (): Promise<IFinanceResponsList> => {
  try {
    const financeResponse = await axios.get(baseUrl + financesEndpoint);
    return {
      success: true,
      data: financeResponse.data,
    };
  } catch {
    return {
      success: false,
      data: null,
    };
  }
};

export default {
  getAllAthletes,
  getAllVenues,
  getAllFinances,
  addNewAthlete,
};
