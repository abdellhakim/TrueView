import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { token, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // You can replace with a spinner later
  }

  return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
