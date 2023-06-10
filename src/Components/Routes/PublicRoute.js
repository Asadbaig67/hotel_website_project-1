import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicRoute = (props) => {
  const { loggedinUser } = useSelector((state) => state.getLoggedInUser);
  const { Component } = props;
  return loggedinUser ? <Navigate to="/dashboard" /> : <Component />;
};

export default PublicRoute;
