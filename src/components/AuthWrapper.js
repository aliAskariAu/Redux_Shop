import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";

const AuthWrapper = ({ children }) => {
  const { user, isLoading, error } = useAuth0();
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!isLoading && !user) {
    return <Navigate to="/" />;
  }

  if (error) {
    return <h2>{error.message}</h2>;
  }
  return children;
};

export default AuthWrapper;
