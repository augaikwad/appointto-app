import { createSlice } from "@reduxjs/toolkit";
import { isPlainObject } from "../../utils/common";

export const initialState = {
  activeTab: 0,
  profileActiveTab: 0,
  patientModal: {
    open: false,
    isAdd: true,
    formValue: {
      gender: "Male",
      blood_group: "A+ve",
      id_patient: 0,
      first_name: "",
      last_name: "",
      age: "",
      ageType: "Years",
      mobile_number: "",
      email_id: "",
      dob: null,
      address: "",
      area: "",
      city: "",
      state: "",
      pincode: "",
      reffered_by: "",
      emergency_contact: "",
      diet: "veg",
      current_medicine: "",
      medicalPrecondition: "lowBP",
      habbits: "",
      otherInfo: "",
      document_url: "",
    },
  },
  termsOptions: [
    { label: "High BP", value: "highBP" },
    { label: "Low BP", value: "lowBP" },
    { label: "TB", value: "tb" },
    { label: "Asthma", value: "asthma" },
    { label: "Diabetes", value: "diabetes" },
    { label: "Allergies", value: "allergies" },
  ],
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
    setPatientById: (state, action) => {
      state.patientById = action.payload;
    },
  },
});

export const { setPatientById } = patientSlice.actions;
export default patientSlice.reducer;