import React, { useState, Suspense, useEffect } from "react";
import { useHistory, BrowserRouter as Router } from "react-router-dom";
import Routes from "./Routes";
import Layout from "./shared/Layout";
import Loader from "./shared/Loader";
import GlobalContextProvider, { GlobalContext } from "./context/Global";
import DoctorContextProvider from "./context/Doctor";
import PatientContextProvider from "./context/Patient";
import AuthContextProvider from "./context/Auth";
import AppointmentContextProvider from "./context/Appointment";
import PrescriptionContextProvider from "./context/Prescription";
import BillingContextProvider from "./context/Billing";
import SettingsContextProvider from "./context/Settings";
import { useSelector } from "react-redux";
import { setAuthToken } from "./helpers/setAuthToken";

function App(props) {
  const history = useHistory();

  const isLoading = useSelector((state) => state.global.loading);

  useEffect(() => {
    //check jwt token
    const token = sessionStorage.getItem("token");
    if (token) {
      setAuthToken(token);
    }
  }, []);

  const [isFullPageLayout, setIsFullPageLayout] = useState(true);

  return (
    <Router>
      <Loader open={isLoading} />
      <GlobalContextProvider>
        <GlobalContext.Consumer>
          {([state, actions]) => (
            <>
              {/* <Notification
                error={state.error}
                success={state.successMessage}
                onClose={() => actions.clearGenericResponse()}
              /> */}
            </>
          )}
        </GlobalContext.Consumer>
        <AuthContextProvider>
          <SettingsContextProvider>
            <DoctorContextProvider>
              <PatientContextProvider>
                <AppointmentContextProvider>
                  <PrescriptionContextProvider>
                    <BillingContextProvider>
                      <Suspense fallback={<Loader open={true} />}>
                        <Layout isFullPageLayout={isFullPageLayout}>
                          <Routes setIsFullPageLayout={setIsFullPageLayout} />
                        </Layout>
                      </Suspense>
                    </BillingContextProvider>
                  </PrescriptionContextProvider>
                </AppointmentContextProvider>
              </PatientContextProvider>
            </DoctorContextProvider>
          </SettingsContextProvider>
        </AuthContextProvider>
      </GlobalContextProvider>
    </Router>
  );
}

export default App;
