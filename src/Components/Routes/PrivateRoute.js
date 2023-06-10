import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = (props) => {
  const { loggedinUser } = useSelector((state) => state.getLoggedInUser);
  const { Component } = props;
  return loggedinUser ? <Component /> : <Navigate to="/signin" />;
};

export default PrivateRoute;
