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
    const athleteResponse = await AthleteService.getAllAthletes();
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
    <section className="section">
      <h3 className="title xs-12">Fotball athletes</h3>
      {athletes.map((athlete) => (
        <AthleteItem key={athlete.id} player={athlete} />
      ))}
    </section>
  );
};
export default AthleteList;
