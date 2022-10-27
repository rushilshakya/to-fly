import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login";

const userSlice = createSlice({
  name: "user",
  initialState: { token: null },
  reducers: {
    storeUser(state, action) {
      return { ...action.payload };
    },
  },
});

// export const { storeUser } = userSlice.actions;

export const populateUser = (user) => {
  return async (dispatch) => {
    localStorage.setItem("loggedUserJSON", JSON.stringify(user));
    dispatch(userSlice.actions.storeUser(user));
  };
};

export const initializeUser = () => {
  return async (dispatch) => {
    const loggedUserJSON = localStorage.getItem("loggedUserJSON");
    if (loggedUserJSON) {
      const parsedLoggedUserJSON = JSON.parse(loggedUserJSON);
      try {
        const user = await loginService.me(parsedLoggedUserJSON);
        dispatch(userSlice.actions.storeUser(user));
      } catch (e) {
        console.log("token is not valid.  removing stored token");
        localStorage.removeItem("loggedUserJSON");
      }
    }
  };
};

export default userSlice.reducer;
