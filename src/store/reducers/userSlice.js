import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    details: {
      id_doctor: 0,
      id_clinic: 0,
      user_name: "",
    },
    appointmentStatuses: null,
    doctorsByClinicId: null,
    selectedDoctorId: null,
  },
  reducers: {
    setUser: (state, action) => {
      const { details } = state;
      const { payload } = action;
      state.details = { ...details, ...payload };
    },
    setAppointmentStatuses: (state, action) => {
      state.appointmentStatuses = action.payload;
    },
    setDoctorsByClinicId: (state, action) => {
      state.doctorsByClinicId = action.payload;
    },
    setSelectedDoctorId: (state, action) => {
      state.selectedDoctorId = action.payload;
    },
  },
});

export const {
  setUser,
  setAppointmentStatuses,
  setDoctorsByClinicId,
  setSelectedDoctorId,
} = userSlice.actions;

export default userSlice.reducer;
