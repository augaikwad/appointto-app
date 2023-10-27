import { createSlice } from "@reduxjs/toolkit";
import { isPlainObject } from "../../utils/common";

const navigationSlice = createSlice({
  name: "navigation",
  initialState: {
    currentRoute: { pathname: "/login" },
    currentRouteState: {},
  },
  reducers: {
    navigateTo: (state, action) => {
      state.currentRoute = action.payload;
      // if (isPlainObject(action.payload)) {
      //   state.currentRoute = action.payload.hasOwnProperty("to")
      //     ? action.payload.to
      //     : "/login";
      //   state.currentRouteState = action.payload.hasOwnProperty("state")
      //     ? action.payload.state
      //     : {};
      // } else {
      //   state.currentRoute = action.payload;
      // }
    },
  },
});

export const { navigateTo } = navigationSlice.actions;
export default navigationSlice.reducer;
