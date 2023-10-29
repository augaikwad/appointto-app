import { createSlice } from "@reduxjs/toolkit";

const globalSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    cities: [],
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setCities: (state, action) => {
      state.cities = action.payload;
    },
  },
});

export const { setLoading, setCities } = globalSlice.actions;
export default globalSlice.reducer;
