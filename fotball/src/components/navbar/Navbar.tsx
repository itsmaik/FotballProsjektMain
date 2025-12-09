import { Link } from "react-router-dom";
import heroImg from "../../assets/heroImg.png";
import HomePage from "../../pages/HomePage";

export const Navbar = () => {
  return (
    <nav
      className={`relative w-full bg-cover bg-top min-h-[40vh] mt-16`}
      style={{ backgroundImage: `url(${heroImg})` }}
    >
      <div className="w-full mx-auto bg-lime-50 shadow-md fixed top-0">
        <div className="container w-2/4 mx-auto flex items-center justify-between bg-white rounded py-5 px-8 text-xl text-green-950">
          <div>
            <Link to="/">Home</Link>
          </div>
          <div>
            <Link to="/register">Add New Athlete</Link>
          </div>
          <div>
            <Link to="/finances">Finances</Link>
          </div>
          <div>
            <Link to="/venues">Venues</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default { Navbar };
