import { createSlice } from "@reduxjs/toolkit";

const initialState = { message: null, type: null };

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    setNotification(state, action) {
      return { ...action.payload };
    },
  },
});

export const createNotification = (message, type = "NORMAL", time = 2000) => {
  return (dispatch) => {
    dispatch(notificationSlice.actions.setNotification({ message, type }));
    setTimeout(() => {
      dispatch(notificationSlice.actions.setNotification(initialState));
    }, time);
  };
};

export default notificationSlice.reducer;
