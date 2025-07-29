import { Link } from "react-router-dom";

const ProductManagement = () => {
  const products = [
    {
      _id: 123231,
      name: "Shirt",
      price: 1200,
      sku: "123123213",
    },
  ];

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      console.log("Delete Product with id:", id);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Product Management</h2>

      {/* Styled Product Table */}
      <div className="relative bg-slate-50 shadow-md rounded-2xl sm:rounded-3xl overflow-x-auto mb-8">
        <table className="min-w-full text-left text-gray-500">
          <thead className="bg-gray-200 text-sm uppercase text-gray-700">
            <tr>
              <th className="py-2 px-4 sm:py-3">Name</th>
              <th className="py-2 px-4 sm:py-3">Price</th>
              <th className="py-2 px-4 sm:py-3">SKU</th>
              <th className="py-2 px-4 sm:py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr
                  key={product._id}
                  className="border-b hover:bg-white transition cursor-pointer"
                >
                  <td className="py-2 px-4 sm:py-3 font-medium text-gray-900 whitespace-nowrap">
                    {product.name}
                  </td>
                  <td className="py-2 px-4 sm:py-3 font-medium text-gray-900 whitespace-nowrap">
                    Rs.{product.price}
                  </td>
                  <td className="py-2 px-4 sm:py-3 font-medium text-gray-900 whitespace-nowrap">
                    {product.sku}
                  </td>
                  <td className="py-2 px-4 sm:py-3 space-y-2 sm:space-x-2">
                    <Link
                      to={`/admin/products/${product._id}/edit`}
                      className="bg-yellow-500 text-white px-4 py-1 sm:py-2 rounded-lg sm:rounded-xl text-sm hover:bg-yellow-600 transition"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="bg-red-500 text-white px-4 py-1 sm:py-2 rounded-lg sm:rounded-xl text-sm hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="py-4 px-4 text-center text-gray-500">
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductManagement;
