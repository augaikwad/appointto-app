import service from "../../service";
import cogoToast from "cogo-toast";
import { setCities } from "../reducers/globalSlice";

const toastOption = { hideAfter: 5, position: "top-right" };

export const getCities = (key, callback) => async (dispatch) => {
  try {
    const response = await service.get("Doctor/search_city?Keywords=" + key);
    const { response_code, message, payload } = response.data;
    if (response_code === 2000) {
      dispatch(setCities(payload));
      if (callback) {
        callback(payload);
      }
    } else {
      cogoToast.error(message, toastOption);
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};
