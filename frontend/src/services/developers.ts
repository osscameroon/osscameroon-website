import axios from "axios";
import qs from "querystring";

import { API_BASE_URL } from "../config";
import { ApiResponse, DeveloperQueryParams, GithubUser } from "../utils/types";

export const searchDevelopers = ({ page = 1, sort_type = "", title = "", tools = "" }: DeveloperQueryParams) => {
  const searchQuery = `${title} ${tools}`;
  const queryParams: any = {
    page,
  };
  if (searchQuery.trim()) {
    queryParams.query = searchQuery;
  }
  if (sort_type) {
    queryParams.sort_type = sort_type;
  }

  return axios.get<ApiResponse<GithubUser[]>>(`${API_BASE_URL}/github/users/search?${qs.stringify(queryParams)}`);
};
