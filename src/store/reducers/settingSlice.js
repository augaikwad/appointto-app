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
      gender: "male",
      termsAccepted: 1,
      id_clinic: 0,
    },
    open: false,
    step: 0,
  },
  users: [],
  userRoles: [],
};

const settingSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setPrintingSettings: (state, action) => {
      state.prescriptionMargins = action.payload;
    },
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setUserRoles: (state, action) => {
      state.userRoles = action.payload;
    },
    setAddEditUserModal: (state, action) => {
      if (action.payload.hasOwnProperty("open") && !action.payload?.open) {
        state.addEditUserModal = initialState.addEditUserModal;
      } else {
        state.addEditUserModal = action.payload;
      }
    },
  },
});

export const {
  setPrintingSettings,
  setUsers,
  setUserRoles,
  setAddEditUserModal,
} = settingSlice.actions;

export default settingSlice.reducer;
