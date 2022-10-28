import axios from "axios";
import { BASE_PATH } from "../utils/config";

const baseUrl = `${BASE_PATH}api/products`;

const products = {
  getProducts: async () => {
    const response = await axios.get(baseUrl);
    return response.data;
  },
};

export default products;
