import axios from "axios";
import { useForm } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import SectionTitle from "../../Share/SectionTitle";

const apiKeyForImgbb = import.meta.env.VITE_apiKeyForImgbb;
const image_api_imgbb_url = `https://api.imgbb.com/1/upload?key=${apiKeyForImgbb}`;
const UpdateItem = () => {
  const { name, category, recipe, price, _id } = useLoaderData();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const { register, handleSubmit } = useForm();
  //   const axiosPublic = useAxiosPublic();
  //   const axiosSecure = useAxiosSecure();
  const onSubmit = async (data) => {
    // console.log(data);
    // image upload to imgbb and then get an url
    const imageFile = { image: data.image[0] };
    const res = await axios.post(image_api_imgbb_url, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    if (res.data.success) {
      // now send the menu item data to the server with the image url
      const menuItem = {
        name: data.name,
        category: data.category,
        price: parseFloat(data.price),
        recipe: data.recipe,
        image: res.data.data.display_url,
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
    }
    // console.log("with image url", res.data);
  };
  return (
    <div>
      <SectionTitle
        heading="Update an Item"
        subHeading="Refresh info"
      ></SectionTitle>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text">Recipe Name*</span>
            </label>
            <input
              type="text"
              defaultValue={name}
              placeholder="Recipe Name"
              {...register("name", { required: true })}
              required
              className="input input-bordered w-full"
            />
          </div>
          <div className="flex gap-6">
            {/* category */}
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Category*</span>
              </label>
              <select
                defaultValue={category}
                {...register("category", { required: true })}
                className="select select-bordered w-full"
              >
                <option disabled value="default">
                  Select a category
                </option>
                <option value="salad">Salad</option>
                <option value="pizza">Pizza</option>
                <option value="soup">Soup</option>
                <option value="dessert">Dessert</option>
                <option value="drinks">Drinks</option>
              </select>
            </div>

            {/* price */}
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Price*</span>
              </label>
              <input
                type="number"
                defaultValue={price}
                placeholder="Price"
                {...register("price", { required: true })}
                className="input input-bordered w-full"
              />
            </div>
          </div>
          {/* recipe details */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Recipe Details</span>
            </label>
            <textarea
              defaultValue={recipe}
              {...register("recipe")}
              className="textarea textarea-bordered h-24"
              placeholder="Bio"
            ></textarea>
          </div>

          <div className="form-control w-full my-6">
            <input
              {...register("image", { required: true })}
              type="file"
              className="file-input w-full max-w-xs"
            />
          </div>

          <button className="btn">Update menu Item</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateItem;
