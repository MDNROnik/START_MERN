import { useContext, useEffect, useState } from "react";
import {
  FaAd,
  FaHome,
  FaList,
  FaShoppingCart,
  FaUsers,
  FaUtensils,
} from "react-icons/fa";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { AuthContext } from "../providers/AuthProvider";
// import MainLogo from "../Pages/Share/MainLogo"
import two from "../assets/icon/logo-bg-black-removebg-preview.png";

// logo-bg-white-removebg-preview
const MainPanel = () => {
  const { carts, user, signOutUser } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    // currentUser.uid
    axiosPublic
      .get(`/user/${user.uid}`, {
        headers: {
          jwttoken: `Bearer ${localStorage.getItem("jwttoken")}`,
        },
      })
      .then((res) => {
        console.log(res.data.role);
        if (res?.data?.role) {
          setRole(res?.data?.role);
        }
      })
      .catch((err) => {
        console.log(err.status);
        if (err) {
          console.log(err);
          console.log("main panel");
          signOutUser();
          navigate("/login");
        }
      });
  }, [role]);

  const renderNavLinks = () => {
    if (role === "admin") {
      return (
        <>
          <NavItem
            to="/mainpanel/dashboard"
            icon={<FaHome />}
            label="Admin Home"
          />
          <NavItem
            to="/mainpanel/addItems"
            icon={<FaUtensils />}
            label="Add Items"
          />
          <NavItem
            to="/mainpanel/manageItems"
            icon={<FaList />}
            label="Manage Items"
          />
          <NavItem to="/mainpanel/users" icon={<FaUsers />} label="All Users" />
        </>
      );
    } else if (role === "chef") {
      return (
        <>
          <NavItem
            to="/mainpanel/chef-home"
            icon={<FaHome />}
            label="Chef Home"
          />
          <NavItem
            to="/mainpanel/chef-orders"
            icon={<FaList />}
            label="Chef Orders"
          />
        </>
      );
    } else {
      return (
        <>
          <NavItem
            to="/mainpanel/profile"
            icon={<FaHome />}
            label="User Home"
          />
          <NavItem
            to="/mainpanel/cart"
            icon={<FaShoppingCart />}
            label={`My Cart (${carts.length})`}
          />
          <NavItem
            to="/mainpanel/review"
            icon={<FaAd />}
            label="Add a Review"
          />
        </>
      );
    }
  };

  // Reusable nav item component
  const NavItem = ({ to, icon, label }) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
          isActive
            ? "bg-[#07252d] text-[#bcaf87]"
            : "hover:bg-[#807144] hover:text-white text-[#07252d]"
        }`
      }
    >
      <span className="text-lg">{icon}</span>
      <span>{label}</span>
    </NavLink>
  );
  return (
    // <div className="flex min-h-screen bg-[#07252d] text-[#bcaf87]">
    //   {/* Top bar for mobile */}
    //   <div className="md:hidden fixed top-0 left-0 right-0 z-30 bg-[#bcaf87]  flex items-center justify-between px-4 py-4">
    //     <button
    //       onClick={() => setSidebarOpen(!sidebarOpen)}
    //       className="text-gray-700"
    //     >
    //       <FaBars size={20} />
    //     </button>
    //     <h1 className="font-semibold text-lg text-[#07252d]">Main Panel</h1>
    //   </div>

    //   {/* Sidebar */}

    //   <aside
    //     className={`fixed z-20 top-0 left-0 h-full w-64 min-w-64 max-w-64 flex-shrink-0 transform bg-[#bcaf87] text-[#07252d] shadow-lg transition-transform duration-300 ease-in-out
    // ${sidebarOpen ? "translate-x-0 mt-14" : "-translate-x-full"}
    // md:translate-x-0 md:relative md:flex md:flex-col`}
    //   >
    //     <div className="hidden md:block text-xl font-bold px-6 py-4 border-b">
    //       Main Panel
    //     </div>
    //     <div className="border-b">
    //       <nav className="flex-1 p-4 space-y-1">{renderNavLinks()}</nav>
    //     </div>
    //     <div className="p-4">
    //       <NavItem to="/" icon={<FaHome />} label="Home" />
    //     </div>
    //   </aside>

    //   {/* Main content */}
    //   <main className=" h-full w-full p-5">
    //     <div className=" p-6 min-h-[calc(100vh-5rem)]">
    //       <Outlet />
    //     </div>
    //   </main>
    // </div>
    <div className="min-h-screen bg-[#07252d] text-">
      {/* Top Navigation Bar */}
      <nav className="w-full bg-[#bcaf87] text-[#07252d] shadow-md px-4 py-3 flex items-center justify-between border-b sm:border-b-0 sm:border-r border-[#07252d]">
        {/* Left: Logo + Heading */}
        <div className="flex items-center gap-2">
          <img className="w-10 h-10" alt="LOGO" src={two} />
          <h1 className="text-xl font-bold">Main Panel</h1>
        </div>

        {/* Right: Dropdown on small, nav on medium+ */}
        <div className="flex items-center gap-2">
          {/* Small screens: dropdown */}
          <div className="sm:hidden">
            <details className="relative">
              <summary className="cursor-pointer bg-[#07252d] text-[#bcaf87] px-4 py-2 rounded-md">
                Menu
              </summary>
              <div className="absolute right-0 mt-2 w-100 rounded-md shadow-md border border-[#07252d] bg-[#bcaf87] text-[#07252d] z-50 p-2 space-y-1 ">
                {renderNavLinks()}
                <div className="border-[#07252d] border-t">
                  <NavItem to="/" icon={<FaHome />} label="Home" />
                </div>
              </div>
            </details>
          </div>

          {/* Medium and up: inline nav */}
          <div className="hidden sm:flex sm:flex-row sm:items-center ">
            {renderNavLinks()}
            <div className="border-[#07252d] border-l">
              <NavItem to="/" icon={<FaHome />} label="Home" />
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="p-6">
        <div className="  rounded-lg shadow p-6 min-h-[calc(100vh-6rem)]">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MainPanel;
