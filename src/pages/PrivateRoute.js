import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

const PrivateRoute = ({ children, ...rest }) => {
  const { user } = useAuth();
  // if (!user) {
  //   return <Navigate to='/' />
  // }
  return (
    <Route
      {...rest}
      render={() => {
        return user ? children : <Navigate to="/" />;
      }}
    ></Route>
  );
};
export default PrivateRoute;
