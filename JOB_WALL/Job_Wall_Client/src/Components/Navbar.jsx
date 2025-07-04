import axios from "axios";
import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo.jpg";
import { AuthContext } from "../Contexts/AuthProvider";
const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        console.log("sign out successful");
        axios
          .post(
            "http://localhost:5000/logoutJwt",
            {},
            { withCredentials: true }
          )
          .then((data) => {
            console.log(data);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
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
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/alljobs">All Jobs</NavLink>
            </li>
            <li>
              <NavLink to="/myjobs">MyJobs</NavLink>
            </li>
            <li>
              <NavLink to="/addjob">Add Job</NavLink>
            </li>
          </ul>
        </div>
        <NavLink to="/" className="btn btn-ghost text-xl">
          <img className="w-12" src={logo} alt="" />
          <h3 className="text-3xl">Job Portal</h3>
        </NavLink>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/alljobs">All Jobs</NavLink>
          </li>
          <li>
            <NavLink to="/myjobs">MyJobs</NavLink>
          </li>
          <li>
            <NavLink to="/addjob">Add Job</NavLink>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <>
            <Link to="/userinfo">
              <button className="btn">{user.email}</button>
            </Link>
            <button onClick={handleSignOut} className="btn">
              Sign out
            </button>
          </>
        ) : (
          <>
            <Link to="/register">Register</Link>
            <Link to="/signin">
              <button className="btn">Sign In</button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
