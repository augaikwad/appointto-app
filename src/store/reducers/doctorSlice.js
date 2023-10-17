import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  speciality: [],
};

const doctorSlice = createSlice({
  name: "doctors",
  initialState,
  reducers: {
    setSpeciality: (state, action) => {
      state.speciality = action.payload;
    },
  },
});

export const { setSpeciality } = doctorSlice.actions;
export default doctorSlice.reducer;
