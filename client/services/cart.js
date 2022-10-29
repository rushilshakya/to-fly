import axios from "axios";
import { BASE_PATH } from "../utils/config";

const baseUrl = `${BASE_PATH}api/cart`;

const cartService = {
  getCart: async (user) => {
    const response = await axios.get(baseUrl, user.config);
    return response.data;
  },
  postCart: async (postItem, user) => {
    const response = await axios.post(baseUrl, postItem, user.config);
    return response.data;
  },
  checkoutCart: async (user, address) => {
    const response = await axios.post(
      `${baseUrl}/checkout`,
      address,
      user.config
    );
    return response.data;
  },
};

export default cartService;
