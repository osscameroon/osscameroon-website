import axios from "axios";
import { API_BASE_URL } from "../config";

export const findUsers = () => {
  return axios.get(`${API_BASE_URL}/github/projects`);
};
