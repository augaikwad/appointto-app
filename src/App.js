import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, useHistory } from "react-router-dom";
import Routes from "./Routes";
import Layout from "./shared/Layout";
import Loader from "./shared/Loader";
import GlobalContextProvider from "./context/Global";
import PatientContextProvider from "./context/Patient";
import AuthContextProvider from "./context/Auth";
import AppointmentContextProvider from "./context/Appointment";
import PrescriptionContextProvider from "./context/Prescription";
import BillingContextProvider from "./context/Billing";
import { useSelector } from "react-redux";
import { setAuthToken } from "./helpers/setAuthToken";
import "ti-icons/css/themify-icons.css";
import "font-awesome/css/font-awesome.min.css";

const ValidateAuth = () => {
  const history = useHistory();
  useEffect(() => {
    //check jwt token
    const token = sessionStorage.getItem("token");
    if (token) {
      setAuthToken(token);
    } else {
      history.push("/login");
    }
  }, []);

  return null;
};

function App(props) {
  const isLoading = useSelector((state) => state.global.loading);

  const [isFullPageLayout, setIsFullPageLayout] = useState(true);

  return (
    <Router>
      <ValidateAuth />
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
