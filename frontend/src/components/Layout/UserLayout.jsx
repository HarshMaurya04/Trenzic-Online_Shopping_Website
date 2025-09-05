import { Outlet } from "react-router-dom";
import Footer from "../Common/Footer";
import Header from "../Common/Header";

const UserLayout = () => {
  return (
    <>
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="pt-[115px]">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default UserLayout;
