import { createSlice } from "@reduxjs/toolkit";
import productService from "../services/products";

const productSlice = createSlice({
  name: "products",
  initialState: [],
  reducers: {
    setProducts(state, action) {
      return [...action.payload];
    },
  },
});

export const initializeProducts = () => {
  return async (dispatch) => {
    try {
      const products = await productService.getProducts();
      dispatch(productSlice.actions.setProducts(products));
    } catch (e) {
      console.log("something went wrong with get products");
    }
  };
};

export default productSlice.reducer;
