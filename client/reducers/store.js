import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userReducer";
import productReducer from "./productReducer";
import cartReducer from "./cartReducer";
import notificationReducer from "./notificationReducer";
import loadingReducer from "./loadingReducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    products: productReducer,
    cart: cartReducer,
    notification: notificationReducer,
    loading: loadingReducer,
  },
});

export default store;
