import { createSlice } from "@reduxjs/toolkit";

const termsOptions = [
  { label: "High BP", value: "highBP", checked: false },
  { label: "Low BP", value: "lowBP", checked: false },
  { label: "TB", value: "tb", checked: false },
  { label: "Asthma", value: "asthma", checked: false },
  { label: "Diabetes", value: "diabetes", checked: false },
  { label: "Allergies", value: "allergies", checked: false },
];

const habits = [
  { label: "Tobacco Chewing", value: "tobacco", checked: false },
  { label: "Smoking", value: "smoking", checked: false },
  { label: "Alcohol", value: "alcohol", checked: false },
];

export const initialState = {
  activeTab: 0,
  profileActiveTab: 0,
  patientModal: {
    open: false,
    isAdd: true,
    formValue: {
      first_name: "",
      last_name: "",
      mobile_number: "",
      dob: null,
      age: "",
      ageType: "Years",
      gender: "Male",
      address: "",
      area: "",
      city: "",
      state: "",
      pincode: "",
      reffered_by: "",
      email_id: "",
      emergency_contact: "",
      blood_group: "A+ve",
      id_patient: 0,
      diet: "veg",
      current_medicine: "",
      medicalPrecondition: termsOptions,
      habbits: habits,
      otherInfo: "",
      document_url: "",
    },
  },
  termsOptions: termsOptions,
  appointmentForm: {
    id_appointment: 0,
    id_patient: 0,
    id_doctor: 0,
    appointment_status: "",
  },
  patientById: null,
  isAptModalOpen: false,
  patientDocuments: null,
  globalPatientList: [],
  patientListFilter: {
    id_clinic: 0,
    Keywords: "",
    start_record: 1,
    end_record: 10,
  },
  patientList: {
    count: 0,
    item: [],
  },
};

const patientSlice = createSlice({
  name: "patients",
  initialState,
  reducers: {
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
    setPatientById: (state, action) => {
      state.patientById = action.payload;
    },
    setGlobalList: (state, action) => {
      state.globalPatientList = action.payload;
    },
    setPatientsList: (state, action) => {
      state.patientList = action.payload;
    },
    setPatientListFilters: (state, action) => {
      state.patientListFilter = action.payload;
    },
    setPatientModal: (state, action) => {
      if (action.payload.hasOwnProperty("open") && !action.payload?.open) {
        state.patientModal = initialState.patientModal;
        state.activeTab = 0;
      } else {
        state.patientModal = action.payload;
      }
    },
  },
});

export const {
  setPatientById,
  setGlobalList,
  setPatientsList,
  setPatientListFilters,
  setPatientModal,
  setActiveTab,
} = patientSlice.actions;

export default patientSlice.reducer;
