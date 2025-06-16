import { useContext, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import {
//   LoadCanvasTemplate,
//   loadCaptchaEnginge,
//   validateCaptcha,
// } from "react-simple-captcha";
import Swal from "sweetalert2";
import { AuthContext } from "../../providers/AuthProvider";
import Social from "./Social";

const Login = () => {
  // const [disabled, setDisabled] = useState(true);
  const catRef = useRef();
  const { signInUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const preLocation = location.state?.preLocation?.pathname || "/";
  //   console.log("state in the location login page", location.state);

  // useEffect(() => {
  //   loadCaptchaEnginge(6);
  // }, []);

  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);
    signInUser(email, password).then((result) => {
      // const user = result.user;
      // console.log(preLocation);
      Swal.fire({
        title: "User Login Successful.",
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
      });
      navigate("/");
    });
  };

  // const handleValidateCaptcha = () => {
  //   const user_captcha_value = catRef.current.value;

  //   if (validateCaptcha(user_captcha_value)) {
  //     setDisabled(false);
  //   } else {
  //     setDisabled(true);
  //   }
  // };
  // {/* <div className="form-control">
  //               <label className="label "><LoadCanvasTemplate /></label>
  //               <input
  //                   onBlur={handleValidateCaptcha}
  //                 type="text"
  //                 name="captcha"
  //                 ref={catRef}
  //                 placeholder="type the captcha above"
  //                 className="input input-bordered "
  //               />
  //               <div
  //                 className="btn btn-neutral btn-dash text-white"
  //                 onClick={handleValidateCaptcha}
  //               >
  //                 Check Captcha
  //               </div>
  //             </div> */}

  return (
    <>
      <div className="hero min-h-screen pt-20 px-4 sm:px-8">
        <div className="flex flex-col">
          {/* content */}
          <div className="flex flex-col items-center justify-center p-4">
            <div className="text-center">
              <h1 className="text-4xl font-semibold text-[#bcaf87] mb-4">
                Welcome Back :)
              </h1>
              <p className="text-[#bcaf87] text-base max-w-md">
                To keep connected with us please login with your personal
                information by email address and password or user your google
                account for login
              </p>
            </div>
          </div>
          <div className="card ring-2 ring-[#bcaf87]/50  w-full max-w-sm md:max-w-md lg:max-w-lg   p-6">
            <form onSubmit={handleLogin}>
              <div className="form-control mb-4 ">
                <label className="label">
                  <span className="label-text text-[#bcaf87]">Email</span>
                </label>
                <br />
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  className="input input-bordered"
                />
              </div>

              <div className="form-control mb-4">
                <label className="label w-full">
                  <span className="label-text text-[#bcaf87]">Password</span>
                </label>
                <br />
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  className="input input-bordered"
                />
                <label className="label">
                  <a
                    href="#"
                    className="label-text-alt link link-hover text-[#bcaf87]"
                  >
                    Forgot password?
                  </a>
                </label>
              </div>

              <div className="form-control mt-6">
                <input
                  disabled={false}
                  className="btn bg-[#021a20] w-full hover:bg-[#bcaf87] hover:text-[#021a20] font-semibold border-0"
                  type="submit"
                  value="Login"
                />
              </div>
            </form>

            <p className="text-center mt-4">
              <small>
                Don't Have An Account ?{" "}
                <Link to="/signup" className="link text-[#bcaf87]">
                  Create an account
                </Link>
              </small>
            </p>

            <div>
              <Social />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
