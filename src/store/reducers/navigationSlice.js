import { createSlice } from "@reduxjs/toolkit";

const navigationSlice = createSlice({
  name: "navigation",
  initialState: {
    currentRoute: { pathname: "/login" },
    currentRouteState: {},
  },
  reducers: {
    navigateTo: (state, action) => {
      state.currentRoute = action.payload;
    },
  },
});

export const { navigateTo } = navigationSlice.actions;
export default navigationSlice.reducer;
