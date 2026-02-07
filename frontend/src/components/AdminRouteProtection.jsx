import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RouteSignin } from "../helpers/RouteName";

const AdminRouteProtection = () => {
  const user = useSelector((state) => state.user);
  if (user && user.isLoggedIn && user.user.role === 'admin') {
    return <Outlet />;
  } else {
    return <Navigate to={RouteSignin} />;
  }
};

export default AdminRouteProtection;
