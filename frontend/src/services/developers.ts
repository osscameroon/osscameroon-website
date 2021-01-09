import axios from "axios";
import { API_BASE_URL } from "../config";
import { ApiResponse, GithubUser } from "../utils/types";
import qs from "querystring";

export const searchDevelopers = (page: number, title: string, tools: string) => {
  const searchQuery = `${title} ${tools}`;
  const queryParams: any = {
    page,
  };
  if (searchQuery.trim()) {
    queryParams.query = searchQuery;
  }
  return axios.get<ApiResponse<GithubUser[]>>(`${API_BASE_URL}/github/users/search?${qs.stringify(queryParams)}`);
};
