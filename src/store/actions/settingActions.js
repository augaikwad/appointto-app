import service from "../../service";
import { setLoading } from "../reducers/globalSlice";
import { setPrintingSettings } from "../reducers/settingSlice";

export const getPrintingSetting = (id_doctor) => async (dispatch) => {
  try {
    const response = await service.get(
      "Doctor/get_printing_setting?DoctorId=" + id_doctor
    );
    const { response_code, payload } = response.data;
    if (response_code === 2000) {
      dispatch(setPrintingSettings(payload));
    }
  } catch (error) {
    // Handle error here
    console.error("Error fetching user data:", error);
  }
};
