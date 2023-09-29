import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "../reducers/userSlice";

const rootReducer = combineReducers({
  user: userReducer,
  // Add other reducers as needed...
});

export default rootReducer;
