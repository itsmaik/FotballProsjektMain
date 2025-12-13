import { useAthletes } from "../context/AthletesContext";
import AthleteItem from "./AthleteItem";

const AthleteList = () => {
  const { athletes, searchQuery } = useAthletes();

  const filteredAthletes = athletes.filter((a) =>
    a.name.toLowerCase().includes(searchQuery.trim().toLowerCase())
  );

  return (
    <>
      <h1 className="text-5xl text-center py-8 mb-8 text-green-950 bg-gray-50">
        Football Players
      </h1>
      <div className="bg-white p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
          {filteredAthletes.map((athlete) => (
            <AthleteItem key={athlete.id} player={athlete} />
          ))}
        </div>
      </div>
    </>
  );
};
export default AthleteList;
