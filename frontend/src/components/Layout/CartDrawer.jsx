import { IoMdClose } from "react-icons/io";
import CartContents from "../Cart/CartContents";
import { useNavigate } from "react-router-dom";

const CartDrawer = ({drawerOpen, toggleCartDrawer}) => {
  const navigate = useNavigate();

  const handleCheckout = () => {
    toggleCartDrawer();
    navigate("/checkout");
  }

  return (
    <div
      className={`flex flex-col fixed top-0 right-0 h-full w-3/4 sm:w-1/2 md:w-[30rem] bg-white shadow-lg transform transition-transform duration-300 z-50 ${
        drawerOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
        {/* Close Button */}
      <div className="flex justify-end pt-4 pr-4"> 
        <button onClick={toggleCartDrawer}>
            <IoMdClose className="h-6 w-6 text-gray-600 hover:text-gray-800" />
        </button>
      </div>

      {/* Cart components with scrollbar */}
      <div className="flex-grow overflow-y-auto p-4">
         <h2 className="text-xl font-semibold mb-4">Your Cart</h2>

         {/* Component for Cart Contents */}
         <CartContents />
      </div>

      {/* Checkout Button */}
      <div className="p-4 bg-white sticky bottom-0">
        <button onClick={handleCheckout} className="w-full py-2 font-semibold bg-[#954C2E] text-white rounded-lg mb-2 hover:bg-[#A1583A] transition">
            Checkout 
        </button>

        <p className="text-sm tracking-tighter text-center text-gray-500">
            Shipping, taxes, and discount codes calculated at checkout.
        </p>
      </div>
    </div>
  );
};

export default CartDrawer;
