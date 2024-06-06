import { getToken } from "@/helpers/token";
import { FC } from "react";
import { Navigate } from "react-router-dom";

import { PrivateRouteProps } from "../types";

export const PrivateRoute: FC<PrivateRouteProps> = ({ children }) => {
  const token = getToken();
  if (!token) {
    return <Navigate to="login" replace />;
  }
  return <>{children}</>;
};
