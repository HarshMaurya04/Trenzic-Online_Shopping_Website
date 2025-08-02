import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAdminProducts } from "../redux/slices/adminProductSlice";
import { fetchAllOrders } from "../redux/slices/adminOrderSlice";

const AdminHomePage = () => {
  const dispatch = useDispatch();
  const {
    products,
    loading: productsLoading,
    error: productsError,
  } = useSelector((state) => state.adminProducts);
  const {
    orders,
    totalOrders,
    totalSales,
    loading: ordersLoading,
    error: ordersError,
  } = useSelector((state) => state.adminOrders);

  useEffect(() => {
    dispatch(fetchAdminProducts());
    dispatch(fetchAllOrders());
  }, [dispatch]);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {productsLoading || ordersLoading ? (
        <p>Loading ...</p>
      ) : productsError ? (
        <p className="text-red-500">Error fetching products: {productsError}</p>
      ) : ordersError ? (
        <p className="text-red-500">Error fetching orders: {ordersError}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 bg-slate-50 shadow-md rounded-3xl transform transition hover:scale-105 duration-300">
            <h2 className="text-xl font-semibold mb-2 text-gray-700">
              Revenue
            </h2>
            <p className="text-2xl font-bold text-gray-900">
              ₹{(totalSales ?? 0).toLocaleString("en-IN")}
            </p>
          </div>

          <div className="p-6 bg-slate-50 shadow-md rounded-3xl transform transition hover:scale-105 duration-300">
            <h2 className="text-xl font-semibold mb-2 text-gray-700">
              Total Orders
            </h2>
            <p className="text-2xl font-bold text-gray-900">{totalOrders}</p>
            <Link
              to="/admin/orders"
              className="text-blue-500 hover:underline mt-2 block"
            >
              Manage Orders
            </Link>
          </div>

          <div className="p-6 bg-slate-50 shadow-md rounded-3xl transform transition hover:scale-105 duration-300">
            <h2 className="text-xl font-semibold mb-2 text-gray-700">
              Total Products
            </h2>
            <p className="text-2xl font-bold text-gray-900">
              {products.length}
            </p>
            <Link
              to="/admin/products"
              className="text-blue-500 hover:underline mt-2 block"
            >
              Manage Products
            </Link>
          </div>
        </div>
      )}

      {/* Recent Orders Table */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Recent Orders</h2>
        <div className="relative bg-slate-50 shadow-md rounded-3xl overflow-hidden mb-8">
          <table className="min-w-full text-left text-gray-500">
            <thead className="bg-gray-200 text-sm uppercase text-gray-700">
              <tr>
                <th className="py-2 px-4 sm:py-3">Order ID</th>
                <th className="py-2 px-4 sm:py-3">User</th>
                <th className="py-2 px-4 sm:py-3">Total Price</th>
                <th className="py-2 px-4 sm:py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr
                    key={order._id}
                    className="border-b hover:bg-white cursor-pointer"
                  >
                    <td className="py-2 px-2 sm:py-4 sm:px-4 font-medium text-gray-900 whitespace-nowrap">
                      #{order._id}
                    </td>
                    <td className="py-2 px-2 sm:py-4 sm:px-4">
                      {order.user?.name || "Unknown"}
                    </td>
                    <td className="py-2 px-2 sm:py-4 sm:px-4">
                      ₹{(order.totalPrice ?? 0).toLocaleString("en-IN")}
                    </td>
                    <td className="py-2 px-2 sm:py-4 sm:px-4">
                      <span
                        className={`${
                          order.status === "Delivered"
                            ? "bg-green-100 text-green-700"
                            : order.status === "Processing"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        } p-2 rounded-xl text-sm font-medium`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="py-4 px-4 text-center text-gray-500"
                  >
                    No recent orders found!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminHomePage;
