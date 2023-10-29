import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./Routes";
import Layout from "./shared/Layout";
import Loader from "./shared/Loader";
import GlobalContextProvider from "./context/Global";
import PatientContextProvider from "./context/Patient";
import AuthContextProvider from "./context/Auth";
import AppointmentContextProvider from "./context/Appointment";
import PrescriptionContextProvider from "./context/Prescription";
import BillingContextProvider from "./context/Billing";
import { useDispatch, useSelector } from "react-redux";
import { setAuthToken } from "./helpers/setAuthToken";
import { navigateTo } from "./store/reducers/navigationSlice";
import "font-awesome/css/font-awesome.min.css";

function App(props) {
  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.global.loading);
  useEffect(() => {
    //check jwt token
    const token = sessionStorage.getItem("token");
    console.log("App === ", token);
    if (token) {
      setAuthToken(token);
    } else {
      dispatch(navigateTo({ pathname: "/login" }));
    }
  }, []);

  const [isFullPageLayout, setIsFullPageLayout] = useState(true);

  return (
    <Router>
      <Loader open={isLoading} />
      <GlobalContextProvider>
        <AuthContextProvider>
          <PatientContextProvider>
            <AppointmentContextProvider>
              <PrescriptionContextProvider>
                <BillingContextProvider>
                  <Layout isFullPageLayout={isFullPageLayout}>
                    <Routes setIsFullPageLayout={setIsFullPageLayout} />
                  </Layout>
                </BillingContextProvider>
              </PrescriptionContextProvider>
            </AppointmentContextProvider>
          </PatientContextProvider>
        </AuthContextProvider>
      </GlobalContextProvider>
    </Router>
  );
}

export default App;
