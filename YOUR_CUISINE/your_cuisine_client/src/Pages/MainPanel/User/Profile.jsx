import { format } from "date-fns";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { AuthContext } from "../../../providers/AuthProvider";

const Profile = () => {
  const navigate = useNavigate();

  const [payments, setPayments] = useState([]);
  const axiosPublic = useAxiosPublic();
  const { user, signOutUser, setCarts, setUser } = useContext(AuthContext);

  useEffect(() => {
    if (!user?.uid) return; // wait until user is loaded

    axiosPublic
      .get(`/payment/${user.uid}`, {
        headers: {
          jwttoken: `Bearer ${localStorage.getItem("jwttoken")}`,
        },
      })
      .then((res) => {
        // console.log(res.data);

        setPayments(res.data);
      })
      .catch((err) => {
        console.log("Error fetching payments:", err);
      });
  }, [user?.uid, axiosPublic]);
  const handleSignOut = () => {
    signOutUser();
    setCarts([]);
    setUser(null);
    navigate("/");
  };
  return (
    //   <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-lg mt-10">
    //     <div className="flex flex-col md:flex-row items-center gap-6">
    //       <img
    //         src={user.photoURL}
    //         alt="Profile"
    //         className="w-32 h-32 rounded-full object-cover ring-2 ring-green-500"
    //       />
    //       <div className="text-center md:text-left">
    //         <h2 className="text-2xl font-bold text-gray-800">
    //           {user.displayName}
    //         </h2>
    //         <p className="text-gray-600">{user.email}</p>
    //       </div>
    //     </div>

    //     <div className="mt-8">
    //       <h3 className="text-xl font-semibold text-gray-800 mb-4">
    //         Recent Orders
    //       </h3>
    //       <ul className="space-y-3">
    //         {payments?.map((order) => (
    //           <li
    //             key={order._id}
    //             className="p-4 bg-gray-100 rounded-lg flex justify-between items-center"
    //           >
    //             <div>
    //               <p className="font-medium text-black">
    //                 {order.carts.length} Items
    //               </p>
    //               <p className="text-sm text-gray-500">
    //                 {/* {order.date} */}
    //                 {format(order.date, "MMMM dd, yyyy")}
    //               </p>
    //               <p className="text-sm text-gray-500">Payment ID: {order._id}</p>
    //             </div>
    //             <span
    //               className={`px-3 py-1 text-sm rounded-full
    //   ${
    //     order.status === "Delivered"
    //       ? "bg-green-200 text-green-800"
    //       : order.status === "On The Way"
    //       ? "bg-yellow-200 text-yellow-800"
    //       : order.status === "On The Kitchen"
    //       ? "bg-blue-200 text-blue-800"
    //       : order.status === "On the Queue"
    //       ? "bg-orange-200 text-orange-800"
    //       : order.status === "Cancel"
    //       ? "bg-red-200 text-red-800"
    //       : "bg-red-200 text-red-800"
    //   }
    // `}
    //             >
    //               {order.status}
    //             </span>
    //           </li>
    //         ))}
    //       </ul>
    //     </div>

    //     <div className="mt-8 flex justify-end">
    //       <button
    //         onClick={() => {
    //           handleSignOut();
    //         }}
    //         className="bg-red-500 cursor-pointer text-white px-5 py-2 rounded-xl hover:bg-red-600 transition"
    //       >
    //         Logout
    //       </button>
    //     </div>
    //   </div>
    <div className="max-w-5xl mx-auto px-4 py-8 sm:px-6 lg:px-8 mt-10 bg-[#bcaf87] text-[#07252d] rounded-2xl shadow-lg">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        <img
          src={user.photoURL}
          alt="Profile"
          className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover ring-2 ring-[#07252d]"
        />
        <div className="text-center md:text-left space-y-1">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
            {user.displayName}
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">{user.email}</p>
        </div>
      </div>

      {/* Orders */}
      <div className="mt-10">
        <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-5">
          Recent Orders
        </h3>
        <ul className="space-y-4">
          {payments.map((order) => (
            <li
              key={order._id}
              className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 bg-[#07252d] rounded-lg shadow-sm"
            >
              <div className="space-y-1">
                <p className="text-base font-medium text-[#bcaf87]">
                  {order.carts.length} Item{order.carts.length > 1 && "s"}
                </p>
                <p className="text-sm text-[#bcaf87]">
                  {format(order.date, "MMMM dd, yyyy")}
                </p>
                <p className="text-sm text-[#bcaf87]">
                  Payment ID: {order._id}
                </p>
              </div>
              <div className="mt-3 sm:mt-0">
                <span
                  className={`inline-block px-4 py-1 text-sm font-medium rounded-full
                  ${
                    order.status === "Delivered"
                      ? "bg-green-100 text-green-700"
                      : order.status === "On The Way"
                      ? "bg-yellow-100 text-yellow-700"
                      : order.status === "On The Kitchen"
                      ? "bg-blue-100 text-blue-700"
                      : order.status === "On the Queue"
                      ? "bg-orange-100 text-orange-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {order.status}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Logout */}
      <div className="mt-10 flex justify-center md:justify-end">
        <button
          onClick={handleSignOut}
          className="bg-red-500 hover:bg-red-600 text-white font-medium px-6 py-2 rounded-lg transition duration-200"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
