import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

export const initialState = {
  complaints: [],
  observations: [],
  diagnosis: [],
  workdone: [],
  advices: [],
  investigations: [],
  adviceGroup: [],
  investigationsGroup: [],
  doctorMedicines: [],
  rxGroups: [],
  medicines: [],
  allPrescriptions: [],

  prescriptionForm: {
    prescriptionId: 0,
    bp: null,
    tempratureInFahrenhiet: null,
    oxizenSaturation: null,
    lstcomplaints: [],
    lstobservations: [],
    lstdiagnosis: [],
    lstworkDone: [],
    lstadvice: [],
    lstinvestigations: [],
    nextVisitAfter: 7,
    nextVisitUnit: "Days",
    nextVisitDate: moment(new Date(moment().add(7, "days"))).format(
      "YYYY-MM-DD"
    ),
  },
};

const prescriptionSlice = createSlice({
  name: "prescription",
  initialState,
  reducers: {
    setComplaints: (state, action) => {
      state.complaints = action.payload;
    },
    setObservations: (state, action) => {
      state.observations = action.payload;
    },
    setDiagnosis: (state, action) => {
      state.diagnosis = action.payload;
    },
    setWorkdone: (state, action) => {
      state.workdone = action.payload;
    },
    setAdvices: (state, action) => {
      state.advices = action.payload;
    },
    setInvestigations: (state, action) => {
      state.investigations = action.payload;
    },
    setAdviceGroup: (state, action) => {
      state.adviceGroup = action.payload;
    },
    setInvestigationsGroup: (state, action) => {
      state.investigationsGroup = action.payload;
    },
    setMedicinesByDoctorId: (state, action) => {
      state.doctorMedicines = action.payload;
    },
    setRxGroups: (state, action) => {
      state.rxGroups = action.payload;
    },
    setMedicines: (state, action) => {
      state.medicines = action.payload;
    },
    setPrescriptions: (state, action) => {
      state.allPrescriptions = action.payload;
    },
  },
});

export const {
  setComplaints,
  setObservations,
  setDiagnosis,
  setWorkdone,
  setAdvices,
  setInvestigations,
  setAdviceGroup,
  setInvestigationsGroup,
  setMedicinesByDoctorId,
  setRxGroups,
  setMedicines,
  setPrescriptions,
} = prescriptionSlice.actions;

export default prescriptionSlice.reducer;
