import { createSlice } from "@reduxjs/toolkit";

const loadingSlice = createSlice({
  name: "loading",
  initialState: {},
  reducers: {
    setLoading(state, action) {
      let newState = { ...state };

      for (const [key, value] of Object.entries(action.payload)) {
        if (value) newState[key] = value;
        else delete newState[key];
      }

      return newState;
    },
  },
});

export const { setLoading } = loadingSlice.actions;
export default loadingSlice.reducer;
