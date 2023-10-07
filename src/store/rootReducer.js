import { combineReducers } from "@reduxjs/toolkit";
import navigationReducer from "./reducers/navigationSlice";
import globalReducer from "./reducers/globalSlice";
import userReducer from "./reducers/userSlice";
import patientReducer from "./reducers/patientSlice";
import prescriptionReducer from "./reducers/prescriptionSlice";
import settingReducer from "./reducers/settingSlice";
import appointmentsReducer from "./reducers/appointmentsSlice";
import billingReducer from "./reducers/billingSlice";

const rootReducer = combineReducers({
  navigation: navigationReducer,
  global: globalReducer,
  settings: settingReducer,
  user: userReducer,
  patients: patientReducer,
  prescription: prescriptionReducer,
  appointments: appointmentsReducer,
  billings: billingReducer,
});

export default rootReducer;
