import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
const PrivateRoutes = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const preLocation = useLocation();
  if (loading) {
    return <progress className="progress w-56"></progress>;
  }
  if (user) {
    return children;
  } else {
    return (
      <Navigate to="/login" state={{ preLocation: preLocation }}></Navigate>
    );
  }
};

export default PrivateRoutes;
