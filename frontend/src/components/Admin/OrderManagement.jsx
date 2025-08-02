import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchAllOrders,
  updateOrderStatus,
} from "../../redux/slices/adminOrderSlice";

const OrderManagement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { orders, loading, error } = useSelector((state) => state.adminOrders);

  useEffect(() => {
    if (user && user.role !== "admin") {
      navigate("/");
    } else {
      dispatch(fetchAllOrders());
    }
  }, [dispatch, user, navigate]);

  const handleStatusChange = (orderId, status) => {
    dispatch(updateOrderStatus({ id: orderId, status }));
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Order Management</h2>

      <div className="relative bg-slate-50 shadow-md rounded-2xl sm:rounded-3xl overflow-x-auto mb-8">
        <table className="min-w-full text-left text-gray-500">
          <thead className="bg-gray-200 text-sm uppercase text-gray-700">
            <tr>
              <th className="py-2 px-4 sm:py-3">Order ID</th>
              <th className="py-2 px-4 sm:py-3">Customer</th>
              <th className="py-2 px-4 sm:py-3">Total Price</th>
              <th className="py-2 px-4 sm:py-3">Status</th>
              <th className="py-2 px-4 sm:py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr
                  key={order._id}
                  className="border-b hover:bg-white transition cursor-pointer"
                >
                  <td className="p-4 font-medium text-gray-900 whitespace-nowrap">
                    #{order._id}
                  </td>
                  <td className="p-4 font-medium text-gray-900 whitespace-nowrap">
                    {order.user?.name}
                  </td>
                  <td className="p-4 font-medium text-gray-900 whitespace-nowrap">
                    ₹{order.totalPrice.toLocaleString("en-IN")}
                  </td>
                  <td className="p-4 font-medium text-gray-900 whitespace-nowrap">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                      className="p-2 border border-slate-300 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:border-blue-300 transition duration-200"
                    >
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="p-4 font-medium text-gray-900 whitespace-nowrap">
                    <button
                      onClick={() => handleStatusChange(order._id, "Delivered")}
                      className={`px-4 py-2 rounded-lg sm:rounded-xl text-white transition ${
                        order.status === "Delivered"
                          ? "bg-green-400 opacity-50 cursor-not-allowed"
                          : "bg-green-500 hover:bg-green-600"
                      }`}
                      disabled={order.status === "Delivered"}
                    >
                      Mark as Delivered
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="py-4 px-4 text-center text-gray-500">
                  No Orders found!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderManagement;
