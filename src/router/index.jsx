import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import NotFoundPage from "../pages/error/NotFound";
import HomePage from "../pages/home";
import HomeLayout from "../layout/home";
import Login from "../pages/auth/login";
import ProtectedRoute from "../components/ProtectedRoute";

const Layout = () => {
  return (
    <ProtectedRoute>
      <HomeLayout></HomeLayout>
    </ProtectedRoute>
  );
};
const AuthLayout = () => {
  return (
    <ProtectedRoute>
      <Outlet></Outlet>
    </ProtectedRoute>
  );
};
export default createBrowserRouter([
  {
    element: <Navigate to="/login" replace />,
    path: "/",
  },

  {
    element: <AuthLayout />,
    children: [
      {
        element: <Login />,
        path: "/login",
      },
    ],
  },
  {
    element: <Layout />,
    children: [
      {
        element: <HomePage />,
        path: "/home",
      },
    ],
  },
  {
    element: <NotFoundPage />,
    path: "*",
  },
]);
