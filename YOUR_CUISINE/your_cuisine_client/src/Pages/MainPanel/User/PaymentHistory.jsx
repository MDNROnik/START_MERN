import { useContext, useEffect, useState } from "react";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { AuthContext } from "../../../providers/AuthProvider";

const PaymentHistory = () => {
  const [payments, setPayments] = useState([]);
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true); // Loading state

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
        setLoading(false);

        setPayments(res.data);
      })
      .catch((err) => {
        console.log("Error fetching payments:", err);
        setLoading(false);
      });
  }, [user?.uid, axiosPublic]);
  return (
    <div>
      {/* Loading Spinner */}
      {loading && (
        <div className="fixed inset-0 bg-[#07252d] z-50 flex items-center justify-center">
          <div className="mx-auto w-full max-w-sm rounded-md border border-[#bcaf87] p-4">
            <div className="flex animate-pulse space-x-4">
              <div className="flex-1 space-y-6 py-1">
                <div className="h-2 rounded bg-[#bcaf87]"></div>
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-2 h-2 rounded bg-[#bcaf87]"></div>
                    <div className="col-span-1 h-2 rounded bg-[#bcaf87]"></div>
                  </div>
                  <div className="h-2 rounded bg-[#bcaf87]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
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
