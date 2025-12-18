import React from "react";
import useAuth from "../hooks/useAuth";
import { Loader } from "../components/Loader/Loader";
import { Navigate, useLocation } from "react-router";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
    const location = useLocation();

  if (loading) {
    return <Loader />;
  }

  if (user) {
    return children;
  }

  return <Navigate state={location.pathname} to={"/auth/login"} />;
};

export default PrivateRoute;
