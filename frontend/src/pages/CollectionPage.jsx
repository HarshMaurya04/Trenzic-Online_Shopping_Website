import { useEffect, useRef, useState } from "react";
import { FaFilter } from "react-icons/fa";
import FilterSidebar from "../components/Products/FilterSidebar";
import SortOptions from "../components/Products/SortOptions";
import ProductGrid from "../components/Products/ProductGrid";

const CollectionPage = () => {
  const [products, setProducts] = useState([]);
  const sidebarRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleClickOutside = (e) => {
    // Close sidebar if clicked outside
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    // Add event listner for clicks
    document.addEventListener("mousedown", handleClickOutside);

    //clean event listener
    return () => {
      document.addEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      const fetchProducts = [
        {
          id: 1,
          name: "Product 1",
          price: 2000,
          image: {
            url: "https://picsum.photos/500/500?random=15",
            altTrxt: "Product 1",
          },
        },
        {
          id: 2,
          name: "Product 2",
          price: 2000,
          image: {
            url: "https://picsum.photos/500/500?random=16",
            altTrxt: "Product 2",
          },
        },
        {
          id: 3,
          name: "Product 3",
          price: 2000,
          image: {
            url: "https://picsum.photos/500/500?random=17",
            altTrxt: "Product 3",
          },
        },
        {
          id: 4,
          name: "Product 4",
          price: 2000,
          image: {
            url: "https://picsum.photos/500/500?random=18",
            altTrxt: "Product 4",
          },
        },
        {
          id: 5,
          name: "Product 5",
          price: 2000,
          image: {
            url: "https://picsum.photos/500/500?random=19",
            altTrxt: "Product 5",
          },
        },
        {
          id: 6,
          name: "Product 6",
          price: 2000,
          image: {
            url: "https://picsum.photos/500/500?random=20",
            altTrxt: "Product 6",
          },
        },
        {
          id: 7,
          name: "Product 7",
          price: 2000,
          image: {
            url: "https://picsum.photos/500/500?random=21",
            altTrxt: "Product 7",
          },
        },
        {
          id: 8,
          name: "Product 8",
          price: 2000,
          image: {
            url: "https://picsum.photos/500/500?random=22",
            altTrxt: "Product 8",
          },
        },
      ];
      setProducts(fetchProducts);
    }, 1000);
  }, []);

  return (
    <div className="flex flex-col lg:flex-row">
      {/* Mobile Filter Button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden border p-2 flex justify-center items-center"
      >
        <FaFilter className="mr-2" /> Filters
      </button>

      {/* Filter Sidebar */}
      <div
        ref={sidebarRef}
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 z-50 left-0 w-64 bg-white overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0`}
      >
        <FilterSidebar />
      </div>
      <div className="flex-grow p-4">
        <h2 className="text-2xl uppercase mb-4 font-semibold">
          All Collection
        </h2>

        {/* Sort Options */}
        <SortOptions />

        {/* Product Grid */}
        <ProductGrid products={products} />
      </div>
    </div>
  );
};

export default CollectionPage;
