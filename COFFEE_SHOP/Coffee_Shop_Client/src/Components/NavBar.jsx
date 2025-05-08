import React from "react";
import { Link } from "react-router-dom";
export const NavBar = () => {
  return (
    <div>
      <div className="flex justify-between  ">
        <Link className="bg-black text-white px-4 py-2 rounded">
          LOGO
        </Link>
        <div className="flex gap-8">
          <Link to="/" className="bg-black text-white px-4 py-2 rounded">
            HOME
          </Link>
          <Link to="/addcoffee" className="bg-black text-white px-4 py-2 rounded">
            Add Coffee
          </Link>
          <Link to="/users" className="bg-black text-white px-4 py-2 rounded">
            Active Users
          </Link>
        </div>
        <Link className="bg-black text-white px-4 py-2 rounded">
          USER
        </Link>
      </div>
    </div>
  );
};
