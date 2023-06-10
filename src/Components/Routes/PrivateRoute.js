import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = (props) => {
  const { login } = useSelector((state) => state.setLogin);
  const { Component } = props;
  return login ? <Component /> : <Navigate to="/signin" />;
};

export default PrivateRoute;
