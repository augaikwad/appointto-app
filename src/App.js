import React, { useState, Suspense, useEffect } from "react";
import { useHistory } from "react-router-dom";
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

import { setAuthToken } from "./helpers/setAuthToken";

function App(props) {
  const history = useHistory();

  useEffect(() => {
    //check jwt token
    const token = localStorage.getItem("token");
    if (token) {
      setAuthToken(token);
    }
  }, []);

  const [isFullPageLayout, setIsFullPageLayout] = useState(true);

  return (
    <GlobalContextProvider>
      <GlobalContext.Consumer>
        {([state, actions]) => (
          <>
            <Loader open={state.loading} />
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
  );
}

export default App;
