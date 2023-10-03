import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  prescriptionMargins: {
    hearder_margin: 0,
    footer_margin: 0,
    left_margin: 0,
    right_margin: 0,
  },

  addEditUserModal: {
    isAdd: true,
    formData: {
      countryCode: "91",
      termsAccepted: 1,
      id_clinic: parseInt(localStorage.getItem("id_clinic")),
    },
    open: false,
    step: 0,
  },
  userRoles: [],
};

const settingSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setPrintingSettings: (state, action) => {
      state.prescriptionMargins = action.payload;
    },
  },
});

export const { setPrintingSettings } = settingSlice.actions;

export default settingSlice.reducer;
