import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
const PrivateRoutes = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  console.log(" private logout ",loading, user);

  const preLocation = useLocation();
  if (loading) {
    return <progress className="progress w-56"></progress>;
  }
  if (user) {
    return children;
  } 
  else {
    console.log("privaterouters");
    
    return (
      <Navigate to="/login" state={{ preLocation: preLocation }}></Navigate>
    );
  }
};

export default PrivateRoutes;
