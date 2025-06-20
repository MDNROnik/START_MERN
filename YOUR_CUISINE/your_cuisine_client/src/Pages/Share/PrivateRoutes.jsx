import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
const PrivateRoutes = ({ children }) => {
  const { user, loading, signOutUser } = useContext(AuthContext);
  // console.log(" private logout ",loading, user);

  console.log("in private router", user, loading);

  if (loading) {
    return <progress className="progress w-56"></progress>;
  }
  if (user) {
    return children;
  } else {
    // console.log("in privaterouters");
    signOutUser();
    return <Navigate to="/login" />;
  }
};

export default PrivateRoutes;
