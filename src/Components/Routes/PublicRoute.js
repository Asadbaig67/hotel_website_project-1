import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicRoute = (props) => {
  const { loggedinUser } = useSelector((state) => state.getLoggedInUser);
  const { view } = useSelector((state) => state.view);
  const { user } = loggedinUser;
  const { login } = useSelector((state) => state.setLogin);
  const { Component } = props;
  return login ? (
    <Navigate
      to={`/${user.account_type}${
        user.account_type === "partner" ? `/${user.partner_type}` : ""
      }/dashboard`}
    />
  ) : (
    <Component />
  );
};

export default PublicRoute;
