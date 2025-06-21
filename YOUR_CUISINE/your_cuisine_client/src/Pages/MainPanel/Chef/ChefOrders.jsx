import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { AuthContext } from "../../../providers/AuthProvider";
const ChefOrders = () => {
  const navigate = useNavigate();
  const [payments, setPayments] = useState([]);
  const axiosPublic = useAxiosPublic();
  const { user, signOutUser, setCarts, setUser } = useContext(AuthContext);

  useEffect(() => {
    if (!user?.uid) return; // wait until user is loaded

    axiosPublic
      .get("/payment", {
        headers: {
          jwttoken: `Bearer ${localStorage.getItem("jwttoken")}`,
        },
      })
      .then((res) => {
        // console.log(res.data);

        setPayments(res.data);
      })
      .catch((err) => {
        console.log("Error fetching payments:", err);
      });
  }, [user?.uid, axiosPublic]);
  const handleSignOut = () => {
    signOutUser();
    setCarts([]);
    setUser(null);
    navigate("/");
  };
  console.log(payments);

  return (
    <div>
      <h1>TOTAL ORDER IN THE QUEUES</h1>
      <div>{payments.length}</div>
    </div>
  );
};

export default ChefOrders;
