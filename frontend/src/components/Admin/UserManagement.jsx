import { useState } from "react";

const UserManagement = () => {
  const users = [
    {
      _id: 123213,
      name: "Hemani Maurya",
      email: "hemanim@gmail.com",
      role: "admin",
    },
  ];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer", // Default role
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    //Reset the form after submission
    setFormData({
      name: "",
      email: "",
      password: "",
      role: "customer",
    });
  };

  const handleRoleChange = (userId, newRole) => {
    console.log({ id: userId, role: newRole });
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm("Are you sure you want to delete this user ?")) {
      console.log("deleting user with ID", userId);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">User Management</h2>

      {/* Add New User Form */}
      <div className="p-6 bg-slate-50 shadow-md rounded-3xl mb-10">
        <h3 className="text-lg font-bold mb-4">Add New User</h3>
        <form onSubmit={handleSubmit}>
          {/* Row 1: Name & Role */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <div>
              <label className="block text-gray-700 mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border rounded-xl focus:outline-none focus:ring focus:border-blue-300"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full p-2 border rounded-xl focus:outline-none focus:ring focus:border-blue-300"
              >
                <option value="customer">Customer</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>

          {/* Row 2: Email & Password */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <div>
              <label className="block text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border rounded-xl focus:outline-none focus:ring focus:border-blue-300"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 border rounded-xl focus:outline-none focus:ring focus:border-blue-300"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition"
          >
            Add User
          </button>
        </form>
      </div>
 
      {/* User List Management */}
      <div className="relative bg-slate-50 shadow-md rounded-3xl overflow-hidden mb-8">
        <table className="min-w-full text-left text-gray-500">
          <thead className="bg-gray-200 text-sm uppercase text-gray-700">
            <tr>
              <th className="py-2 px-4 sm:py-3">Name</th>
              <th className="py-2 px-4 sm:py-3">Email</th>
              <th className="py-2 px-4 sm:py-3">Role</th>
              <th className="py-2 px-4 sm:py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr
                  key={user._id}
                  className="border-b hover:bg-white transition cursor-pointer"
                >
                  <td className="py-2 px-4 sm:py-3 font-medium text-gray-900 whitespace-nowrap">
                    {user.name}
                  </td>
                  <td className="py-2 px-4 sm:py-3">{user.email}</td>
                  <td className="py-2 px-4 sm:py-3">
                    <select
                      value={user.role}
                      onChange={(e) =>
                        handleRoleChange(user._id, e.target.value)
                      }
                      className="p-2 border rounded-xl focus:outline-none focus:ring focus:border-blue-300"
                    >
                      <option value="customer">Customer</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td className="py-2 px-4 sm:py-3">
                    <button
                      onClick={() => handleDeleteUser(user._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl text-sm transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="py-4 px-4 text-center text-gray-500">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
