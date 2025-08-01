import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchProductsByFilter,
  setFilters,
} from "../../redux/slices/productsSlice";

const Searchbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearchToggle = () => {
    setIsOpen(!isOpen);
  };
 
  const handelSearch = (e) => {
    e.preventDefault();
    dispatch(setFilters({ search: searchTerm }));
    dispatch(fetchProductsByFilter({ search: searchTerm }));
    navigate(`/collections/all?search=${searchTerm}`);
    setIsOpen(false);
  };

  return (
    <div
      className={`flex items-center justify-center w-full transition-all durationo-300 ${
        isOpen ? "absolute top-0 left-0 w-full bg-white h-28 z-50" : "w-auto"
      }`}
    >
      {isOpen ? (
        <form
          onSubmit={handelSearch}
          className="relative flex items-center justify-center w-full"
        >
          <div className="relative w-1/2">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-gray-100 px-4 py-2 pr-12 rounded-lg focus:outline-none w-full placeholder:text-gray-600"
            />

            {/* Search Icon*/}
            <button
              type="submit"
              className="absolute top-2 right-3 text-gray-600 hover:text-gray-800"
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} className="h-6 w-6" />
            </button>
          </div>

          {/* Close button */}
          <button
            type="button"
            onClick={handleSearchToggle}
            className="absolute top-2 right-4 text-gray-600 hover:text-gray-800"
          >
            <FontAwesomeIcon icon={faXmark} className="h-6 w-6" />
          </button>
        </form>
      ) : (
        <button
          onClick={handleSearchToggle}
          className="text-gray-600 hover:text-black ml-1"
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} className="h-6 w-6" />
        </button>
      )}
    </div>
  );
};

export default Searchbar;
