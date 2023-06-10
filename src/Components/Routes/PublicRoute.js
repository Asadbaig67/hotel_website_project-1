import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicRoute = (props) => {
  const { login } = useSelector((state) => state.setLogin);
  const { Component } = props;
  return login ? <Navigate to="/dashboard" /> : <Component />;
};

export default PublicRoute;
