import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoute = (props) => {
  const { login } = useSelector((state) => state.setLogin);
  const { Component } = props;
  const { loggedinUser } = useSelector((state) => state.getLoggedInUser);
  const { user } = loggedinUser;
  const location = useLocation();
  const path = location.pathname.split("/");
  console.log(path);
  if (!user) return <Navigate to="/signin" />;
  if (path[1] === "admin")
    return login ? <Component /> : <Navigate to="/signin" />;
  else if (path[1] === "partner") {
    if (path[2] === user.partner_type && login) {
      return <Component />;
    }
    return <Navigate to="/signin" />;
  }
};

export default AdminRoute;
