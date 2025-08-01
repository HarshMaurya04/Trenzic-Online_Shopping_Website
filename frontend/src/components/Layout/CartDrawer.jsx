import { useEffect, useRef } from "react";
import { IoMdClose } from "react-icons/io";
import CartContents from "../Cart/CartContents";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const CartDrawer = ({ drawerOpen, toggleCartDrawer }) => {
  const navigate = useNavigate();
  const { user, guestId } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  const userId = user ? user._id : null;

  const drawerRef = useRef(null);

  // Close drawer on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        drawerOpen &&
        drawerRef.current &&
        !drawerRef.current.contains(event.target)
      ) {
        toggleCartDrawer();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [drawerOpen, toggleCartDrawer]);

  const handleCheckout = () => {
    toggleCartDrawer();
    if (!user) {
      navigate("/login?redirect=checkout");
    } else {
      navigate("/checkout");
    }
  };

  return (
    <>
      {/* Backdrop */}
      {drawerOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-40" />
      )}

      {/* Drawer */}
      <div
        ref={drawerRef}
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

        {/* Scrollable Cart Section */}
        <div className="flex-grow overflow-y-auto p-4">
          <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
          {cart && cart?.products?.length > 0 ? (
            <CartContents cart={cart} userId={userId} guestId={guestId} />
          ) : (
            <p>Your cart is empty!</p>
          )}
        </div>

        {/* Fixed Checkout Button (Unchanged) */}
        <div className="p-4 bg-white sticky bottom-0">
          {cart && cart?.products?.length > 0 && (
            <>
              <button
                onClick={handleCheckout}
                className="w-full py-2 font-semibold bg-[#954C2E] text-white rounded-lg mb-2 hover:bg-[#A1583A] transition"
              >
                Checkout
              </button>
              <p className="text-sm tracking-tighter text-center text-gray-500">
                Shipping, taxes, and discount codes calculated at checkout.
              </p>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
