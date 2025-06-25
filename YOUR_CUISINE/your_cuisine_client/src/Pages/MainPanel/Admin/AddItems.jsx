import { Listbox } from "@headlessui/react";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaUtensils } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import SectionTitle from "../../Share/SectionTitle";

//how to image host on imgbb
//take api from app button -> api route
// set it on env local file
// import as like firebase apis
// take the url for api work
// set template string url
// send image data from client to hosting server
// that will bring a url for image access

const categories = ["breakfast", "lunch", "dinner", "dessert", "drinks"];

const apiKeyForImgbb = import.meta.env.VITE_apiKeyForImgbb;
const image_api_imgbb_url = `https://api.imgbb.com/1/upload?key=${apiKeyForImgbb}`;
const AddItems = () => {
  const [selected, setSelected] = useState(categories[0]);

  const { register, handleSubmit, reset, watch } = useForm();

  const axiosPublic = useAxiosPublic();
  // const onSubmit = async (data) => {
  //   // console.log(data);
  //   const imageFile = { image: data.image[0] };
  //   const res = await axios.post(image_api_imgbb_url, imageFile, {
  //     headers: {
  //       "content-type": "multipart/form-data",
  //     },
  //   });
  //   // console.log(res.data);

  //   if (res.data.success) {
  //     // now send the menu item data to the server
  //     const menuItem = {
  //       name: data.name,
  //       category: data.category,
  //       price: parseFloat(data.price),
  //       recipe: data.recipe,
  //       image: res.data.data.display_url,
  //     };

  //     await axiosPublic
  //       .post("/menu", menuItem, {
  //         headers: {
  //           jwttoken: `Bearer ${localStorage.getItem("jwttoken")}`,
  //         },
  //       })
  //       .then((res) => {
  //         if (res.data.insertedId) {
  //           console.log("admin added a menu to the database");
  //           reset();
  //           Swal.fire({
  //             position: "top-end",
  //             icon: "success",
  //             title: `${data.name} is added to the menu.`,
  //             showConfirmButton: false,
  //             timer: 1500,
  //           });
  //           // navigate("/");
  //         }
  //       });
  //   }
  //   // console.log("with image url", res.data);
  //   reset();
  // };

  const onSubmit = async (data) => {
    const imageFile = { image: data.image[0] };

    try {
      const res = await axios.post(image_api_imgbb_url, imageFile, {
        headers: { "content-type": "multipart/form-data" },
      });

      if (res.data.success) {
        const menuItem = {
          name: data.name,
          category: selected,
          price: parseFloat(data.price),
          recipe: data.recipe,
          image: res.data.data.display_url,
        };

        const response = await axiosPublic.post("/menu", menuItem, {
          headers: {
            jwttoken: `Bearer ${localStorage.getItem("jwttoken")}`,
          },
        });

        if (response.data.insertedId) {
          reset();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${data.name} is added to the menu.`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  const capitalizeFirst = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  // console.log(selected);
  return (
    // <div>
    //   <SectionTitle
    //     heading="add an item"
    //     subHeading="What's new?"
    //   ></SectionTitle>
    //   <div>
    //     <form onSubmit={handleSubmit(onSubmit)}>
    //       <div className="form-control w-full my-6">
    //         <label className="label">
    //           <span className="label-text">Recipe Name*</span>
    //         </label>
    //         <input
    //           type="text"
    //           placeholder="Recipe Name"
    //           {...register("name", { required: true })}
    //           required
    //           className="input input-bordered w-full"
    //         />
    //       </div>
    //       <div className="flex gap-6">
    //         {/* category */}
    //         <div className="form-control w-full my-6">
    //           <label className="label">
    //             <span className="label-text">Category*</span>
    //           </label>
    //           <select
    //             defaultValue="default"
    //             {...register("category", { required: true })}
    //             className="select select-bordered w-full"
    //           >
    //             <option disabled value="default">
    //               Select a category
    //             </option>
    //             <option value="salad">Salad</option>
    //             <option value="pizza">Pizza</option>
    //             <option value="soup">Soup</option>
    //             <option value="dessert">Dessert</option>
    //             <option value="drinks">Drinks</option>
    //           </select>
    //         </div>

    //         {/* price */}
    //         <div className="form-control w-full my-6">
    //           <label className="label">
    //             <span className="label-text">Price*</span>
    //           </label>
    //           <input
    //             type="number"
    //             placeholder="Price"
    //             {...register("price", { required: true })}
    //             className="input input-bordered w-full"
    //           />
    //         </div>
    //       </div>
    //       {/* recipe details */}
    //       <div className="form-control">
    //         <label className="label">
    //           <span className="label-text">Recipe Details</span>
    //         </label>
    //         <textarea
    //           {...register("recipe")}
    //           className="textarea textarea-bordered h-24"
    //           placeholder="Bio"
    //         ></textarea>
    //       </div>

    //       <div className="form-control w-full my-6">
    //         <input
    //           {...register("image", { required: true })}
    //           type="file"
    //           className="file-input w-full max-w-xs"
    //         />
    //       </div>

    //       <button type="submit" className="btn">
    //         Add Item <FaUtensils className="ml-4"></FaUtensils>
    //       </button>
    //     </form>
    //   </div>
    // </div>

    <div className="">
      <SectionTitle
        heading="Add A Menu Item"
        subHeading="Add something delicious"
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 rounded-xl shadow-lg p-8 border border-[#bcaf87] text-[#bcaf87]"
      >
        {/* Left side - text fields */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold mb-1">
              Recipe Name*
            </label>
            <input
              type="text"
              {...register("name", { required: true })}
              placeholder="e.g. Chicken Alfredo"
              className="w-full border border-[#bcaf87] rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#bcaf87]"
            />
          </div>

          <div className="w-full">
            <label className="block text-sm font-semibold mb-1 text-[#bcaf87]">
              Category*
            </label>
            <Listbox value={selected} onChange={setSelected}>
              <div className="relative">
                <Listbox.Button className="w-full bg-[#07252d] text-[#bcaf87] border border-[#bcaf87] p-3 rounded-md">
                  {capitalizeFirst(selected)}
                </Listbox.Button>
                <Listbox.Options className="absolute mt-1 w-full bg-[#bcaf87] text-[#07252d]  border rounded-md shadow-lg z-10">
                  {categories.map((category, idx) => (
                    <Listbox.Option
                      key={idx}
                      value={category}
                      className={({ active }) =>
                        `cursor-pointer select-none p-3 ${
                          active
                            ? "bg-[#07252d] text-[#bcaf87]"
                            : "text-[#07252d]"
                        }`
                      }
                    >
                      {capitalizeFirst(category)}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </div>
            </Listbox>
          </div>

          <div>
            <label className="block text-sm font-semibold  mb-1">Price*</label>
            <input
              type="number"
              {...register("price", { required: true })}
              placeholder="e.g. 12.99"
              className="w-full border border-[#bcaf87] rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#bcaf87]"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold  mb-1">
              Recipe Description
            </label>
            <textarea
              {...register("recipe")}
              rows={4}
              placeholder="Enter detailed description of the recipe..."
              className="w-full border border-[#bcaf87] rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#bcaf87] resize-none"
            ></textarea>
          </div>
        </div>

        {/* Right side - image and submit */}
        <div className="space-y-6 flex flex-col justify-between">
          <div>
            <label className="block text-sm font-semibold  mb-1">
              Upload Image*
            </label>
            <input
              type="file"
              {...register("image", { required: true })}
              accept="image/*"
              className="file-input w-full max-w-xs border border-[#bcaf87] text-sm bg-[#07252d] text-[#bcaf87] placeholder-gray-400 file:bg-[#bcaf87] file:text-[#07252d] file:border-0 file:px-4 file:py-2 file:rounded-md"
            />
          </div>

          {watch("image")?.[0] && (
            <img
              src={URL.createObjectURL(watch("image")[0])}
              alt="Preview"
              className="
      sm:w-30 sm:h-30
      md:w-40 md:h-40
      lg:w-50 lg:h-50
      object-cover rounded-md shadow-md
      transition-all duration-300 ease-in-out
    "
            />
          )}

          <div className="flex items-center justify-start pt-6">
            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-[#bcaf87] hover:bg-[#07252d] text-[#07252d] hover:text-[#bcaf87] hover:border font-semibold px-6 py-3 rounded-lg shadow transition duration-200"
            >
              <FaUtensils className="text-lg" />
              Add Item
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddItems;
