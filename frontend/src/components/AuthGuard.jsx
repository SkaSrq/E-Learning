import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AuthGuard = ({ children }) => {
  const user = useSelector((state) => state.user.name);
  return <> {user ? children : <Navigate replace to="/login" />} </>;
};

export default AuthGuard;
