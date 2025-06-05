import axios from "axios";
import { useForm } from "react-hook-form";
import { FaUtensils } from "react-icons/fa";
import Swal from "sweetalert2";
import SectionTitle from "../../Share/SectionTitle";

//how to image host on imgbb
//take api from app button -> api route
// set it on env local file
// import as like firebase apis
// take the url for api work
// set template string url
// send image data from client to hosting server
// that will bring a url for image access

const apiKeyForImgbb = import.meta.env.VITE_apiKeyForImgbb;
const image_api_imgbb_url = `https://api.imgbb.com/1/upload?key=${apiKeyForImgbb}`;
const AddItems = () => {
  const { register, handleSubmit, reset } = useForm();
  // const axiosPublic = useAxiosPublic();
  // const axiosSecure = useAxiosSecure();
  const onSubmit = async (data) => {
    // console.log(data);
    const imageFile = { image: data.image[0] };
    const res = await axios.post(image_api_imgbb_url, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    // console.log(res.data);

    if (res.data.success) {
      // now send the menu item data to the server
      const menuItem = {
        name: data.name,
        category: data.category,
        price: parseFloat(data.price),
        recipe: data.recipe,
        image: res.data.data.display_url,
      };

      await axios
        .post("http://localhost:5000/menu", menuItem, {
          headers: {
            jwttoken: `Bearer ${localStorage.getItem("jwttoken")}`,
          },
        })
        .then((res) => {
          if (res.data.insertedId) {
            console.log("admin added a menu to the database");
            reset();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `${data.name} is added to the menu.`,
              showConfirmButton: false,
              timer: 1500,
            });
            // navigate("/");
          }
        });
    }
    // console.log("with image url", res.data);
    reset();
  };
  return (
    <div>
      <SectionTitle
        heading="add an item"
        subHeading="What's new?"
      ></SectionTitle>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text">Recipe Name*</span>
            </label>
            <input
              type="text"
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
                defaultValue="default"
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

          <button type="submit" className="btn">
            Add Item <FaUtensils className="ml-4"></FaUtensils>
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddItems;
