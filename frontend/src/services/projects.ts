import axios from "axios";
import { GithubProject } from "../utils/types";
import { API_BASE_URL } from "../config";

const PROJECTS_PATH = `${API_BASE_URL}/github/projects`;

export const searchProject = ({ queryKey }: any): Promise<GithubProject[]> => {
  return new Promise(async (resolve, reject) => {
    const [_key, {query, count, page}] = queryKey;
    const params = `count=${count}&page=${page}&${query ? 'query='+query: ''}`;
    const url = `${PROJECTS_PATH}/search?${params}`;

    try {
      const response = await axios.get<GithubProject[]>(url);
      resolve(response.data);
    } catch (e) {
      reject(e);
    }
  });
}