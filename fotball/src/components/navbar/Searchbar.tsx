import { FaSearch } from "react-icons/fa";
import { useAthletes } from "../../context/AthletesContext";

export const Searchbar = () => {
  const { searchQuery, setSearchQuery } = useAthletes();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="flex items-center w-full md:w-1/2 bg-white rounded-full">
      <input
        aria-label="Search Players"
        type="text"
        placeholder="Search for Athlete"
        value={searchQuery}
        onChange={handleInputChange}
        className="bg-transparent w-full px-4 py-2 focus:outline-none"
      />
      <span className="bg-green-600 text-white py-3 px-6 rounded-full m-1">
        <FaSearch />
      </span>
    </div>
  );
};
