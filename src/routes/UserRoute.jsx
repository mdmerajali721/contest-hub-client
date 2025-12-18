import React from "react";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import { Loader } from "../components/Loader/Loader";
import Forbidden from "../pages/Error/Forbidden";

const UserRoute = ({ children }) => {
  const { loading } = useAuth();
  const { role, isLoading } = useRole();

  if (loading || isLoading) {
    return <Loader />;
  }

  if (role !== "user") {
    return <Forbidden />;
  }

  return children;
};

export default UserRoute;
