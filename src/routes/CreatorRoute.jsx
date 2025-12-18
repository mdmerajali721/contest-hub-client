import React from "react";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import { Loader } from "../components/Loader/Loader";
import Forbidden from "../pages/Error/Forbidden";

const CreatorRoute = ({ children }) => {
  const { loading } = useAuth();
  const { role, isLoading } = useRole();

  if (loading || isLoading) {
    return <Loader />;
  }

  if (role !== "creator") {
    return <Forbidden />;
  }

  return children;
};

export default CreatorRoute;
