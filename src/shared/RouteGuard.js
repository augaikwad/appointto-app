import React from "react";
import { Route, Redirect } from "react-router-dom";

const RouteGuard = ({ component: Component, ...rest }) => {
  const hasJWT = () => {
    const token = sessionStorage.getItem("token");
    return !!token;
  };

  return (
    <Route
      {...rest}
      render={(props) =>
        hasJWT() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default RouteGuard;
