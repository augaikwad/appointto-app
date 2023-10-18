import service from "../../service";
import cogoToast from "cogo-toast";
import {
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
} from "../reducers/prescriptionSlice";

const toastOption = { hideAfter: 5, position: "top-right" };

export const getComplaints = (id_doctor, callback) => async (dispatch) => {
  try {
    const response = await service.post(
      "Prescription/getcomplaints?id_doctor=" + id_doctor
    );
    const { response_code, payload } = response.data;
    if (response_code === 2000) {
      dispatch(setComplaints(payload));
      if (callback) {
        callback();
      }
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

export const getObservations = (id_doctor, callback) => async (dispatch) => {
  try {
    const response = await service.post(
      "Prescription/getobservations?id_doctor=" + id_doctor
    );
    const { response_code, payload } = response.data;
    if (response_code === 2000) {
      dispatch(setObservations(payload));
      if (callback) {
        callback();
      }
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

export const getDiagnosis = (id_doctor, callback) => async (dispatch) => {
  try {
    const response = await service.post(
      "Prescription/getdiagnosis?id_doctor=" + id_doctor
    );
    const { response_code, payload } = response.data;
    if (response_code === 2000) {
      dispatch(setDiagnosis(payload));
      if (callback) {
        callback();
      }
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

export const getWorkDone = (id_doctor, callback) => async (dispatch) => {
  try {
    const response = await service.post(
      "Prescription/getworkdone?id_doctor=" + id_doctor
    );
    const { response_code, payload } = response.data;
    if (response_code === 2000) {
      dispatch(setWorkdone(payload));
      if (callback) {
        callback();
      }
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

export const getAdvices = (id_doctor, callback) => async (dispatch) => {
  try {
    const response = await service.post(
      "Prescription/getadvice?id_doctor=" + id_doctor
    );
    const { response_code, payload } = response.data;
    if (response_code === 2000) {
      dispatch(setAdvices(payload));
      if (callback) {
        callback();
      }
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

export const getInvestigations = (id_doctor, callback) => async (dispatch) => {
  try {
    const response = await service.post(
      "Prescription/getinvestigations?id_doctor=" + id_doctor
    );
    const { response_code, payload } = response.data;
    if (response_code === 2000) {
      dispatch(setInvestigations(payload));
      if (callback) {
        callback();
      }
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

export const getAdviceGroup = (id_doctor, callback) => async (dispatch) => {
  try {
    const response = await service.post(
      "Prescription/GetAdviceGroup?DoctorId=" + id_doctor
    );
    const { response_code, payload } = response.data;
    if (response_code === 2000) {
      dispatch(setAdviceGroup(payload));
      if (callback) {
        callback();
      }
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

export const saveAdviceGroup = (req, callback) => async (dispatch) => {
  try {
    const response = await service.post("Prescription/SaveAdviceGroup", req);
    const { response_code } = response.data;
    if (response_code === 2000) {
      if (callback) {
        callback();
      }
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

export const getInvestigationsGroup =
  (id_doctor, callback) => async (dispatch) => {
    try {
      const response = await service.post(
        "Prescription/GetInvestigationGroup?DoctorId=" + id_doctor
      );
      const { response_code, payload } = response.data;
      if (response_code === 2000) {
        dispatch(setInvestigationsGroup(payload));
        if (callback) {
          callback();
        }
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

export const saveInvestigationsGroup = (req, callback) => async (dispatch) => {
  try {
    const response = await service.post(
      "Prescription/SaveInvestigationGroup",
      req
    );
    const { response_code } = response.data;
    if (response_code === 2000) {
      if (callback) {
        callback();
      }
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

export const getMedicinesByDoctorId = (id_doctor) => async (dispatch) => {
  try {
    const response = await service.get(
      "Medicine/get-doctor-medicine?id_doctor=" + id_doctor
    );
    const { response_code, payload } = response.data;
    if (response_code === 2000) {
      dispatch(setMedicinesByDoctorId(payload));
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

export const getRxGroups = (id_doctor, callback) => async (dispatch) => {
  try {
    const response = await service.post(
      "Prescription/GetRxGroup?DoctorId=" + id_doctor
    );
    const { response_code, payload } = response.data;
    if (response_code === 2000) {
      dispatch(setRxGroups(payload));
      if (callback) {
        callback();
      }
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

export const saveRxGroup = (req, callback) => async (dispatch) => {
  try {
    const response = await service.post("Prescription/SaveRxGroup", req);
    const { response_code } = response.data;
    if (response_code === 2000) {
      if (callback) {
        callback();
      }
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

export const searchMedicines = (key) => async (dispatch) => {
  try {
    const response = await service.get("Medicine/Search?Keywords=" + key);
    const { response_code, payload } = response.data;
    if (response_code === 2000) {
      dispatch(setMedicines(payload));
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

export const getPrescriptions = (req, callback) => async (dispatch) => {
  try {
    const response = await service.post("Prescription/GetPrescription", req);
    const { response_code, payload } = response.data;
    if (response_code === 2000) {
      dispatch(setPrescriptions(payload));
      if (callback) {
        callback();
      }
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

export const savePrescription = (req, callback) => async (dispatch) => {
  try {
    const response = await service.post("Prescription/SavePrescription", req);
    const { response_code, payload, message } = response.data;
    if (response_code === 2000) {
      cogoToast.success(message, toastOption);
      if (callback) {
        callback(payload);
      }
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

export const saveUpdateTag = (category, req, callback) => async (dispatch) => {
  try {
    const response = await service.post("Prescription/Save" + category, req);
    const { response_code, payload } = response.data;
    if (response_code === 2000) {
      if (callback) {
        callback(payload);
      }
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

export const setPreviousPrescription = (req, callback) => async (dispatch) => {
  try {
    const queryString = new URLSearchParams(req);
    const response = await service.post(
      "Prescription/setprevious?" + queryString
    );
    const { response_code, payload } = response.data;
    if (response_code === 2000) {
      if (callback) {
        callback(payload);
      }
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};
