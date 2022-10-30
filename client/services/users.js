import axios from "axios";
import { BASE_PATH } from "../utils/config";

const baseUrl = `${BASE_PATH}api/users`;

const users = {
  register: async (credentials) => {
    //add the cart
    credentials.cart = JSON.parse(localStorage.getItem("cart"));
    const response = await axios.post(baseUrl, credentials);
    return response.data;
  },
  me: async (user) => {
    const response = await axios.get(baseUrl, user.config);
    return response.data;
  },
};

export default users;
