import service from "../../service";
import {
  setPrintingSettings,
  setUsers,
  setUserRoles,
} from "../reducers/settingSlice";

export const getPrintingSetting = (id_doctor, callback) => async (dispatch) => {
  try {
    const response = await service.get(
      "Doctor/get_printing_setting?DoctorId=" + id_doctor
    );
    const { response_code, payload } = response.data;
    if (response_code === 2000) {
      dispatch(setPrintingSettings(payload));
      if (callback) {
        callback(payload);
      }
    }
  } catch (error) {
    // Handle error here
    console.error("Error fetching user data:", error);
  }
};

export const addPrintingSetting = (req, callback) => async (dispatch) => {
  try {
    const response = await service.post("Doctor/add_printing_setting", req);
    const { response_code, payload } = response.data;
    if (response_code === 2000) {
      dispatch(setPrintingSettings(payload));
      if (callback) {
        callback(payload);
      }
    }
  } catch (error) {
    // Handle error here
    console.error("Error fetching user data:", error);
  }
};

export const updatePrintingSetting = (req, callback) => async (dispatch) => {
  try {
    const response = await service.post("Doctor/update_printing_setting", req);
    const { response_code, payload } = response.data;
    if (response_code === 2000) {
      dispatch(setPrintingSettings(payload));
      if (callback) {
        callback(payload);
      }
    }
  } catch (error) {
    // Handle error here
    console.error("Error fetching user data:", error);
  }
};

export const getUsers = (id_clinic, callback) => async (dispatch) => {
  try {
    const response = await service.get(
      "Doctor/get_clinic_user_list?id_clinic=" + id_clinic
    );
    const { response_code, payload } = response.data;
    if (response_code === 2000) {
      dispatch(setUsers(payload));
      if (callback) {
        callback(payload);
      }
    }
  } catch (error) {
    // Handle error here
    console.error("Error fetching user data:", error);
  }
};

export const getUserRoles = () => async (dispatch) => {
  try {
    const response = await service.post("Registration/get_roles");
    const { response_code, payload } = response.data;
    if (response_code === 2000) {
      dispatch(setUserRoles(payload));
    }
  } catch (error) {
    // Handle error here
    console.error("Error fetching user data:", error);
  }
};

export const registerUser = (req, callback) => async (dispatch) => {
  try {
    const response = await service.post(
      "Registration/register-user-clinc",
      req
    );
    const { response_code, payload } = response.data;
    if (response_code === 2000) {
      if (callback) {
        callback(payload);
      }
    }
  } catch (error) {
    // Handle error here
    console.error("Error fetching user data:", error);
  }
};

export const registerDoctor = (req, callback) => async (dispatch) => {
  try {
    const response = await service.post("Doctor/create_clinic_doctor", req);
    const { response_code, payload } = response.data;
    if (response_code === 2000) {
      if (callback) {
        callback(payload);
      }
    }
  } catch (error) {
    // Handle error here
    console.error("Error fetching user data:", error);
  }
};
