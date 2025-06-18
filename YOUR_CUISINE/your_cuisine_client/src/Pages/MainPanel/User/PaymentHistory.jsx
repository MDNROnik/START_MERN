import { useContext, useEffect, useState } from "react";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { AuthContext } from "../../../providers/AuthProvider";

const PaymentHistory = () => {
  const [payments, setPayments] = useState([]);
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user?.uid) return; // wait until user is loaded

    axiosPublic
      .get(`/payment/${user.uid}`, {
        headers: {
          jwttoken: `Bearer ${localStorage.getItem("jwttoken")}`,
        },
      })
      .then((res) => {
        console.log(res.data);

        setPayments(res.data);
      })
      .catch((err) => {
        console.log("Error fetching payments:", err);
      });
  }, [user?.uid, axiosPublic]);
  return (
    <div>
      <h2 className="text3-xl">Total Payments: {payments.length}</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>price</th>
              <th>Transaction Id</th>
              <th>Items</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => (
              <tr key={payment._id}>
                <th>{index + 1}</th>
                <td>${payment.totalPrice}</td>
                <td>{payment._id}</td>
                <td>{payment.carts.length}</td>
                <td>{new Date(payment.date).toLocaleDateString("en-GB")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
