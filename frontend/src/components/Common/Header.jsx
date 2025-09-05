import { useEffect, useState } from "react";
import Topbar from "../Layout/Topbar";
import Navbar from "./Navbar";

const Header = () => {
  const [hideTopbar, setHideTopbar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHideTopbar(window.scrollY > 50); // Hide when scrolling past 50px
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white border-b border-gray-300 shadow-sm">
      <div
        className={`overflow-hidden transition-all ease-in-out duration-300 ${
          hideTopbar ? "max-h-0 opacity-0" : "max-h-[48px] opacity-100"
        }`}
      >
        <Topbar />
      </div>
      <div className="shadow-sm">
        <Navbar />
      </div>
    </header>
  );
};

export default Header;
