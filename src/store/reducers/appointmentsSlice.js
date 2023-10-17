import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";
import { formattedFilters } from "../actions/appointmentActions";

const currentDate = moment(new Date()).format("YYYY-MM-DD");

export const initialState = {
  dashboardList: [],
  dashboardListFilters: {
    appointment_date: currentDate,
    id_doctor: 0,
    appointment_status: "0",
  },
  appointmentCount: 0,
  followUpPatient: 0,
  newPatient: 0,
  queueCount: 0,
  totalCount: 0,
  appointmentModal: {
    isAdd: true,
    show: false,
    form: {
      id_appointment: 0,
      id_doctor: 0,
      id_patient: 0,
      date: "",
      day: "",
      start_time: "",
      end_time: "",
      reason: "",
      appointment_status: "",
    },
  },
  calendarList: [],

  appointmentList: [],
  appointmentStatusList: [],
};

const appointmentsSlice = createSlice({
  name: "appointments",
  initialState: initialState,
  reducers: {
    setDashboardAppointments: (state, action) => {
      //working
      const {
        appointmentList,
        appointmentCount,
        followUpPatient,
        newPatient,
        queueCount,
        totalCount,
      } = action.payload;
      state.dashboardList = appointmentList;
      state.appointmentCount = appointmentCount;
      state.followUpPatient = followUpPatient;
      state.newPatient = newPatient;
      state.queueCount = queueCount;
      state.totalCount = totalCount;
    },
    setDashboardListFilters: (state, action) => {
      //working
      const { dashboardListFilters } = state;
      const { payload } = action;
      state.dashboardListFilters = formattedFilters({
        ...dashboardListFilters,
        ...payload,
      });
    },
    setAppointmentModal: (state, action) => {
      if (action.payload.hasOwnProperty("show") && !action.payload.show) {
        state.appointmentModal = initialState.appointmentModal;
      } else {
        state.appointmentModal = action.payload;
      }
    },
    setAppointmentsForCalendar: (state, action) => {
      state.calendarList = action.payload;
    },
  },
});

export const {
  setDashboardAppointments,
  setDashboardListFilters,
  setAppointmentModal,
  setAppointmentsForCalendar,
} = appointmentsSlice.actions;
export default appointmentsSlice.reducer;
