import { Listbox } from "@headlessui/react";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaUtensils } from "react-icons/fa";
import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import SectionTitle from "../../Share/SectionTitle";

const categories = ["breakfast", "lunch", "dinner", "dessert", "drinks"];

const apiKeyForImgbb = import.meta.env.VITE_apiKeyForImgbb;
const image_api_imgbb_url = `https://api.imgbb.com/1/upload?key=${apiKeyForImgbb}`;
const UpdateItem = () => {
  const { name, category, recipe, price, _id, image } = useLoaderData();
  const index = categories.indexOf(category);
  // console.log(image);
  const [selected, setSelected] = useState(categories[index]);
  const [updateImage, setUpdateImage] = useState(false);

  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const { register, handleSubmit, watch } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    // image upload to imgbb and then get an url
    let res,
      tempImg = image;
    if (data.image.length === 1) {
      const imageFile = { image: data.image[0] };
      res = await axios.post(image_api_imgbb_url, imageFile, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });
      tempImg = res.data.data.display_url;
      if (!res.data.success) {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Image is not uploaded",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/mainpanel/manageItems");
      }
    }

    // now send the menu item data to the server with the image url
    const menuItem = {
      name: data.name,
      category: data.category,
      price: parseFloat(data.price),
      recipe: data.recipe,
      image: tempImg,
    };
    //
    await axiosPublic
      .patch(`/menu/${_id}`, menuItem, {
        headers: {
          jwttoken: `Bearer ${localStorage.getItem("jwttoken")}`,
        },
      })
      .then((res) => {
        console.log(res);

        if (res.data.modifiedCount) {
          console.log("admin modify a menu to the database");
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${data.name} is modify to the menu.`,
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/mainpanel/manageItems");
        }
      });
    // console.log("with image url", res.data);
  };
  const capitalizeFirst = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const selectedImage = watch("image")?.[0];
  return (
    // <div>
    //   <SectionTitle
    //     heading="Update an Item"
    //     subHeading="Refresh info"
    //   ></SectionTitle>
    //   <div>
    //     <form onSubmit={handleSubmit(onSubmit)}>
    //       <div className="form-control w-full my-6">
    //         <label className="label">
    //           <span className="label-text">Recipe Name*</span>
    //         </label>
    //         <input
    //           type="text"
    //           defaultValue={name}
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
    //             defaultValue={category}
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
    //             defaultValue={price}
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
    //           defaultValue={recipe}
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

    //       <button className="btn">Update menu Item</button>
    //     </form>
    //   </div>
    // </div>

    <div className="">
      <SectionTitle
        heading="Update Menu Item"
        subHeading="Add something delicious"
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 rounded-xl shadow-lg p-8 border bg-[#bcaf87] text-[#07252d]"
      >
        {/* Left side - text fields */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold mb-1">
              Recipe Name*
            </label>
            <input
              type="text"
              defaultValue={name}
              {...register("name", { required: true })}
              placeholder="e.g. Chicken Alfredo"
              className="w-full border bg-[#07252d] text-[#bcaf87] rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#bcaf87]"
            />
          </div>

          <div className="w-full">
            <label className="block text-sm font-semibold mb-1 text-[#07252d]">
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
              defaultValue={price}
              type="number"
              {...register("price", { required: true })}
              placeholder="e.g. 12.99"
              className="w-full border bg-[#07252d] text-[#bcaf87] rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#bcaf87]"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold  mb-1">
              Recipe Description
            </label>
            <textarea
              defaultValue={recipe}
              {...register("recipe")}
              rows={4}
              placeholder="Enter detailed description of the recipe..."
              className="w-full border bg-[#07252d] text-[#bcaf87] rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#bcaf87] resize-none"
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
              {...register("image")}
              accept="image/*"
              className="file-input w-full max-w-xs border  text-sm bg-[#07252d] text-[#bcaf87] placeholder-gray-400 file:bg-[#bcaf87] file:text-[#07252d] file:border-0 file:px-4 file:py-2 file:rounded-md"
            />
          </div>

          {(selectedImage || image) && (
            <img
              src={selectedImage ? URL.createObjectURL(selectedImage) : image}
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
              className="inline-flex items-center gap-2 bg-[#07252d] text-[#bcaf87] hover:bg-[#bcaf87] hover:text-[#07252d] border border-[#07252d] hover:border-black font-semibold px-6 py-3 rounded-lg shadow transition duration-200"
            >
              <FaUtensils className="text-lg" />
              Update Item
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateItem;
