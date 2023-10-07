import React, { Suspense } from "react";
import "./App.scss";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./store";
import Loader from "./shared/Loader";

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={<Loader open={true} />}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </Suspense>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
