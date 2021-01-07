import axios from "axios";
import { GithubProject, ResponseData, Response } from "../utils/types";
import { API_BASE_URL } from "../config";

const PROJECTS_URL = `${API_BASE_URL}/github/projects`;
const LANGUAGES_URL = `${API_BASE_URL}/github/languages`;

export const searchProject = ({ queryKey }: any): Promise<ResponseData<GithubProject>> => {
  return new Promise(async (resolve, reject) => {
    const [_key, {count, page, filters, sortMethod}] = queryKey;
    const url = `${PROJECTS_URL}/search`;

    try {
      const payload = {
          query: filters.title,
          page: page,
          count: count,
          languages: filters.toolss,
          sort_type: sortMethod
      }

      const response = await axios.post<ResponseData<GithubProject>>(url, payload);
      resolve(response.data);
    } catch (e) {
      reject(e);
    }
  });
}

export const getLanguages = (): Promise<Response<string[]>> => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get<Response<string[]>>(LANGUAGES_URL);
      resolve(response.data);
    } catch (e) {
      reject(e);
    }
  });
}