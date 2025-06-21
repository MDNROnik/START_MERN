import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import MainPanel from "../Layout/MainPanel";
import Login from "../Pages/Auth/Login";
import SignUp from "../Pages/Auth/SignUp";
import Home from "../Pages/Home/Home";
import AddItems from "../Pages/MainPanel/Admin/AddItems";
import AllUsers from "../Pages/MainPanel/Admin/AllUsers";
import Dashboard from "../Pages/MainPanel/Admin/Dashboard";
import ManageItems from "../Pages/MainPanel/Admin/ManageItems";
import UpdateItem from "../Pages/MainPanel/Admin/UpdateItem";
import ChefHome from "../Pages/MainPanel/Chef/ChefHome";
import ChefOrders from "../Pages/MainPanel/Chef/ChefOrders";
import AddAReview from "../Pages/MainPanel/User/AddAReview";
import Cart from "../Pages/MainPanel/User/Cart";
import Payment from "../Pages/MainPanel/User/Payment";
import PaymentHistory from "../Pages/MainPanel/User/PaymentHistory";
import Profile from "../Pages/MainPanel/User/Profile";
import Menu from "../Pages/Menu/Menu";
import Order from "../Pages/Order/Order";
import AdminRoutes from "../Pages/Share/AdminRoutes";
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
      {
        path: "payment",
        element: <Payment></Payment>,
      },
      {
        path: "paymentHistory",
        element: <PaymentHistory></PaymentHistory>,
      },
      {
        path: "profile",
        element: <Profile></Profile>,
      },
      {
        path: "review",
        element: <AddAReview></AddAReview>,
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
        path: "dashboard",
        element: (
          <AdminRoutes>
            <Dashboard></Dashboard>
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
          // http://localhost:5000
          fetch(`https://your-cuisine-server.vercel.app/menu/${params.id}`),
        // fetch(`http://localhost:5000/menu/${params.id}`),
      },
      {
        path: "chef-home",
        element: <ChefHome></ChefHome>,
      },
      {
        path: "chef-orders",
        element: <ChefOrders></ChefOrders>,
      },
    ],
  },
]);

export default Routes;
