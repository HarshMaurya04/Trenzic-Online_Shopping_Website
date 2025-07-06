import MyOrdersPage from "./MyOrdersPage";

const Profile = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow container px-6 py-4 md:px-24 md:py-6">
        <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0">
          {/* Left Section */}
          <div className="w-full md:w-1/3 lg:w-1/4 bg-slate-50 shadow-md rounded-3xl p-6">
            <h1 className="text-2xl md:text-3xl font-bold mb-4">
              Harsh Maurya
            </h1>
            <p className="text-lg text-gray-600 mb-4">harshm8540@gmail.com</p>
            <button className="w-full bg-red-500 text-white py-2 rounded-xl hover:bg-red-600">
              Logout
            </button>
          </div>

          {/* Right Section: Orders table */}
          <div className="w-full md:w-2/3 lg:w-3/4">
            <MyOrdersPage />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
