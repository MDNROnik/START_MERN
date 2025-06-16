import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Google from "../../assets/icon/google.png";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { AuthContext } from "../../providers/AuthProvider";
const SocialLogin = () => {
  const { signInWithGoogle } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    signInWithGoogle().then((result) => {
      // console.log(result.user);
      const userInfo = {
        email: result.user?.email,
        name: result.user?.displayName,
        photoURL: result.user?.photoURL,
        uid: result.user?.uid,
      };

      axiosPublic.post("/user", userInfo).then((res) => {
        console.log(res.data);
        navigate("/");
      });
    });
  };

  return (
    <div className="">
      <div className="divider"></div>
      <div>
        <button onClick={handleGoogleSignIn} className="hover:cursor-pointer ">
          <img src={Google} alt="" />
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;
