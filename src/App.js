import React, { useState, Suspense } from "react";
import Routes from "./Routes";
import Layout from "./shared/Layout";
import Loader from "./shared/Loader";

import GlobalContextProvider, { GlobalContext } from "./context/Global";
import DoctorContextProvider from "./context/Doctor";

function App(props) {
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
      <DoctorContextProvider>
        <Suspense fallback={<Loader open={true} />}>
          <Layout isFullPageLayout={isFullPageLayout}>
            <Routes setIsFullPageLayout={setIsFullPageLayout} />
          </Layout>
        </Suspense>
      </DoctorContextProvider>
    </GlobalContextProvider>
  );
}

export default App;
