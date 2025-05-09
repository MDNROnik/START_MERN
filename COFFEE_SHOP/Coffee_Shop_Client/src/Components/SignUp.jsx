import React, { useContext } from "react";
import { AuthProviders } from '../providers/AuthProviders.jsx';

const SignUp = () => {
  const { createUser } = useContext(AuthProviders);
  const handleSignUp = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const address = event.target.address.value;
    const phone = event.target.phone.value;
    const photo = event.target.photo.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    console.log("SIGN UP ", email, password);
    createUser(email, password)
      .then((result) => {
        console.log(result.user);
        const createdAt = result.user.metadata.creationTime;
        const newUser = { name, email, createdAt,address, phone, photo };
        console.log("new ", newUser);

        //save user in database
        fetch("http://localhost:3000/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newUser),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("user maded to db ", data);
          })
          .catch((error) => {
            console.log("error ", error);
          });
      })
      .catch((error) => {
        console.log("error ", error);
      });
  };
  return (
    <div className="card bg-base-100 max-w-sm mx-auto shrink-0 shadow-2xl">
      <div className="card-body">
        <h1 className="text-5xl font-bold">Sign Up now!</h1>
        <form onSubmit={handleSignUp} className="fieldset">
          <label className="label">Name</label>
          <input type="text" name="name" className="input" placeholder="Name" />
          <label className="label">Address</label>
          <input
            type="text"
            name="address"
            className="input"
            placeholder="Address"
          />
          <label className="label">Phone</label>
          <input
            type="text"
            name="phone"
            className="input"
            placeholder="Phone NUmber"
          />
          <label className="label">photo</label>
          <input
            type="text"
            name="photo"
            className="input"
            placeholder="Photo URL"
          />
          <label className="label">Email</label>
          <input
            type="email"
            name="email"
            className="input"
            placeholder="Email"
          />
          <label className="label">Password</label>
          <input
            type="password"
            name="password"
            className="input"
            placeholder="Password"
          />
          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>
          <button className="btn btn-neutral mt-4">Sign up</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
