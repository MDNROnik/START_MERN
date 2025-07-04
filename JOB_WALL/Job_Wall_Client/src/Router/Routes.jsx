import { createBrowserRouter } from "react-router-dom";
import MainLayOut from "../Layouts/MainLayOut";
import AddJob from "../Pages/AboutJob/AddJob";
import AllJobs from "../Pages/AboutJob/AllJobs";
import Home from "../Pages/Home/Home";
import JobApply from "../Pages/JobApply/JobApply";
import JobDetails from "../Pages/JobDetails/JobDetails";
import MyJobs from "../Pages/MyJobs/MyJobs";
import Register from "../Pages/Register/Register";
import SignIn from "../Pages/SignIn/SignIn";
import UserInfo from "../Pages/UserInfo/UserInfo";
import ViewApplicant from "../Pages/ViewApplicant/ViewApplicant";
const Routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayOut></MainLayOut>,
    errorElement: <div>Page Not Found</div>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/signin",
        element: <SignIn></SignIn>,
      },
      {
        path: "/jobdetails/:id",
        element: <JobDetails></JobDetails>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/jobdetails/${params.id}`),
      },
      {
        path: "/jobApply/:id",
        element: <JobApply></JobApply>,
      },
      {
        path: "/userinfo",
        element: <UserInfo></UserInfo>,
      },
      {
        path: "/addjob",
        element: <AddJob></AddJob>,
      },
      {
        path: "/myjobs",
        element: <MyJobs></MyJobs>,
      },
      {
        path: "/viewapplicant/:id",
        element: <ViewApplicant></ViewApplicant>,
      },
      {
        path: "/alljobs",
        element: <AllJobs></AllJobs>,
      },
    ],
  },
]);

export default Routes;
