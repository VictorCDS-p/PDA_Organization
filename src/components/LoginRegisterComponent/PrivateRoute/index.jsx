import React, { useContext } from "react";
import { Route, Navigate } from "react-router-dom";
import { AuthContext } from "../AuthContext"; 

export default function PrivateRoute({ element: Element, ...rest }) {
  const { user } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      element={user ? Element : <Navigate to="/login" />}
    />
  );
}
