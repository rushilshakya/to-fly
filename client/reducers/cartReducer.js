import { createSlice } from "@reduxjs/toolkit";
import cartService from "../services/cart";

const cartInitialState = { address: null, order_detail: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState: { ...cartInitialState },
  reducers: {
    setCart(state, action) {
      return { ...action.payload };
    },
    updateCart(state, action) {
      return {
        ...state,
        order_detail: state.order_detail.map((x) =>
          x.id === action.payload.id ? action.payload : x
        ),
      };
    },
    addCart(state, action) {
      return {
        ...state,
        order_detail: [...state.order_detail, action.payload],
      };
    },
    logOutCart() {
      return { ...cartInitialState };
    },
  },
});

export const initializeCart = () => {
  return async (dispatch, getState) => {
    const user = getState().user;
    if (user.token) {
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
      let addedQuantity;
      let productExistsInCart = false;
      if (cart.order_detail.length) {
        let currentProductInCart = cart.order_detail.find(
          (x) => x.id === product.id
        );
        if (currentProductInCart) {
          addedQuantity = currentProductInCart.quantity + 1;
          productExistsInCart = true;
        } else addedQuantity = 1;
      } else {
        addedQuantity = 1;
      }
      try {
        const postProduct = { product_id: product.id, quantity: addedQuantity };
        const changedProduct = await cartService.postCart(postProduct, user);

        if (productExistsInCart)
          dispatch(cartSlice.actions.updateCart(changedProduct));
        else dispatch(cartSlice.actions.addCart(changedProduct));
      } catch (e) {
        console.log("something went wrong with get cart");
      }
    }
  };
};

export const checkoutCart = (address) => {
  return async (dispatch, getState) => {
    const user = getState().user;
    if (user.token) {
      try {
        const cart = await cartService.checkoutCart(user, address);
        dispatch(cartSlice.actions.setCart(cart));
      } catch (e) {
        console.log("something went wrong with checkout cart");
      }
    }
  };
};

export const { logOutCart } = cartSlice.actions;
export default cartSlice.reducer;
