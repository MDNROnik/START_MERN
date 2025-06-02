import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import MainPanel from "../Layout/MainPanel";
import Login from "../Pages/Auth/Login";
import SignUp from "../Pages/Auth/SignUp";
import Home from "../Pages/Home/Home";
import Cart from "../Pages/MainPanel/Cart/Cart";
import Menu from "../Pages/Menu/Menu";
import Order from "../Pages/Order/Order";
import PrivateRoutes from "../Pages/Share/PrivateRoutes";
const Routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>,
      },
      {
        path: "/menu",
        element: <Menu></Menu>,
      },
      {
        path: "/order/:cate",
        element: <Order></Order>,
      },
    ],
  },
  {
    path: "/mainpanel",
    element: (
      <PrivateRoutes>
        <MainPanel></MainPanel>
      </PrivateRoutes>
    ),
    children: [
      {
        path: "cart",
        element: <Cart></Cart>,
      },
    ],
  },
]);

export default Routes;
