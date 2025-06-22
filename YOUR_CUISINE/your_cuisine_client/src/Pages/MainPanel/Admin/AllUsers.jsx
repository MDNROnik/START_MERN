import { useContext, useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
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
    console.log(users);
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
      (newRole === "admin" || newRole === "supreme")
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

  return (
    // <div>
    //   <div className="flex justify-evenly my-4">
    //     <h2 className="text-3xl">All Users and Members</h2>
    //     {/* <h2 className="text-3xl">Total Users: {users.length}</h2> */}
    //   </div>
    //   {/* <div className="overflow-x-auto">
    //     <table className="table table-zebra w-full">
    //       <thead>
    //         <tr>
    //           <th></th>
    //           <th>Name</th>
    //           <th>Email</th>
    //           <th>Role</th>
    //           <th>Action</th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         {users.map((current, index) => (
    //           <tr key={current._id}>
    //             <th>{index + 1}</th>
    //             <td>{current.name}</td>
    //             <td>{current.email}</td>
    //             <td>
    //               <select
    //                 value={current.role}
    //                 onChange={(e) => handleRoleChange(current, e.target.value)}
    //                 className="select select-bordered w-full max-w-xs"
    //               >
    //                 <option value="supreme">Supreme</option>
    //                 <option value="admin">Admin</option>
    //                 <option value="chef">Chef</option>
    //                 <option value="staff">Staff</option>
    //                 <option value="delivery man">Delivery Man</option>
    //                 <option value="waiter">Waiter</option>
    //                 <option value="user">User</option>
    //               </select>
    //             </td>
    //             <td>
    //               <button
    //                 onClick={() => handleDeleteUser(user._id)}
    //                 className="btn btn-ghost btn-lg"
    //               >
    //                 <FaTrashAlt className="text-red-600"></FaTrashAlt>
    //               </button>
    //             </td>
    //           </tr>
    //         ))}
    //       </tbody>
    //     </table>
    //   </div> */}

    //   {/* test */}
    //   <div>
    //     <div className="grid grid-cols-4 h-screen">
    //       {/* Sidebar */}
    //       <div className="col-span-1 bg-black p-4">
    //         <h2 className="text-xl font-bold mb-4">Roles</h2>
    //         <ul className="space-y-2">
    //           {categories.map((category) => (
    //             <li
    //               key={category}
    //               className={`cursor-pointer p-2 rounded-lg ${
    //                 selectedCategory === category
    //                   ? "bg-blue-500 text-white"
    //                   : "hover:bg-blue-100"
    //               }`}
    //               onClick={() => setSelectedCategory(category)}
    //             >
    //               {category.charAt(0).toUpperCase() + category.slice(1)}
    //             </li>
    //           ))}
    //         </ul>
    //       </div>

    //       {/* User list */}
    //       <div className="col-span-3 p-6">
    //         <h2 className="text-2xl font-semibold mb-4">
    //           Users in role: {selectedCategory}
    //         </h2>
    //         {/* head */}
    //         <div className="overflow-x-auto">
    //           <table className="table table-zebra w-full">
    //             <thead>
    //               <tr>
    //                 <th></th>
    //                 <th>Name</th>
    //                 <th>Email</th>
    //                 <th>Role</th>
    //                 <th>Action</th>
    //               </tr>
    //             </thead>
    //             <tbody>
    //               {filteredUsers.length > 0 ? (
    //                 <ul className="space-y-3">
    //                   {filteredUsers.map((current, index) => (
    //                     <tr key={current._id}>
    //                       <th>{index + 1}</th>
    //                       <td>{current.name}</td>
    //                       <td>{current.email}</td>
    //                       <td>
    //                         <select
    //                           value={current.role}
    //                           onChange={(e) =>
    //                             handleRoleChange(current, e.target.value)
    //                           }
    //                           className="select select-bordered w-full max-w-xs"
    //                         >
    //                           <option value="supreme">Supreme</option>
    //                           <option value="admin">Admin</option>
    //                           <option value="chef">Chef</option>
    //                           <option value="staff">Staff</option>
    //                           <option value="delivery man">Delivery Man</option>
    //                           <option value="waiter">Waiter</option>
    //                           <option value="user">User</option>
    //                         </select>
    //                       </td>
    //                       <td>
    //                         <button
    //                           onClick={() => handleDeleteUser(user._id)}
    //                           className="btn btn-ghost btn-lg"
    //                         >
    //                           <FaTrashAlt className="text-red-600"></FaTrashAlt>
    //                         </button>
    //                       </td>
    //                     </tr>
    //                   ))}
    //                 </ul>
    //               ) : (
    //                 <p className="text-gray-500">
    //                   No users found for this role.
    //                 </p>
    //               )}
    //             </tbody>
    //           </table>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>

    <div className="px-4 py-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold">All Users and Members</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Sidebar */}
        <div className=" p-4 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Roles</h2>
          <ul className="space-y-2">
            {categories.map((category) => (
              <li
                key={category}
                className={`cursor-pointer p-2 rounded-lg text-center md:text-left ${
                  selectedCategory === category
                    ? "bg-blue-500 text-white"
                    : "hover:bg-blue-100"
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </li>
            ))}
          </ul>
        </div>

        {/* User list */}
        <div className="md:col-span-3 p-4  rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">
            Users in role: {selectedCategory}
          </h2>

          {filteredUsers.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((current, index) => (
                    <tr key={current._id} className="">
                      <th>{index + 1}</th>
                      <td>{current.name}</td>
                      <td>{current.email}</td>
                      <td>
                        <select
                          value={current.role}
                          onChange={(e) =>
                            handleRoleChange(current, e.target.value)
                          }
                          className="select select-bordered w-full max-w-xs"
                        >
                          {categories.map((roleOption) => (
                            <option key={roleOption} value={roleOption}>
                              {roleOption.charAt(0).toUpperCase() +
                                roleOption.slice(1)}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td>
                        <button
                          onClick={() => handleDeleteUser(current._id)}
                          className="btn btn-ghost btn-lg"
                        >
                          <FaTrashAlt className="text-red-600" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500">No users found for this role.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
