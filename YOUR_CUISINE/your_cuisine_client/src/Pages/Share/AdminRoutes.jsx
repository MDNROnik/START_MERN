import axios from "axios";
import { useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
const AdminRoutes = ({ children }) => {
  const { user, loading, signOutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  console.log(" admin logout ",loading, user);

  if (loading) {
    return <progress className="progress w-56"></progress>;
  }
  else if (user.admin=="admin") {
    // axios
    //   .get(`http://localhost:5000/user/${user.uid}`, {
    //     headers: {
    //       jwttoken: `Bearer ${localStorage.getItem("jwttoken")}`,
    //     },
    //   })
    //   .then((res) => {
    //     console.log(res.data.role);
    //     if (res.data?.role == "admin") {
    //       //   setIsAdmin(true);
    //       // console.log("2222");
    //     } else {
    //       console.log("admin route");
    //       signOutUser();
    //       navigate("/login");
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err.status);
    //     if (err) {
    //       console.log("admin route");

    //       signOutUser();
    //       navigate("/login");
    //     }
    //   });
    return children;
  } else {
   
    signOutUser();
    return <Navigate to="/login"></Navigate>;
  }
};

export default AdminRoutes;
