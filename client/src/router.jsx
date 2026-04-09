import { createBrowserRouter } from "react-router-dom";

import MainLayout from "./layout/Mainlayout";
import AuthLayout from "./layout/AuthLayout";

import Dashboard from "./pages/Dashboard";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      { path: "/signin", element: <SignIn /> },
      { path: "/signup", element: <SignUp /> },
    ],
  },
  {
    element: <MainLayout />,
    children: [
      { path: "/", element: <Dashboard /> },
    ],
  },
]);

export default router;