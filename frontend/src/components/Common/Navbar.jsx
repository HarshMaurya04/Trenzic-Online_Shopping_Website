import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBagShopping, faBars } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Searchbar from "./Searchbar";

const Navbar = () => {
  return (
    <nav className="container px-10 flex items-center justify-between py-4">
      {/* Left - Logo */}
      <div>
        <Link to="/" className="text-3xl font-medium">
          Trenzic
        </Link>
      </div>

      {/* Center - Navigation Links */}
      <div className="hidden md:flex space-x-6">
        <Link
          to="#"
          className="text-gray-600 hover:text-black hover:underline text-sm font-medium uppercase"
        >
          Men
        </Link>
        <Link
          to="#"
          className="text-gray-600 hover:text-black hover:underline text-sm font-medium uppercase"
        >
          Women
        </Link>
        <Link
          to="#"
          className="text-gray-600 hover:text-black hover:underline text-sm font-medium uppercase"
        >
          Top Wear
        </Link>
        <Link
          to="#"
          className="text-gray-600 hover:text-black hover:underline text-sm font-medium uppercase"
        >
          Bottom Wear
        </Link>
      </div>

      {/* Right - Icons */}
      <div className="flex items-center gap-3">
        <Link to="/profile" className="text-gray-600 hover:text-black">
          <FontAwesomeIcon icon={faUser} className="h-6 w-6" />
        </Link>

        <button className="relative text-gray-600 hover:text-black">
          <FontAwesomeIcon
            icon={faBagShopping}
            className="h-6 w-6"
          />
          <span className="absolute -top-1 -right-2 bg-[#d97706] text-white text-xs rounded-full px-1.5 py-0.5 ">4</span>
        </button>

        {/* Search Icon*/}
        <div className="overflow-hidden">
            <Searchbar />
        </div>

        <button className="md:hidden text-gray-600 hover:text-black">
          <FontAwesomeIcon icon={faBars} className="h-6 w-6"/>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
