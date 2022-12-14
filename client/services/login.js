import axios from "axios";
import { BASE_PATH } from "../utils/config";

const baseUrl = `${BASE_PATH}api/login`;

const login = {
  login: async (credentials) => {
    const response = await axios.post(baseUrl, credentials);
    return response.data;
  },
};

export default login;
