import { FC } from "react";
import { Navigate } from "react-router-dom";

import { getToken } from "@/helpers/token";

import { PrivateRouteProps } from "../types";

export const PrivateRoute: FC<PrivateRouteProps> = ({ children }) => {
  const token = getToken();
  console.log(token ? "token found" : "token not found!");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};
