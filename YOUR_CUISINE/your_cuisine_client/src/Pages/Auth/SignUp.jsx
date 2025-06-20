/* eslint-disable no-unused-vars */
import axios from "axios";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { AuthContext } from "../../providers/AuthProvider";
import Social from "./Social";

const apiKeyForImgbb = import.meta.env.VITE_apiKeyForImgbb;
const image_api_imgbb_url = `https://api.imgbb.com/1/upload?key=${apiKeyForImgbb}`;
const SignUp = () => {
  const axiosUser = useAxiosPublic();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { createNewUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    // console.log(data);
    const imageFile = { image: data.image[0] };
    const res = await axios.post(image_api_imgbb_url, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    // res.data.data.display_url
    createNewUser(data.email, data.password).then((result) => {
      const loggedUser = result.user;
      console.log(loggedUser);
      const profile = {
        displayName: data.name,
        photoURL: res.data.data.display_url,
      };
      updateUserProfile(profile)
        .then((result) => {
          // create user entry in the database
          const userInfo = {
            name: data.name,
            email: data.email,
            photoURL: res.data.data.display_url,
            uid: loggedUser.uid,
            role: "user",
          };
          axiosUser.post("/user", userInfo).then((res) => {
            if (res.data.insertedId) {
              console.log("user added to the database");
              reset();
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "User created successfully.",
                showConfirmButton: false,
                timer: 1500,
              });
              navigate("/");
            }
          });
        })
        .catch((error) => console.log(error));
      navigate("/");
    });
    reset();
  };

  return (
    <>
      <div className="hero min-h-screen pt-15 px-4 sm:px-8">
        <div className="flex flex-col">
          {/* content */}
          <div className="flex flex-col items-center justify-center p-4">
            <div className="text-center">
              <h1 className="text-4xl font-semibold text-[#bcaf87] mb-4">
                “Join the experience.”
              </h1>
              <p className="text-[#bcaf87] text-base max-w-md">
                “Join our family — delicious moments await.”
              </p>
            </div>
          </div>
          <div className="card ring-2 ring-[#bcaf87]/50  w-full max-w-sm md:max-w-md lg:max-w-lg   p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <label className="label text-[#bcaf87]">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  name="name"
                  placeholder="Name"
                  className="input input-bordered"
                />
                {errors.name && (
                  <span className="text-red-600">Name is required</span>
                )}
              </div>

              <div className="form-control w-full ">
                <label className="label  text-[#bcaf87]">
                  <span className="label-text">User Photo</span>
                </label>
                <input
                  {...register("image", { required: true })}
                  type="file"
                  className="file-input w-full max-w-xs"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text text-[#bcaf87]">Email</span>
                </label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  name="email"
                  placeholder="email"
                  className="input input-bordered"
                />
                {errors.email && (
                  <span className="text-red-600">Email is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-[#bcaf87]">Password</span>
                </label>
                <input
                  type="password"
                  {...register("password", {
                    required: true,
                    // minLength: 6,
                    // maxLength: 20,
                    // pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                  })}
                  placeholder="password"
                  className="input input-bordered "
                />
                {errors.password?.type === "required" && (
                  <p className="text-red-600">Password is required</p>
                )}
                {/* {errors.password?.type === "minLength" && (
                  <p className="text-red-600">Password must be 6 characters</p>
                )}
                {errors.password?.type === "maxLength" && (
                  <p className="text-red-600">
                    Password must be less than 20 characters
                  </p>
                )}
                {errors.password?.type === "pattern" && (
                  <p className="text-red-600">
                    Password must have one Uppercase one lower case, one number
                    and one special character.
                  </p>
                )} */}
                <label className="label">
                  <a
                    href="#"
                    className="label-text-alt link link-hover text-[#bcaf87]"
                  >
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="flex">
                <div className="form-control mt-6 pr-5">
                  <input
                    className="btn bg-[#021a20] w-full hover:bg-[#bcaf87] hover:text-[#021a20] font-semibold border-0"
                    type="submit"
                    value="Sign Up"
                  />
                </div>
                <div className="form-control mt-6" onClick={() => reset()}>
                  <input
                    className="btn bg-[#021a20] w-full hover:bg-[#bcaf87] hover:text-[#021a20] font-semibold border-0"
                    type="reset"
                    value="Reset"
                  />
                </div>
              </div>
            </form>

            <p className="px-6">
              <small>
                Already have an account{" "}
                <Link to="/login" className="link text-[#bcaf87]">
                  Login
                </Link>
              </small>
            </p>
            <Social></Social>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
