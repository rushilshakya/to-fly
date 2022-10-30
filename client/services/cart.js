import axios from "axios";
import { BASE_PATH } from "../utils/config";
import { notification } from "../utils/notificationHelper";

const baseUrl = `${BASE_PATH}api/cart`;

const cartService = {
  getCart: async (user) => {
    const response = await axios.get(baseUrl, user.config);
    return response.data;
  },
  postCart: async (postItem, user) => {
    notification.setLoading({ [postItem.id]: true });
    const response = await axios.post(baseUrl, postItem, user.config);
    notification.setLoading({ [postItem.id]: false });
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
