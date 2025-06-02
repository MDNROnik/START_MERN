import { Outlet } from "react-router-dom";
import Footer from "../Pages/Share/Footer";
import Navbar from "../Pages/Share/Navbar";
const MainLayout = () => {
  return (
    <div className="max-w-screen-xl mx-auto">
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
