import { useContext, useEffect } from "react";
import { FaBowlFood } from "react-icons/fa6";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { AuthContext } from "../../providers/AuthProvider";

const Navbar = () => {
  const { user, signOutUser, loading, carts, setCarts } =
    useContext(AuthContext);
  // console.log(user);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    // console.log("hit ");
    if (user && user.uid) {
      // console.log("hit 2");
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
      <div className="navbar fixed z-10  max-w-screen-xl bg-black text-white">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
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
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/menu">Our Menu</Link>
              </li>
              <li>
                <Link to={`/order/0`}>Order Food</Link>
              </li>

              <li>
                {user ? (
                  <>
                    <Link to="/mainpanel/cart">
                      <button className="btn">
                        <FaBowlFood className="mr-2"></FaBowlFood>
                        <div className="badge badge-secondary">
                          +{carts?.length || 0}
                        </div>
                      </button>
                    </Link>
                  </>
                ) : (
                  <></>
                )}
              </li>
            </ul>
          </div>
          <Link className="btn btn-ghost normal-case text-xl" to="/">
            YOUR CUISINE
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal ">
            <div className="flex items-center gap-4">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/menu">Our Menu</Link>
              </li>
              <li>
                <Link to={`/order/0`}>Order Food</Link>
              </li>
            </div>

            <li>
              {user ? (
                <>
                  <Link to="/mainpanel/cart">
                    <button className="btn">
                      <FaBowlFood className="mr-2"></FaBowlFood>
                      <div className="badge badge-secondary">
                        +{carts?.length || 0}
                      </div>
                    </button>
                  </Link>
                </>
              ) : (
                <></>
              )}
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <ul className="menu menu-horizontal px-1">
            {user ? (
              <div className="flex items-center gap-4">
                <li>{user?.displayName}</li>
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
              <>
                <li>
                  <Link to="/login">Login</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
