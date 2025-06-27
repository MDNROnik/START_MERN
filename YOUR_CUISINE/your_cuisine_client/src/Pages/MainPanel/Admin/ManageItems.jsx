import { useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useMenu from "../../../Hooks/useMenu";
import SectionTitle from "../../Share/SectionTitle";
const categories = ["breakfast", "lunch", "dinner", "dessert", "drinks"];

const ManageItems = () => {
  const [menu, loading, setLoading] = useMenu();
  const [selectedCategory, setSelectedCategory] = useState("breakfast");
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

              Swal.fire({
                title: "Deleted!",
                text: "Item has been deleted.",
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
  const filteredItems = menu.filter(
    (item) => item.category === selectedCategory
  );

  return (
    // <div>
    //   <SectionTitle
    //     heading="Manage All Items"
    //     subHeading="Hurry up"
    //   ></SectionTitle>
    //   <div>
    //     <div className="overflow-x-auto">
    //       <table className="table w-full">
    //         {/* head */}
    //         <thead>
    //           <tr>
    //             <th>#</th>
    //             <th>Image</th>
    //             <th>Item Name</th>
    //             <th>Price</th>
    //             <th>Update</th>
    //             <th>Delete</th>
    //           </tr>
    //         </thead>
    //         <tbody>
    //           {menu.map((item, index) => (
    //             <tr key={item._id}>
    //               <td>{index + 1}</td>
    //               <td>
    //                 <div className="flex items-center gap-3">
    //                   <div className="avatar">
    //                     <div className="mask mask-squircle w-12 h-12">
    //                       <img
    //                         src={item.image}
    //                         alt="Avatar Tailwind CSS Component"
    //                       />
    //                     </div>
    //                   </div>
    //                 </div>
    //               </td>
    //               <td>{item.name}</td>
    //               <td className="text-right">${item.price}</td>
    //               <td>
    //                 <Link to={`/mainpanel/manageItems/updateItem/${item._id}`}>
    //                   <button className="btn btn-ghost btn-lg bg-orange-500">
    //                     <FaEdit
    //                       className="text-white
    //                                     "
    //                     ></FaEdit>
    //                   </button>
    //                 </Link>
    //               </td>
    //               <td>
    //                 <button
    //                   onClick={() => handleDeleteItem(item._id)}
    //                   className="btn btn-ghost btn-lg"
    //                 >
    //                   <FaTrashAlt className="text-red-600"></FaTrashAlt>
    //                 </button>
    //               </td>
    //             </tr>
    //           ))}
    //         </tbody>
    //       </table>
    //     </div>
    //   </div>
    // </div>
    <div>
      <SectionTitle heading="Manage All Items" subHeading="Hurry up" />

      {/* Category Filter Buttons */}
      <div className="rounded-lg w-full shadow mx-auto mb-6">
        <h2 className="text-xl font-bold mb-4 text-center text-[#bcaf87]">
          Categories
        </h2>
        <ul className="flex flex-wrap gap-2 justify-center">
          {categories.map((category) => (
            <li
              key={category}
              className={`cursor-pointer px-4 py-2 rounded-lg text-sm font-medium ${
                selectedCategory === category
                  ? "bg-[#bcaf87] text-[#07252d]"
                  : "bg-[#07252d] text-[#bcaf87] border hover:bg-[#bcaf87] hover:text-[#07252d] transition duration-300"
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </li>
          ))}
        </ul>
      </div>

      {/* Item Table */}
      <div className="p-4 rounded-lg shadow w-full bg-[#bcaf87] text-[#07252d]">
        <h2 className="text-2xl font-semibold mb-4">
          Items in category:{" "}
          <span className="text-[#07252d]">
            {selectedCategory.charAt(0).toUpperCase() +
              selectedCategory.slice(1)}
          </span>
        </h2>

        {filteredItems.length > 0 ? (
          // <div className="overflow-x-auto">
          //   <table className="table text-sm text-left">
          //     <thead className="text-xs text-[#bcaf87] uppercase bg-[#07252d]">
          //       <tr>
          //         <th className="px-4 py-3">#</th>
          //         <th className="px-4 py-3">Image</th>
          //         <th className="px-4 py-3">Name</th>
          //         <th className="px-4 py-3">Price</th>
          //         <th className="px-4 py-3">Update</th>
          //         <th className="px-4 py-3">Delete</th>
          //       </tr>
          //     </thead>
          //     <tbody>
          //       {filteredItems.map((item, index) => (
          //         <tr
          //           key={item._id}
          //           className="border-b hover:bg-[#07252d] hover:text-[#bcaf87] transition duration-150"
          //         >
          //           <td className="px-4 py-2">{index + 1}</td>
          //           <td className="px-4 py-2">
          //             <img
          //               src={item.image}
          //               alt={item.name}
          //               className="w-12 h-12 rounded object-cover"
          //             />
          //           </td>
          //           <td className="px-4 py-2">{item.name}</td>
          //           <td className="px-4 py-2">${item.price}</td>
          //           <td className="px-4 py-2">
          //             <Link
          //               to={`/mainpanel/manageItems/updateItem/${item._id}`}
          //             >
          //               <button className="btn btn-ghost btn-sm bg-orange-500">
          //                 <FaEdit className="text-white" />
          //               </button>
          //             </Link>
          //           </td>
          //           <td className="px-4 py-2">
          //             <button
          //               onClick={() => handleDeleteItem(item._id)}
          //               className="btn btn-ghost btn-sm"
          //             >
          //               <FaTrashAlt className="text-red-600" />
          //             </button>
          //           </td>
          //         </tr>
          //       ))}
          //     </tbody>
          //   </table>
          // </div>

          <div>
            <div className="hidden md:block text-lg font-semibold overflow-x-auto">
              <table className="table table-fixed w-full text-sm">
                <thead className="bg-[#07252d] text-[#bcaf87]">
                  <tr>
                    <th>#</th>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Update</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.map((item, index) => (
                    <tr key={item._id}>
                      <td>{index + 1}</td>
                      <td>
                        <img src={item.image} className="w-10 h-10" />
                      </td>
                      <td>{item.name}</td>
                      <td>${item.price}</td>
                      <td>
                        <Link
                          to={`/mainpanel/manageItems/updateItem/${item._id}`}
                        >
                          <button className="btn btn-xs bg-orange-500 text-white">
                            <FaEdit />
                          </button>
                        </Link>
                      </td>
                      <td>
                        <button
                          onClick={() => handleDeleteItem(item._id)}
                          className="btn btn-xs"
                        >
                          <FaTrashAlt className="text-red-600" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Card layout for small screens */}
            <div className="block md:hidden space-y-4">
              {filteredItems.map((item, index) => (
                <div
                  key={item._id}
                  className="bg-[#bcaf87] text-[#07252d] p-4 rounded shadow"
                >
                  <div className="flex justify-between mb-2">
                    <span className="font-bold">#{index + 1}</span>
                    <img
                      src={item.image}
                      className="w-12 h-12 object-cover rounded"
                    />
                  </div>
                  <p>
                    <strong>Name:</strong> {item.name}
                  </p>
                  <p>
                    <strong>Price:</strong> ${item.price}
                  </p>
                  <div className="flex justify-between mt-3">
                    <Link to={`/mainpanel/manageItems/updateItem/${item._id}`}>
                      <button className="btn btn-xs bg-orange-500 text-white">
                        <FaEdit />
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDeleteItem(item._id)}
                      className="btn btn-xs"
                    >
                      <FaTrashAlt className="text-red-600" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-[#07252d]">No items found in this category.</p>
        )}
      </div>
    </div>
  );
};

export default ManageItems;
