import { useContext, useEffect, useState } from "react";
import {
  FaAd,
  FaHome,
  FaList,
  FaSearch,
  FaShoppingCart,
  FaUsers,
  FaUtensils,
} from "react-icons/fa";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { AuthContext } from "../providers/AuthProvider";
const MainPanel = () => {
  const { carts, user, signOutUser } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    // currentUser.uid
    axiosPublic
      .get(`/user/${user.uid}`, {
        headers: {
          jwttoken: `Bearer ${localStorage.getItem("jwttoken")}`,
        },
      })
      .then((res) => {
        // console.log(res.data.role);
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
  return (
    <div className=" mx-auto">
      {/* <Navbar></Navbar> */}
      <div className="flex">
        {/* mainpanel side bar */}
        <div className="w-64 min-h-screen bg-white text-black">
          <ul className="menu p-4">
            {role === "admin" ? (
              <>
                <li>
                  <NavLink to="/mainpanel/dashboard">
                    <FaHome></FaHome>
                    Admin Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/mainpanel/addItems">
                    <FaUtensils></FaUtensils>
                    Add Items
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/mainpanel/manageItems">
                    <FaList></FaList>
                    Manage Items
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/mainpanel/users">
                    <FaUsers></FaUsers>
                    All Users
                  </NavLink>
                </li>
              </>
            ) : role === "cafe" ? (
              <>
                <li>
                  <NavLink to="/mainpanel/cafe-dashboard">
                    <FaHome /> Cafe Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/mainpanel/cafe-orders">
                    <FaList /> Cafe Orders
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/mainpanel/cafe-menu">
                    <FaUtensils /> Manage Cafe Menu
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink to="/mainpanel/profile">
                    <FaHome></FaHome>
                    User Home
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/mainpanel/cart">
                    <FaShoppingCart></FaShoppingCart>
                    My Cart ({carts.length})
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/mainpanel/review">
                    <FaAd></FaAd>
                    Add a Review
                  </NavLink>
                </li>
              </>
            )}
            {/* shared nav links */}
            <div className="divider"></div>
            <li>
              <NavLink to="/">
                <FaHome></FaHome>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/menu">
                <FaSearch></FaSearch>
                Menu
              </NavLink>
            </li>
          </ul>
        </div>
        {/* mainpanel content */}
        <div className="flex-1 p-8">
          <Outlet></Outlet>
        </div>
      </div>
      {/* <Footer></Footer> */}
    </div>
  );
};

export default MainPanel;
