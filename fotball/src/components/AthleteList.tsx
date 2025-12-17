import { useAthletes } from "../context/AthletesContext";
import AthleteItem from "./AthleteItem";
import Feedback from "./globals/Feedback";

const AthleteList = () => {
  const { athletes, searchQuery, isLoading, error } = useAthletes();

  if (isLoading) return <p className="p-8">Loading athletes...</p>;

  const filteredAthletes = athletes.filter((a) =>
    a.name.toLowerCase().includes(searchQuery.trim().toLowerCase())
  );

  return (
    <>
      <h1 className="text-5xl text-center py-8 mb-8 text-green-950 bg-gray-50">
        Football Players
      </h1>

      <div className="px-8">
        <Feedback message={error} variant="error" className="mb-4" />
      </div>

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
