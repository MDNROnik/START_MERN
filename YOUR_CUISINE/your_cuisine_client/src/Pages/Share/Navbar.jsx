import axios from "axios";
import { useContext, useEffect } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
const Navbar = () => {
  const { user, signOutUser, loading, carts, setCarts } =
    useContext(AuthContext);
  // console.log(user);

  useEffect(() => {
    // console.log("hit ");

    if (user && user.uid) {
      // console.log("hit 2");
      axios
        .get("http://localhost:5000/cart", {
          params: { userId: user.uid, status: "active" },
        })
        .then((res) => setCarts(res.data))
        .catch((err) => console.error(err));
    } else {
      setCarts();
    }
  }, [user, loading]);

  // console.log(cart?.length);

  return (
    <>
      <div className="navbar fixed z-10  max-w-screen-xl bg-black/30 text-white">
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
                <Link to="/mainpanel/cart">
                  <button className="btn">
                    <FaShoppingCart className="mr-2"></FaShoppingCart>
                    <div className="badge badge-secondary">
                      +{carts?.length || 0}
                    </div>
                  </button>
                </Link>
              </li>
            </ul>
          </div>
          <a className="btn btn-ghost normal-case text-xl">YOUR CUISINE</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
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
              <Link to="/mainpanel/cart">
                <button className="btn">
                  <FaShoppingCart className="mr-2"></FaShoppingCart>
                  <div className="badge badge-secondary">
                    +{carts?.length || 0}
                  </div>
                </button>
              </Link>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <ul className="menu menu-horizontal px-1">
            {user ? (
              <>
                <li>{user?.displayName}</li>
                <li>
                  <Link
                    onClick={() => {
                      signOutUser();
                    }}
                  >
                    Log Out
                  </Link>
                </li>
              </>
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
