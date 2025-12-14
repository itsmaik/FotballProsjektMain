import { Link } from "react-router-dom";
import { Searchbar } from "./Searchbar";
import { RiMoneyDollarCircleFill, RiAdminFill } from "react-icons/ri";
import { MdStadium } from "react-icons/md";
import { BsPersonFillAdd } from "react-icons/bs";

export const Navbar = () => {
  return (
    <nav className={`relative w-full min-h-[40vh]`}>
      <div className="w-full bg-gray-100 shadow-md fixed top-0">
        <div className="flex justify-center my-4 px-8">
          <Searchbar />
        </div>

        <div className="flex justify-center gap-8 bg-white rounded py-5 px-8 text-xl text-white mt-4 mb-1">
          <div className="bg-green-600 p-8">
            <Link to="/" className="flex flex-col items-center gap-1">
              <RiAdminFill className="text-2xl" />
              <span>Admin.</span>
            </Link>
          </div>

          <div className="bg-blue-600 p-8">
            <Link to="/register" className="flex flex-col items-center gap-1">
              <BsPersonFillAdd className="text-2xl" />
              <span>Register</span>
            </Link>
          </div>

          <div className="bg-yellow-600 p-8">
            <Link to="/finances" className="flex flex-col items-center gap-1">
              <RiMoneyDollarCircleFill className="text-2xl" />
              <span>Finances</span>
            </Link>
          </div>

          <div className="bg-gray-600 p-8">
            <Link to="/venues" className="flex flex-col items-center gap-1">
              <MdStadium className="text-2xl" />
              <span>Venues</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
