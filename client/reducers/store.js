import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userReducer";
import productReducer from "./productReducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    products: productReducer,
  },
});

export default store;
