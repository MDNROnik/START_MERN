import { useContext, useEffect, useState } from "react";
import { FaTrashAlt, FaUsers } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { AuthContext } from "../../../providers/AuthProvider";

const AllUsers = () => {
  const { signOutUser } = useContext(AuthContext);
  const [users, setUser] = useState([]);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  useEffect(() => {
    axiosPublic
      .get("/user", {
        headers: {
          jwttoken: `Bearer ${localStorage.getItem("jwttoken")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
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

  const handleMakeAdmin = (user) => {
    console.log(user);

    axiosPublic.patch(`/user/admin/${user._id}`).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        setUser((prevUsers) =>
          prevUsers.map((u) =>
            u._id === user._id ? { ...u, role: "admin" } : u
          )
        );
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user.name} is an Admin Now!`,
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

  return (
    <div>
      <div className="flex justify-evenly my-4">
        <h2 className="text-3xl">All Users</h2>
        <h2 className="text-3xl">Total Users: {users.length}</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.role === "admin" ? (
                    "Admin"
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user)}
                      className="btn btn-lg bg-orange-500"
                    >
                      <FaUsers
                        className="text-white 
                                        text-2xl"
                      ></FaUsers>
                    </button>
                  )}
                </td>
                <td>
                  <button
                    onClick={() => handleDeleteUser(user._id)}
                    className="btn btn-ghost btn-lg"
                  >
                    <FaTrashAlt className="text-red-600"></FaTrashAlt>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
