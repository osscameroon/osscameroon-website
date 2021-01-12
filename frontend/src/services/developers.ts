import axios from "axios";
import qs from "querystring";
import { QueryFunctionContext } from "react-query";

import { API_BASE_URL } from "../config";
import { ApiResponse, DeveloperQueryKey, GithubUser } from "../utils/types";

export const searchDevelopers = ({ queryKey }: QueryFunctionContext<DeveloperQueryKey>) => {
  const [, { page = 1, sortType = "", title = "", tools = "" }] = queryKey;
  const searchQuery = `${title} ${tools}`;
  const queryParams: any = {
    page,
  };
  if (searchQuery.trim()) {
    queryParams.query = searchQuery;
  }
  if (sortType) {
    queryParams.sort_type = sortType;
  }

  return axios.get<ApiResponse<GithubUser[]>>(`${API_BASE_URL}/github/users/search?${qs.stringify(queryParams)}`);
};
