import React, { useEffect, useState } from "react";
import AuthService from "../../service/auth";
import { matchRoutes, useLocation, useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  const tokenValidation = async () => {
    try {
      setIsLoading(true);
      const response = await AuthService.getMe();
      if (response.data) {
        if (location.pathname == "/login") {
          navigate("/home");
        }
        return;
      }
    } catch (err) {
      navigate("/login");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    tokenValidation();
  }, []);

  return <>{isLoading ? <>...Loading</> : children}</>;
};

export default ProtectedRoute;
