import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
const Profile = () => {
  const { user } = useContext(AuthContext);
  return (
    <div>
      <h2 className="text-3xl">
        <span>Hello </span>
        {user?.displayName ? user.displayName : "Back"}
      </h2>
    </div>
  );
};

export default Profile;
