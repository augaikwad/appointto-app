import service from "../../service";
import { setSpeciality } from "../reducers/doctorSlice";
import cogoToast from "cogo-toast";
const toastOption = { hideAfter: 5, position: "top-right" };

export const getSpeciality = () => async (dispatch) => {
  try {
    const response = await service.get("Doctor/get_speciality");
    const { response_code, message, payload } = response.data;
    if (response_code === 2000) {
      dispatch(setSpeciality(payload));
    } else {
      cogoToast.error(message, toastOption);
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};
