import { FaBook, FaDollarSign, FaUsers } from "react-icons/fa";
import { MdOutlinePayment } from "react-icons/md";
import { useContext, useEffect, useState } from "react";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { AuthContext } from "../../../providers/AuthProvider";

const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red", "pink"];
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Dashboard = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState([]);
  useEffect(() => {
    axiosPublic
      .get("/admin-data", {
        headers: {
          jwttoken: `Bearer ${localStorage.getItem("jwttoken")}`,
        },
      })
      .then((res) => {
        // console.log(res.data);
        setStats(res.data);
      });
  }, []);

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl sm:text-3xl font-semibold pt-6 pb-6 text-center ">
        Welcome {user?.displayName || "Back"}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-[#07252d]">
        {/* Revenue */}
        <div className="bg-[#bcaf87] backdrop-blur-lg border  rounded-xl p-5 shadow-sm text-center hover:shadow-md transition">
          <div className="flex justify-center mb-2">
            <FaDollarSign className="text-[#07252d] text-3xl" />
          </div>
          <h3 className="text-sm  font-medium mb-1">Revenue</h3>
          <p className="text-2xl font-bold ">${stats.revenue}</p>
        </div>

        {/* Users */}
        <div className="bg-[#bcaf87] backdrop-blur-lg border  rounded-xl p-5 shadow-sm text-center hover:shadow-md transition">
          <div className="flex justify-center mb-2">
            <FaUsers className=" text-3xl" />
          </div>
          <h3 className="text-sm  font-medium mb-1">Users</h3>
          <p className="text-2xl font-bold ">{stats.users}</p>
        </div>

        {/* Menu Items */}
        <div className="bg-[#bcaf87] backdrop-blur-lg border  rounded-xl p-5 shadow-sm text-center hover:shadow-md transition">
          <div className="flex justify-center mb-2">
            <FaBook className=" text-3xl" />
          </div>
          <h3 className="text-sm  font-medium mb-1">Menu Items</h3>
          <p className="text-2xl font-bold ">{stats.menus}</p>
        </div>

        {/* Payments */}
        <div className="bg-[#bcaf87] backdrop-blur-lg border  rounded-xl p-5 shadow-sm text-center hover:shadow-md transition">
          <div className="flex justify-center mb-2">
            <MdOutlinePayment className=" text-3xl" />
          </div>
          <h3 className="text-sm  font-medium mb-1">Payments</h3>
          <p className="text-2xl font-bold ">{stats.payments}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
