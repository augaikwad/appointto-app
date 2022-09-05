import React, { useEffect, lazy } from "react";
import { Switch, Route, useLocation, Redirect } from "react-router-dom";

const Login = lazy(() => import("./pages/Login"));
const MobileOTP = lazy(() => import("./pages/Doctor/MobileOTP"));
const Signup = lazy(() => import("./pages/Doctor/Signup"));
const Registration = lazy(() => import("./pages/Doctor/Registration"));
const Dashboard = lazy(() => import("./pages/Dashboard/index"));

function Routes({ setIsFullPageLayout }) {
  const location = useLocation();

  const fullPageLayoutRoutes = [
    "/",
    "/login",
    "/otpConfirmation",
    "/signup",
    "/registration",
  ];

  useEffect(() => {
    setIsFullPageLayout(fullPageLayoutRoutes.includes(location.pathname));
  }, [fullPageLayoutRoutes]);

  return (
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/otpConfirmation" component={MobileOTP} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/registration" component={Registration} />
      <Route exact path="/dashboard" component={Dashboard} />
      <Redirect to="/login" />
    </Switch>
  );
}

export default Routes;
