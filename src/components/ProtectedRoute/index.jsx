import React, { useEffect, useState } from "react";
import AuthService from "../../service/auth";
import {
  Navigate,
  matchRoutes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { logout } from "../../utils/auth";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  const tokenValidation = async () => {
    try {
      setIsLoading(true);
      await AuthService.getMe();
      if (location.pathname == "/login") navigate("/home");
    } catch (err) {
      logout();
      navigate("/login");
      return;
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    tokenValidation();
  }, []);

  return <>{!isLoading && children}</>;
};

export default ProtectedRoute;
