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
    
    return children;
  } else {
   
    signOutUser();
    return <Navigate to="/login"></Navigate>;
  }
};

export default AdminRoutes;
