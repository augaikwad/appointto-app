import React, { useEffect, lazy } from "react";
import { Switch, Route, useLocation, Redirect } from "react-router-dom";
import RouteGuard from "./shared/RouteGuard";
import { useSelector } from "react-redux";

const Login = lazy(() => import("./pages/Login"));
const MobileOTP = lazy(() => import("./pages/Doctor/MobileOTP"));
const Signup = lazy(() => import("./pages/Doctor/Signup"));
const Registration = lazy(() => import("./pages/Doctor/Registration"));
const Dashboard = lazy(() => import("./pages/Dashboard/index"));
const Patient = lazy(() => import("./pages/Patient/index"));
const PatientsList = lazy(() => import("./pages/PatientList/index"));
const AppointmentsList = lazy(() =>
  import("./pages/Appointment/AppointmentsList")
);
const Settings = lazy(() => import("./pages/Settings"));

function Routes({ setIsFullPageLayout }) {
  const location = useLocation();
  const { currentRoute } = useSelector((state) => state.navigation);

  const fullPageLayoutRoutes = [
    "/login",
    "/otpConfirmation",
    "/signup",
    "/registration",
  ];

  useEffect(() => {
    setIsFullPageLayout(fullPageLayoutRoutes.includes(location.pathname));
  }, [fullPageLayoutRoutes]);

  return (
    <>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/otpConfirmation" component={MobileOTP} />
        <Route exact path="/signup" component={Signup} />
        <RouteGuard exact path="/registration" component={Registration} />
        <RouteGuard exact path="/" component={Dashboard} />
        <RouteGuard exact path="/dashboard" component={Dashboard} />
        <RouteGuard exact path="/patient/:id" component={Patient} />
        <RouteGuard exact path="/patients" component={PatientsList} />
        <RouteGuard exact path="/appointments" component={AppointmentsList} />
        <RouteGuard exact path="/settings" component={Settings} />
      </Switch>
      <Redirect to={currentRoute} />
    </>
  );
}

export default Routes;
