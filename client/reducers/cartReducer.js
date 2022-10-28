import { createSlice } from "@reduxjs/toolkit";
import cartService from "../services/cart";

const cartSlice = createSlice({
  name: "cart",
  initialState: {},
  reducers: {
    setCart(state, action) {
      return { ...action.payload };
    },
  },
});

export const initializeCart = (user) => {
  return async (dispatch) => {
    if (!user.token) dispatch(cartSlice.actions.setCart({}));
    else {
      try {
        const cart = await cartService.getCart(user);
        dispatch(cartSlice.actions.setCart(cart));
      } catch (e) {
        console.log("something went wrong with get cart");
      }
    }
  };
};

export default cartSlice.reducer;
