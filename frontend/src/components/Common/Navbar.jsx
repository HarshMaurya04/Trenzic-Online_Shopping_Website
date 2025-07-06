import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faBagShopping,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Searchbar from "./Searchbar";
import CartDrawer from "../Layout/CartDrawer";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);

  const toggleCartDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const toggleNavDrawer = () => {
    setNavDrawerOpen(!navDrawerOpen);
  };

  return (
    <>
      <nav className="container px-5 md:px-10 flex items-center justify-between py-4">
        {/* Left - Logo */}
        <div>
          <Link to="/" className="text-3xl font-medium">
            Trenzic
          </Link>
        </div>

        {/* Center - Navigation Links */}
        <div className="hidden md:flex space-x-6">
          <Link
            to="/collections/all"
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

          <button
            onClick={toggleCartDrawer}
            className="relative text-gray-600 hover:text-black"
          >
            <FontAwesomeIcon icon={faBagShopping} className="h-6 w-6" />
            <span className="absolute -top-1 -right-2 bg-[#d97706] text-white text-xs rounded-full px-1.5 py-0.5 ">
              4
            </span>
          </button>

          {/* Search Icon*/}
          <div className="overflow-hidden">
            <Searchbar />
          </div>

          <button
            onClick={toggleNavDrawer}
            className="md:hidden text-gray-600 hover:text-black"
          >
            <FontAwesomeIcon icon={faBars} className="h-6 w-6" />
          </button>
        </div>
      </nav>

      <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer} />

      {/* Mobile Navigation */}
      <div
        className={`fixed top-0 left-0 w-3/4 sm:w-1/2 md:w-1/3 h-full bg-white shadow-lg transform transition-transform duration-300 z-50 ${
          navDrawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button onClick={toggleNavDrawer}>
            <IoMdClose className="w-6 h-6 text-gray-600 hover:text-gray-800" />
          </button>
        </div>

        <div className="p-4">
          <nav className="flex flex-col gap-4">
            <h2 className="text-xl font-semibold">Menu</h2>

            <Link
              to="#"
              onClick={toggleNavDrawer}
              className="block text-gray-600 hover:text-black hover:underline"
            >
              Men
            </Link>
            <Link
              to="#"
              onClick={toggleNavDrawer}
              className="block text-gray-600 hover:text-black hover:underline"
            >
              Women
            </Link>
            <Link
              to="#"
              onClick={toggleNavDrawer}
              className="block text-gray-600 hover:text-black hover:underline"
            >
              Top Wear
            </Link>
            <Link
              to="#"
              onClick={toggleNavDrawer}
              className="block text-gray-600 hover:text-black hover:underline"
            >
              Bottom Wear
            </Link>
          </nav>

        </div>
      </div>
    </>
  );
};

export default Navbar;
