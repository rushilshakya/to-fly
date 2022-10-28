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

export const initializeCart = () => {
  return async (dispatch, getState) => {
    const user = getState().user;
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

export const addToCart = (product) => {
  return async (dispatch, getState) => {
    const user = getState().user;
    const cart = getState().cart;
    if (!user.token) console.log("no user token");
    else {
      let currentProductInCart = cart.products.find((x) => x.id === product.id);
      let addedQuantity = currentProductInCart.order_detail.quantity + 1;
      try {
        const postProduct = { product_id: product.id, quantity: addedQuantity };
        await cartService.postCart(postProduct, user);
        const cart = await cartService.getCart(user);
        dispatch(cartSlice.actions.setCart(cart));
      } catch (e) {
        console.log("something went wrong with get cart");
      }
    }
  };
};

export default cartSlice.reducer;
