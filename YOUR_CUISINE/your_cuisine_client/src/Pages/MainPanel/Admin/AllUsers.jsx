import { useContext, useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { AuthContext } from "../../../providers/AuthProvider";
const categories = [
  "supreme",
  "admin",
  "chef",
  "staff",
  "delivery man",
  "waiter",
  "user",
];

const AllUsers = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const [users, setUser] = useState([]);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  // console.log(user);

  useEffect(() => {
    axiosPublic
      .get("/user", {
        headers: {
          jwttoken: `Bearer ${localStorage.getItem("jwttoken")}`,
        },
      })
      .then((res) => {
        // console.log(res.data);
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err.status);
        if (err) {
          console.log(err);
          console.log("in all users");

          signOutUser();
          navigate("/login");
        }
      });
  }, []);

  const handleRoleChange = (userId, newRole) => {
    // Optional: confirm before changing
    console.log(userId, newRole);
    // console.log(users);
    console.log(user);

    if (user.nowData.role !== "admin" && user.nowData.role !== "supreme") {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: `Your can't do this`,
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    if (
      user.nowData.role === "admin" &&
      (userId.uid === user.uid || newRole === "admin" || newRole === "supreme")
    ) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: `Your can't do this`,
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    const confirmChange = window.confirm(
      `Are you sure you want to change role to "${newRole}"?`
    );
    if (!confirmChange) return;

    axiosPublic
      .patch(`/user/admin/${userId._id}`, {
        role: newRole, // newRole is the value from <select>
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.modifiedCount > 0) {
          setUser((prevUsers) =>
            prevUsers.map((u) =>
              u._id === userId._id ? { ...u, role: newRole } : u
            )
          );
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${userId.name}'s role changed to ${newRole}`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((err) => {
        console.error(err?.response?.status || err.message);
        signOutUser();
        navigate("/login");
      });
  };

  const handleDeleteUser = (id) => {
    console.log(id);

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // console.log(id);
        // setLoading(!loading);
        axiosPublic
          .delete(`/user/${id}`, {
            headers: {
              jwttoken: `Bearer ${localStorage.getItem("jwttoken")}`,
            },
          })
          .then((res) => {
            console.log(res.data);

            if (res.data.deletedCount > 0) {
              console.log("parchi mama");

              const updatedUsers = users.filter((user) => user._id !== id);
              setUser(updatedUsers);

              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
            }
          })
          .catch((error) => {
            // Handle error
            console.error(error);
          });
      }
    });
  };

  const [selectedCategory, setSelectedCategory] = useState("admin");

  const filteredUsers = users.filter(
    (current) => current.role === selectedCategory
  );
  const rowColors = [
    "bg-[#f6f3e3]",
    "bg-[#e9efe9]",
    "bg-[#f1f0ec]",
    "bg-[#ebf4f1]",
    "bg-[#f3ede9]",
  ];

  return (
    <div>
      <div className="flex flex-col justify-between text-[#bcaf87] items-center mb-6">
        <h2 className="text-3xl font-semibold">All Users and Members</h2>
      </div>

      {/* Always column layout */}
      <div className="flex flex-col gap-4">
        {/* Sidebar */}
        <div className="rounded-lg w-full shadow mx-auto">
          <h2 className="text-xl font-bold mb-4 text-[#bcaf87] text-center">
            Roles
          </h2>
          <ul className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <li
                key={category}
                className={`cursor-pointer px-4 py-2 rounded-lg text-sm font-medium ${
                  selectedCategory === category
                    ? "bg-[#bcaf87] text-[#07252d]"
                    : "bg-[#07252d] text-[#bcaf87] border border-[#bcaf87] hover:bg-[#bcaf87] hover:text-[#07252d] transition duration-300"
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </li>
            ))}
          </ul>
        </div>

        <div className="p-4 rounded-lg shadow w-full bg-[#bcaf87] text-[#07252d]">
          <h2 className="text-2xl font-semibold mb-4">
            Users in role:{" "}
            <span className="text-[#07252d]">{selectedCategory}</span>
          </h2>

          {filteredUsers.length > 0 ? (
            // <div className="overflow-x-auto">
            //   <table className="table w-full text-sm text-left ">
            //     <thead className="text-xs text-[#bcaf87] uppercase bg-[#07252d]">
            //       <tr>
            //         <th className="px-4 py-3">#</th>
            //         <th className="px-4 py-3">Name</th>
            //         <th className="px-4 py-3">Email</th>
            //         <th className="px-4 py-3">Role</th>
            //         <th className="px-4 py-3">Action</th>
            //       </tr>
            //     </thead>
            //     <tbody>
            //       {filteredUsers.map((current, index) => (
            //         <tr
            //           key={current._id}
            //           className="border-b hover:bg-[#07252d] hover:text-[#bcaf87] transition duration-150"
            //         >
            //           <th className="px-4 py-2 font-medium text-gray-800">
            //             {index + 1}
            //           </th>
            //           <td className="px-4 py-2">{current.name}</td>
            //           <td className="px-4 py-2">{current.email}</td>
            //           <td className="px-4 py-2">
            //             <select
            //               value={current.role}
            //               onChange={(e) =>
            //                 handleRoleChange(current, e.target.value)
            //               }
            //               className="w-full max-w-xs px-3 py-2 rounded-md border border-[#bcaf87] bg-[#07252d] text-[#bcaf87]
            //  focus:outline-none focus:ring-2 focus:ring-[#bcaf87] focus:border-[#bcaf87] transition"
            //             >
            //               {categories.map((roleOption) => (
            //                 <option
            //                   key={roleOption}
            //                   value={roleOption}
            //                   style={{
            //                     ":hover": { backgroundColor: "#bcaf87" },
            //                   }}
            //                 >
            //                   {roleOption.charAt(0).toUpperCase() +
            //                     roleOption.slice(1)}
            //                 </option>
            //               ))}
            //             </select>
            //           </td>

            //           <td className="px-4 py-2">
            //             <button
            //               onClick={() => handleDeleteUser(current._id)}
            //               className="p-2 rounded-full border-2 text-[#bcaf87] bg-[#07252d] hover:bg-[#bcaf87] hover:text-[#07252d] border-2 border-[#07252d] transition duration-200"
            //             >
            //               <RiDeleteBin6Line className="text-xl" />
            //             </button>
            //           </td>
            //         </tr>
            //       ))}
            //     </tbody>
            //   </table>
            // </div>
            <div>
              {/* Table view for medium and larger screens */}
              <div className="overflow-x-auto hidden md:block">
                <table className="table w-full text-sm text-left">
                  <thead className="text-xs  text-[#bcaf87] uppercase bg-[#07252d]">
                    <tr className="">
                      <th className="px-4 py-3 ">#</th>
                      <th className="px-4 py-3">Name</th>
                      <th className="px-4 py-3">Email</th>
                      <th className="px-4 py-3">Role</th>
                      <th className="px-4 py-3">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((current, index) => (
                      <tr
                        key={current._id}
                        className=" hover:bg-[#07252d] hover:text-[#bcaf87] transition duration-500"
                      >
                        <th className="px-4 py-2 border-b border-[#07252d] font-medium text-[#07252d]">
                          {index + 1}
                        </th>
                        <td className="px-4 py-2 border-b border-[#07252d]">
                          {current.name}
                        </td>
                        <td className="px-4 py-2 border-b border-[#07252d]">
                          {current.email}
                        </td>
                        <td className="px-4 py-2 border-b border-[#07252d]">
                          <select
                            value={current.role}
                            onChange={(e) =>
                              handleRoleChange(current, e.target.value)
                            }
                            className="w-full max-w-xs px-3 py-2 rounded-md border border-[#bcaf87] bg-[#07252d] text-[#bcaf87] 
                focus:outline-none focus:ring-2 focus:ring-[#bcaf87] focus:border-[#bcaf87] transition"
                          >
                            {categories.map((roleOption) => (
                              <option key={roleOption} value={roleOption}>
                                {roleOption.charAt(0).toUpperCase() +
                                  roleOption.slice(1)}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="px-4 py-2 border-b border-[#07252d]">
                          <button
                            onClick={() => handleDeleteUser(current._id)}
                            className="p-2 rounded-full border-2 text-[#bcaf87] bg-[#07252d] hover:bg-[#bcaf87] hover:text-[#07252d] border-2 border-[#07252d] transition duration-200"
                          >
                            <RiDeleteBin6Line className="text-xl" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Card layout for small screens */}
              <div className="block md:hidden space-y-4">
                {filteredUsers.map((current, index) => (
                  <div
                    key={current._id}
                    className="bg-[#07252d]  text-[#bcaf87] rounded-lg shadow p-4 space-y-2"
                  >
                    <div className="text-sm font-semibold">#{index + 1}</div>
                    <div>
                      <span className="font-medium">Name:</span> {current.name}
                    </div>
                    <div>
                      <span className="font-medium">Email:</span>{" "}
                      {current.email}
                    </div>
                    <div>
                      <span className="font-medium">Role:</span>
                      <select
                        value={current.role}
                        onChange={(e) =>
                          handleRoleChange(current, e.target.value)
                        }
                        className="mt-1 w-full px-3 py-2 rounded-md border border-[#bcaf87] bg-[#07252d] text-[#bcaf87] focus:outline-none focus:ring-2 focus:ring-[#bcaf87] focus:border-[#bcaf87] transition"
                      >
                        {categories.map((roleOption) => (
                          <option key={roleOption} value={roleOption}>
                            {roleOption.charAt(0).toUpperCase() +
                              roleOption.slice(1)}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <button
                        onClick={() => handleDeleteUser(current._id)}
                        className="mt-2 p-2 rounded-full border-2 text-[#bcaf87] bg-[#07252d] hover:bg-[#bcaf87] hover:text-[#07252d] border-[#bcaf87] transition duration-200"
                      >
                        <RiDeleteBin6Line className="text-xl" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-bg-[#07252d]">No users found for this role.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
