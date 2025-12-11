import { useState, useEffect } from "react";
import AthleteService from "../services/AthleteService";
import type { IAthlete } from "../interfaces/IAthlete";
import AthleteItem from "./AthleteItem";

const AthleteList = () => {
  const [athletes, setAthletes] = useState<IAthlete[]>([]);

  useEffect(() => {
    getAndSetAllAthletes();
  }, []);

  const getAndSetAllAthletes = async () => {
    const athleteResponse = await AthleteService.getAthletes();
    if (
      athleteResponse.success == true &&
      athleteResponse.data != null &&
      Array.isArray(athleteResponse.data)
    ) {
      setAthletes(athleteResponse.data);
    } else {
      // TODO: Feilmelding til bruker
    }
  };

  return (
    <>
      <h1 className="text-5xl text-center py-8 mb-8 text-green-950 bg-lime-50">
        Football Athletes
      </h1>
      <div className="bg-white p-8">
        <div className=" container grid grid-cols-4 gap-2 justify-items-center mb-8 ">
          {athletes.map((athlete) => (
            <AthleteItem key={athlete.id} player={athlete} />
          ))}
        </div>
      </div>
    </>
  );
};
export default AthleteList;
