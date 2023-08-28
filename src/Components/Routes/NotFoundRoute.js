import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const NotFoundRoute = (props) => {
  const { login } = useSelector((state) => state.setLogin);
  const { loggedinUser } = useSelector((state) => state.getLoggedInUser);
  const { user } = loggedinUser;
  return login ? (
    <Navigate
      to={`/${user.account_type}${
        user && user.account_type === "partner" ? `/${user.partner_type}` : ""
      }/dashboard`}
    />
  ) : (
    <Navigate to="/signin" />
  );
};

export default NotFoundRoute;
