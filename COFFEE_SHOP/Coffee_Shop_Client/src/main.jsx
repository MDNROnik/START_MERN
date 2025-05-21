import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import AddCoffee from "./Components/AddCoffee.jsx";
import LogIn from "./Components/LogIn.jsx";
import SignUp from "./Components/SignUp.jsx";
import UpdateCoffee from "./Components/UpdateCoffee.jsx";
import Users from "./Components/Users.jsx";
import "./index.css";
import AuthProviders from "./providers/AuthProviders.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: () => fetch("https://coffee-shop-server-swart.vercel.app/coffee"),
  },
  {
    path: "/addCoffee",
    element: <AddCoffee />,
  },
  {
    path: "/updateCoffee/:id",
    element: <UpdateCoffee />,
    loader: ({ params }) =>
      fetch(`https://coffee-shop-server-swart.vercel.app/coffee/${params.id}`),
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/login",
    element: <LogIn />,
  },
  {
    path: "/users",
    element: <Users />,
    loader: () => fetch("https://coffee-shop-server-swart.vercel.app/users"),
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProviders>
      <RouterProvider router={router} />
    </AuthProviders>
  </StrictMode>
);
