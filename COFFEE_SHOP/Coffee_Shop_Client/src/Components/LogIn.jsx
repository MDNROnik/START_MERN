import { useContext } from "react";
import { AuthProviders } from "../providers/AuthProviders.jsx";

const LogIn = () => {
  const { logIn } = useContext(AuthProviders);
  const handleLogIn = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    // console.log(email, password);
    // console.log(logIn);

    //firebase sign in send
    logIn(email, password)
      .then((result) => {
        console.log(result);
        const signInInfo = {
          email,
          lastSignInTime: result.user?.metadata?.lastSignInTime,
        };

        console.log(signInInfo);

        //update last sign in to the database
        fetch(`https://coffee-shop-server-swart.vercel.app/users/${email}`, {
          method: "put",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(signInInfo),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("after update patch", data);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="card bg-base-100 max-w-sm mx-auto shrink-0 shadow-2xl">
      <div className="card-body">
        <h1 className="text-5xl font-bold">Sign In now!</h1>
        <form onSubmit={handleLogIn} className="fieldset">
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
          <button className="btn btn-neutral mt-4">Sign in</button>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
