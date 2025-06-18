import { useContext, useEffect } from "react";
import { FaBowlFood } from "react-icons/fa6";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { AuthContext } from "../../providers/AuthProvider";
import MainLogo from "./MainLogo";
const Navbar = () => {
  const { user, signOutUser, loading, carts, setCarts } =
    useContext(AuthContext);
  // console.log(user);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    if (user && user.uid) {
      axiosPublic
        .get("/cart", {
          params: { userId: user.uid, status: "active" },
        })
        .then((res) => setCarts(res.data))
        .catch((err) => console.error(err));
    } else {
      setCarts([]);
    }
  }, [user, loading]);

  const handleSignOut = () => {
    signOutUser();
    setCarts([]);
  };

  return (
    <>
      <div className="navbar fixed top-0 w-full z-50   bg-black/30 text-white">
        <div className="navbar-start ">
          {/* Mobile View */}
          <div className="dropdown">
            <label
              tabIndex={0}
              className="btn btn-ghost lg:hidden bg-[#bcaf87]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="4"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-[#07252d] text-[#bcaf87] rounded-box w-52"
            >
              <li>
                <Link to="/menu">Our Menu</Link>
              </li>
              <li>
                <Link to={`/order/0`}>Order Food</Link>
              </li>
            </ul>
          </div>

          {/* Desktop View */}
          <div className="navbar-start hidden lg:flex ">
            <ul className="menu menu-horizontal ">
              <div className="flex items-center gap-4">
                <li>
                  <Link to="/menu">Our Menu</Link>
                </li>
                <li>
                  <Link to={`/order/0`}>Order Food</Link>
                </li>
              </div>
            </ul>
          </div>
        </div>

        <div className="navbar-center ">
          <Link className="flex items-center text-xl" to="/">
            <MainLogo></MainLogo>
            <div className="hover:bg-[#07252d] p-2 rounded transition duration-300">
              {" "}
              YOUR CUISINE{" "}
            </div>
          </Link>
        </div>

        {/* User Profile and Logout */}

        <div className="navbar-end text-lg ">
          {user ? (
            <div className="flex items-center gap-2">
              <Link
                to="/mainpanel/cart"
                className="bg-[#07252d] p-2 rounded-2xl"
              >
                <button className="flex items-center  gap-2 cursor-pointer">
                  <FaBowlFood className="mr-2 text-[#bcaf87]"></FaBowlFood>
                  <div className="badge bg-[#bcaf87] text-[#07252d]">
                    +{carts?.length || 0}
                  </div>
                </button>
              </Link>
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img alt={user?.displayName} src={user?.photoURL} />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm bg-[#07252d] text-[#bcaf87] dropdown-content rounded-box z-1 mt-3 w-52 p-2 shadow"
                >
                  {user ? (
                    <div className="flex flex-col items-center gap-2">
                      <li>
                        <Link to="/mainpanel/profile">{user?.displayName}</Link>
                      </li>

                      {/* to="/mainpanel/profile" */}
                      <li>
                        <Link
                          onClick={() => {
                            handleSignOut();
                          }}
                        >
                          Log Out
                        </Link>
                      </li>
                    </div>
                  ) : (
                    <></>
                  )}
                </ul>
              </div>
            </div>
          ) : (
            <>
              <div>
                <Link to="/login">Login</Link>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
