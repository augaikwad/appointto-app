import service from "../../service";
import { setCities } from "../reducers/globalSlice";

export const getCities = (key, callback) => async (dispatch) => {
  try {
    const response = await service.get("Doctor/search_city?Keywords=" + key);
    const { response_code, payload } = response.data;
    if (response_code === 2000) {
      dispatch(setCities(payload));
      if (callback) {
        callback(payload);
      }
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};
