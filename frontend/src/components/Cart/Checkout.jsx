import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PayPalButton from "./PayPalButton";

const cart = {
  products: [
    {
      name: "Stylish Jacaket",

      size: "M",
      color: "Black",
      price: 3500,
      image: "https://picsum.photos/150?random=1",
    },
    {
      name: "Casual Sneackers",
      size: "42",
      color: "White",
      price: 1500,
      image: "https://picsum.photos/150?random=2",
    },
  ],
  totalPrice: 5000,
};

const Checkout = () => {
  const navigate = useNavigate();
  const [checkoutId, setCheckoutId] = useState(null);
  const [usdAmount, setUsdAmount] = useState(null); // converted USD value
  const [loadingRate, setLoadingRate] = useState(false);

  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    phone: "",
  });

  // Fetch conversion rate once
  useEffect(() => {
    const convertINRtoUSD = async () => {
      setLoadingRate(true);
      try {
        const response = await fetch(
          "https://v6.exchangerate-api.com/v6/${import.meta.env.VITE_EXCHANGE_RATE_API_KEY}/latest/INR"
        );
        const data = await response.json();
        const rate = data.conversion_rates.USD;
        const converted = (cart.totalPrice * rate).toFixed(2);
        setUsdAmount(converted);
      } catch (error) {
        console.error("Currency conversion error:", error);
      } finally {
        setLoadingRate(false);
      }
    };

    convertINRtoUSD();
  }, []);

  const handleCreateCheckout = (e) => {
    e.preventDefault();
    setCheckoutId(123);
  };

  const handlePaymentSuccess = (details) => {
    console.log("Payment Successful", details);
    navigate("/order-confirmation");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-7xl mx-auto py-10 px-6">
      {/* Left Section */}
      <div className="rounded-3xl p-8 bg-slate-100">
        <h2 className="text-2xl uppercase mb-6 font-semibold text-center">
          Checkout
        </h2>
        <form onSubmit={handleCreateCheckout}>
          <h3 className="text-lg mb-4">Contact Details</h3>
          <div className="mb-6">
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value="user@example.com"
              className="w-full p-2 border rounded-xl bg-white"
              disabled
            />
          </div>
          <h3 className="text-lg mb-4">Delivery</h3>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-1">First Name</label>
              <input
                type="text"
                value={shippingAddress.firstName}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    firstName: e.target.value,
                  })
                }
                className="w-full p-2 border rounded-xl"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Last Name</label>
              <input
                type="text"
                value={shippingAddress.lastName}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    lastName: e.target.value,
                  })
                }
                className="w-full p-2 border rounded-xl"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Address</label>
            <input
              type="text"
              value={shippingAddress.address}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  address: e.target.value,
                })
              }
              className="w-full p-2 border rounded-xl"
              required
            />
          </div>

          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-1">City</label>
              <input
                type="text"
                value={shippingAddress.city}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    city: e.target.value,
                  })
                }
                className="w-full p-2 border rounded-xl"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Postal Code</label>
              <input
                type="text"
                value={shippingAddress.postalCode}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    postalCode: e.target.value,
                  })
                }
                className="w-full p-2 border rounded-xl"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Country</label>
            <input
              type="text"
              value={shippingAddress.country}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  country: e.target.value,
                })
              }
              className="w-full p-2 border rounded-xl"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Phone No.</label>
            <input
              type="text"
              value={shippingAddress.phone}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  phone: e.target.value,
                })
              }
              className="w-full p-2 border rounded-xl"
              required
            />
          </div>

          <div className="mt-7">
            {!checkoutId ? (
              <button
                type="submit"
                className="w-full bg-slate-800 text-white py-3 rounded-2xl"
              >
                Continue to Payment
              </button>
            ) : (
              <div>
                <h3 className="text-lg mb-4">Pay with PayPal</h3>
                {loadingRate ? (
                  <p>Loading PayPal...</p>
                ) : usdAmount ? (
                  <PayPalButton
                    amount={usdAmount}
                    onSuccess={handlePaymentSuccess}
                    onError={() => alert("Payment failed. Try again.")}
                  />
                ) : (
                  <p>Error fetching exchange rate.</p>
                )}
              </div>
            )}
          </div>
        </form>
      </div>

      {/* Right Section */}
      <div className="bg-slate-100 p-6 rounded-3xl">
        <h3 className="text-lg mb-4 font-semibold">Order Summary</h3>
        <div className="border-t border-slate-300 py-4 mb-4">
          {cart.products.map((product, index) => (
            <div
              key={index}
              className="flex items-start justify-between py-2 border-b border-slate-300"
            >
              <div className="flex items-start">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-20 h-24 object-cover mr-4 rounded-xl"
                />
                <div className="text-md">
                  <h3>{product.name}</h3>
                  <p className="text-gray-600">Size: {product.size}</p>
                  <p className="text-gray-600">Color: {product.color}</p>
                </div>
              </div>
              <p className="text-lg">Rs.{product.price?.toLocaleString()}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center text-lg mb-4">
          <p>Subtotal</p>
          <p>Rs.{cart.totalPrice?.toLocaleString()}</p>
        </div>
        <div className="flex justify-between items-center text-lg mb-4">
          <p>Shipping</p>
          <p>Free</p>
        </div>
        <div className="flex justify-between items-center text-lg mt-4 border-t border-slate-300 pt-4">
          <p>Total</p>
          <p>Rs.{cart.totalPrice?.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
