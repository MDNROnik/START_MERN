import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import MainPanel from "../Layout/MainPanel";
import Login from "../Pages/Auth/Login";
import SignUp from "../Pages/Auth/SignUp";
import Home from "../Pages/Home/Home";
import AddItems from "../Pages/MainPanel/Admin/AddItems";
import AllUsers from "../Pages/MainPanel/Admin/AllUsers";
import ManageItems from "../Pages/MainPanel/Admin/ManageItems";
import UpdateItem from "../Pages/MainPanel/Admin/UpdateItem";
import Cart from "../Pages/MainPanel/User/Cart";
import Payment from "../Pages/MainPanel/User/Payment";
import Menu from "../Pages/Menu/Menu";
import Order from "../Pages/Order/Order";
import AdminRoutes from "../Pages/Share/AdminRoutes";
import PrivateRoutes from "../Pages/Share/PrivateRoutes";
import PaymentHistory from "../Pages/MainPanel/User/PaymentHistory";
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
      {
        path: "payment",
        element: <Payment></Payment>,
      },
      {
        path: "paymentHistory",
        element: <PaymentHistory></PaymentHistory>,
      },
      {
        path: "users",
        element: (
          <AdminRoutes>
            <AllUsers></AllUsers>
          </AdminRoutes>
        ),
      },
      {
        path: "addItems",
        element: (
          <AdminRoutes>
            <AddItems></AddItems>
          </AdminRoutes>
        ),
      },
      {
        path: "manageItems",
        element: (
          <AdminRoutes>
            <ManageItems></ManageItems>
          </AdminRoutes>
        ),
      },
      {
        path: "manageItems/updateItem/:id",
        element: (
          <AdminRoutes>
            <UpdateItem></UpdateItem>
          </AdminRoutes>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/menu/${params.id}`),
      },
    ],
  },
]);

export default Routes;
