import * as React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { isLoggedIn } from "services/auth";
import { routes } from "App";

export interface ProtectedRouteProps extends RouteProps {}

export const ProtectedRoute: React.SFC<ProtectedRouteProps> = (props) => {
  return isLoggedIn() ? <Route {...props} /> : <Redirect to={routes.login} />;
};
