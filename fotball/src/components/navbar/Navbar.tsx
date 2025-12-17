import { Searchbar } from "./Searchbar";
import { RiMoneyDollarCircleFill, RiAdminFill } from "react-icons/ri";
import { MdStadium } from "react-icons/md";
import { BsPersonFillAdd } from "react-icons/bs";
import { NavbarItem } from "./NavbarItem";

export const Navbar = () => {
  return (
    <nav className={`relative w-full min-h-[40vh]`}>
      <div className="w-full bg-gray-100 shadow-md fixed top-0 z-90">
        <div className="flex justify-center my-4 px-8">
          <Searchbar />
        </div>

        <div className="flex flex-wrap justify-center gap-4 sm:gap-8 bg-white rounded py-5 px-4 sm:px-8 text-xl text-white mt-4 mb-1">
          <div className="bg-green-600 p-6 sm:p-8">
            <NavbarItem to="/" icon={<RiAdminFill />} label="Admin." />
          </div>

          <div className="bg-blue-600 p-6 sm:p-8">
            <NavbarItem
              to="/register"
              icon={<BsPersonFillAdd />}
              label="Register"
            />
          </div>

          <div className="bg-yellow-600 p-6 sm:p-8">
            <NavbarItem
              to="/finances"
              icon={<RiMoneyDollarCircleFill />}
              label="Finances"
            />
          </div>

          <div className="bg-gray-600 p-6 sm:p-8">
            <NavbarItem to="/venues" icon={<MdStadium />} label="Venues" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
