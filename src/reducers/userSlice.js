// userSlice.js
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const userSlice = createSlice({
  name: "user",
  initialState: {
    id_doctor: 0,
    id_clinic: 0,
    user_name: "",
  },
  reducers: {
    setUser: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

// Async action to fetch user data from the API
export const fetchUserData = () => async (dispatch) => {
  try {
    const response = await axios.get("https://api.example.com/user"); // Replace with your API endpoint
    dispatch(setUser(response.data));
  } catch (error) {
    // Handle error here
    console.error("Error fetching user data:", error);
  }
};

export default userSlice.reducer;
