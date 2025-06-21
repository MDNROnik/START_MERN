import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { AuthContext } from "../../../providers/AuthProvider";
const ChefHome = () => {
  const navigate = useNavigate();
  const { user, signOutUser } = useContext(AuthContext);
  const [payments, setPayments] = useState([]);
  const axiosPublic = useAxiosPublic();
  const handleSignOut = () => {
    signOutUser();
    setCarts([]);
    setUser(null);
    navigate("/");
  };

  console.log(user);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-lg">
      <div className="flex items-center space-x-6">
        <img
          src={user.photoURL}
          alt={user.displayName}
          className="w-32 h-32 rounded-full object-cover shadow"
        />
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Chef {user.displayName}
          </h2>
          <p className="text-gray-500">{user.email}</p>
          {/* <p className="mt-2 text-sm text-gray-700">
            Experience: <span className="font-medium">{chef.experience}</span>
          </p> */}
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Specialties
        </h3>
        {/* <ul className="list-disc list-inside text-gray-700 space-y-1">
          {chef.specialties.map((skill, index) => (
            <li key={index} className="capitalize">
              {skill}
            </li>
          ))}
        </ul> */}
      </div>

      <div className="mt-6 text-right">
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default ChefHome;
