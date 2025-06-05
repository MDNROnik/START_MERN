import axios from "axios";
import { useContext, useEffect, useState } from "react";
import {
  FaAd,
  FaBook,
  FaCalendar,
  FaEnvelope,
  FaHome,
  FaList,
  FaSearch,
  FaShoppingCart,
  FaUsers,
  FaUtensils,
} from "react-icons/fa";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
const MainPanel = () => {
  const { carts, user, signOutUser } = useContext(AuthContext);
  // let isAdmin = false;
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    // currentUser.uid
    axios
      .get(`http://localhost:5000/user/${user.uid}`, {
        headers: {
          jwttoken: `Bearer ${localStorage.getItem("jwttoken")}`,
        },
      })
      .then((res) => {
        console.log(res.data.role);
        if (res.data?.role == "admin") {
          setIsAdmin(true);
          // console.log("2222");
        } else {
          // console.log("1111");
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
  }, [isAdmin]);
  return (
    <div className="max-w-screen-xl mx-auto">
      {/* <Navbar></Navbar> */}
      <div className="flex">
        {/* mainpanel side bar */}
        <div className="w-64 min-h-screen bg-white text-black">
          <ul className="menu p-4">
            {isAdmin ? (
              <>
                <li>
                  <NavLink to="/mainpanel/adminHome">
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
                  <NavLink to="/mainpanel/bookings">
                    <FaBook></FaBook>
                    Manage Bookings
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/mainpanel/users">
                    <FaUsers></FaUsers>
                    All Users
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink to="/mainpanel/userHome">
                    <FaHome></FaHome>
                    User Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/mainpanel/history">
                    <FaCalendar></FaCalendar>
                    Not History
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
                <li>
                  <NavLink to="/mainpanel/paymentHistory">
                    <FaList></FaList>
                    Real Payment History
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
              <NavLink to="/order/salad">
                <FaSearch></FaSearch>
                Menu
              </NavLink>
            </li>
            <li>
              <NavLink to="/order/contact">
                <FaEnvelope></FaEnvelope>
                Contact
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
