import axios from "axios";
import { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../../providers/AuthProvider";
import SectionTitle from "../../Share/SectionTitle";

// TODO: add real payment getway service
const Payment = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, reset, control } = useForm();
  const [transactionId, setTransactionId] = useState("");
  const [error, setError] = useState("");
  const { carts, user, setCarts } = useContext(AuthContext);

  const totalPrice = carts.reduce((total, item) => total + item.price, 0);

  const onSubmit = async (value) => {
    console.log("CLICK ", value, user.uid);
    const paymentInfo = {
      cardNumber: value.cardNumber,
      category: value.category,
      cvc: value.cvc,
      date: value.date,
      uid: user.uid,
      totalPrice: totalPrice,
      carts: carts,
    };

    await axios
      .post("http://localhost:5000/payment", paymentInfo, {
        headers: {
          jwttoken: `Bearer ${localStorage.getItem("jwttoken")}`,
        },
      })
      .then((res) => {
        console.log("User added pay the payment", res);
        if (res.data.result.insertedId) {
        //   console.log("User added pay the payment", res);
          setTransactionId(res.data.insertedId);
          reset();
          setCarts([]);
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${user.displayName} Complete Payment.`,
            showConfirmButton: false,
            timer: 1500,
          });
          // navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
        
        setError(err);
      });
  };

  return (
    <div>
      <SectionTitle
        heading="Payment"
        subHeading="Please pay to eat"
      ></SectionTitle>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text">TYPE OF CARD*</span>
            </label>
            <select
              defaultValue="default"
              {...register("category", { required: true })}
              className="select select-bordered w-full"
            >
              <option disabled value="default">
                Select a type
              </option>
              <option value="visa">VISA</option>
              <option value="master">MASTER</option>
            </select>
          </div>
          <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text">Card Number*</span>
            </label>
            <input
              type="text"
              placeholder="Enter Your Card Number"
              {...register("cardNumber", { required: true })}
              required
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control w-full my-6 space-x-3">
            <label className="label">
              <span className="label-text">Card Exprire Date</span>
            </label>
            <Controller
              className="input input-bordered w-full"
              control={control}
              name="date"
              defaultValue={null}
              render={({ field }) => (
                <DatePicker
                  className="bg-white text-black text-center"
                  placeholderText="Select Expire Date"
                  onChange={(date) => field.onChange(date)}
                  selected={field.value}
                />
              )}
            />
          </div>
          <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text">CVC*</span>
            </label>
            <input
              type="number"
              placeholder="Enter Your CVC Number"
              {...register("cvc", { required: true })}
              required
              className="input input-bordered w-full"
            />
          </div>
          <button
            className="btn btn-sm btn-primary my-4"
            type="submit"
            disabled={!user}
          >
            Pay
          </button>
          <p className="text-red-600">{error}</p>
          {transactionId && (
            <p className="text-green-600">
              {" "}
              Your transaction id: {transactionId}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Payment;
