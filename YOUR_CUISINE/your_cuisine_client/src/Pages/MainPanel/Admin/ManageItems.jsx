import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useMenu from "../../../Hooks/useMenu";
import SectionTitle from "../../Share/SectionTitle";

const ManageItems = () => {
  const [menu, loading, setLoading] = useMenu();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const handleDeleteItem = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        // console.log('====================================');
        // console.log(id);
        // console.log('====================================');
        axiosPublic
          .delete(`/menu/${id}`, {
            headers: {
              jwttoken: `Bearer ${localStorage.getItem("jwttoken")}`,
            },
          })
          .then((res) => {
            console.log(res.data);

            if (res.data.deletedCount > 0) {
              console.log("parchi mama");
              setLoading(true);
              //   const updatedUsers = users.filter((user) => user._id !== id);
              //   setUser(updatedUsers);

              Swal.fire({
                title: "Deleted!",
                text: "Your Menu has been deleted.",
                icon: "success",
              });
            }
          })
          .catch((error) => {
            // Handle error
            console.error(error);
          });
        // const res = await axiosSecure.delete(`/menu/${item._id}`);
        // // console.log(res.data);
        // if (res.data.deletedCount > 0) {
        //   // refetch to update the ui
        //   refetch();
        //   Swal.fire({
        //     position: "top-end",
        //     icon: "success",
        //     title: `${item.name} has been deleted`,
        //     showConfirmButton: false,
        //     timer: 1500,
        //   });
        // }
      }
    });
  };

  return (
    <div>
      <SectionTitle
        heading="Manage All Items"
        subHeading="Hurry up"
      ></SectionTitle>
      <div>
        <div className="overflow-x-auto">
          <table className="table w-full">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Item Name</th>
                <th>Price</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {menu.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={item.image}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{item.name}</td>
                  <td className="text-right">${item.price}</td>
                  <td>
                    <Link to={`/mainpanel/updateItem/${item._id}`}>
                      <button className="btn btn-ghost btn-lg bg-orange-500">
                        <FaEdit
                          className="text-white 
                                        "
                        ></FaEdit>
                      </button>
                    </Link>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDeleteItem(item._id)}
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
    </div>
  );
};

export default ManageItems;
