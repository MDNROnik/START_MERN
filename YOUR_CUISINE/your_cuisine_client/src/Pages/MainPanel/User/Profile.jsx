import { format } from "date-fns";
import { useContext, useEffect, useState } from "react";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { AuthContext } from "../../../providers/AuthProvider";
const Profile = () => {
  const [payments, setPayments] = useState([]);
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);
  const userT = {
    name: "Rahim Uddin",
    email: "rahim@example.com",
    address: "123 Main Street, Dhaka",
    profileImage: "https://i.pravatar.cc/150?img=3",
    recentOrders: [
      {
        id: 1,
        item: "Chicken Biryani",
        date: "June 16, 2025",
        status: "Delivered",
      },
      {
        id: 2,
        item: "Beef Burger",
        date: "June 14, 2025",
        status: "On the way",
      },
    ],
  };
  useEffect(() => {
    if (!user?.uid) return; // wait until user is loaded

    axiosPublic
      .get(`/payment/${user.uid}`, {
        headers: {
          jwttoken: `Bearer ${localStorage.getItem("jwttoken")}`,
        },
      })
      .then((res) => {
        console.log(res.data);

        setPayments(res.data);
      })
      .catch((err) => {
        console.log("Error fetching payments:", err);
      });
  }, [user?.uid, axiosPublic]);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-lg mt-10">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <img
          src={user.photoURL}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover ring-2 ring-green-500"
        />
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold text-gray-800">
            {user.displayName}
          </h2>
          <p className="text-gray-600">{user.email}</p>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Recent Orders
        </h3>
        <ul className="space-y-3">
          {payments?.map((order) => (
            <li
              key={order._id}
              className="p-4 bg-gray-100 rounded-lg flex justify-between items-center"
            >
              <div>
                <p className="font-medium text-black">
                  {order.carts.length} Items
                </p>
                <p className="text-sm text-gray-500">
                  {/* {order.date} */}
                  {format(order.date, "MMMM dd, yyyy")}
                </p>
              </div>
              <span
                className={`px-3 py-1 text-sm rounded-full
    ${
      order.status === "Delivered"
        ? "bg-green-200 text-green-800"
        : order.status === "On The Way"
        ? "bg-yellow-200 text-yellow-800"
        : order.status === "On The Kitchen"
        ? "bg-blue-200 text-blue-800"
        : order.status === "On the Queue"
        ? "bg-orange-200 text-orange-800"
        : order.status === "Cancel"
        ? "bg-red-200 text-red-800"
        : "bg-red-200 text-red-800"
    }
  `}
              >
                {order.status}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8 flex justify-end">
        <button className="bg-red-500 text-white px-5 py-2 rounded-xl hover:bg-red-600 transition">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
