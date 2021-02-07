import axios from "axios";
import { QueryFunctionContext } from "react-query";

import { API_BASE_URL } from "../config";
import { ApiResponse, DeveloperQueryKey, GithubUser } from "../utils/types";

export const searchDevelopers = ({ queryKey }: QueryFunctionContext<DeveloperQueryKey>) => {
  const [, { count = 21, page = 1, sortType = "", title = "", tools = "" }] = queryKey;
  const searchQuery = `${title} ${tools}`;
  const requestBody: any = {
    count,
    page,
  };
  if (searchQuery.trim()) {
    requestBody.query = searchQuery;
  }
  if (sortType) {
    requestBody.sort_type = sortType;
  }

  return axios.post<ApiResponse<GithubUser[]>>(`${API_BASE_URL}/github/users/search`, requestBody);
};
