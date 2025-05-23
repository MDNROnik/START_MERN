import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Contexts/AuthProvider";

const UserInfo = () => {
  const { user } = useContext(AuthContext);
  const [haveData, setHaveData] = useState(false);
  // console.log('====================================');
  // console.log(user.uid);
  // console.log('====================================');
  const [allApplication, setAllApplication] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:5000/job-application?userId=${encodeURIComponent(user.uid)}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data), setAllApplication(data);
        console.log(allApplication);
        setHaveData(true);
      })
      .catch((error) => console.error(error));
  }, [user.uid]);
  return <div>UserInfo</div>;
};

export default UserInfo;
