import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, REGISTER],
        ignoredActionPaths: [
          "payload.appointment_date",
          "prescription.prescriptionForm.nextVisitDate",
        ],
      },
    }),
});

export const persistor = persistStore(store);

// const store = configureStore({
//   reducer: rootReducer,
// });

export default store;
