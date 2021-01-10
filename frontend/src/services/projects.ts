import axios from "axios";
import { GithubProject, ResponseData, Response, ProjectQueryKey } from "../utils/types";
import { API_BASE_URL } from "../config";
import { QueryFunctionContext } from "react-query";

const PROJECTS_URL = `${API_BASE_URL}/github/projects`;
const LANGUAGES_URL = `${API_BASE_URL}/github/languages`;

export const searchProject = async ({ queryKey }: QueryFunctionContext<ProjectQueryKey>): Promise<ResponseData<GithubProject>> => {
  const [, { count, filters, page, sortMethod }] = queryKey;
  const url = `${PROJECTS_URL}/search`;

  try {
    const payload = {
      query: filters?.title ? filters.title : "",
      page,
      count,
      languages: filters?.tools ? filters.tools : [],
      sort_type: sortMethod || "",
    };

    const response = await axios.post<ResponseData<GithubProject>>(url, payload);
    return response.data;
  } catch (e) {
    throw new Error(e);
  }
};

export const getLanguages = async (): Promise<Response<string[]>> => {
  try {
    const response = await axios.get<Response<string[]>>(LANGUAGES_URL);
    return response.data;
  } catch (e) {
    throw new Error(e);
  }
};
