import { createSlice } from "@reduxjs/toolkit";
// import loginService from "../services/login";

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
    localStorage.setItem("user", JSON.stringify(user));
    dispatch(userSlice.actions.storeUser(user));
  };
};

// export const initializeUser = () => {
//   return async (dispatch) => {
//     const user = await noteService.getAll();
//     dispatch(setNotes(notes));
//   };
// };

export default userSlice.reducer;
