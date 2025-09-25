import { createBrowserRouter } from "react-router-dom";
import { DashboardLayout } from "./layouts";
import {
  AccessDenied,
  DashboardHome,
  Error,
  LandingPage,
  NotFound,
  Profile,
  SigninPage,
  SignupPage,
  Store,
  Users,
  StoreListing,
  Ratings,
} from "./pages";

//Routes
export const routes = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    errorElement: <Error isDashboard={false} />,
  },

  {
    path: "/signin",
    element: <SigninPage />,
    errorElement: <Error isDashboard={false} />,
  },

  {
    path: "/signup",
    element: <SignupPage />,
    errorElement: <Error isDashboard={false} />,
  },

  {
    path: "/dashboard",
    element: <DashboardLayout />,
    errorElement: <Error isDashboard={true} />,
    children: [
      {
        index: true,
        element: <DashboardHome />,
        errorElement: <Error isDashboard={true} />,
      },
      {
        path: "profile",
        element: <Profile />,
        errorElement: <Error isDashboard={true} />,
      },
      {
        path: "users",
        element: <Users />,
        errorElement: <Error isDashboard={true} />,
      },
      {
        path: "stores",
        element: <Store />,
        errorElement: <Error isDashboard={true} />,
      },
      {
        path: "storelisting",
        element: <StoreListing />,
        errorElement: <Error isDashboard={true} />,
      },
      {
        path: "ratings",
        element: <Ratings />,
        errorElement: <Error isDashboard={true} />,
      },
      {
        path: "accessdenied",
        element: <AccessDenied isDashboard={true} />,
        errorElement: <Error isDashboard={true} />,
      },
      {
        path: "*",
        element: <NotFound isDashboard={true} />,
        errorElement: <Error isDashboard={true} />,
      },
    ],
  },
]);
