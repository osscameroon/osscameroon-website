import axios from "axios";
import { GithubProject, ResponseData, Response, ProjectQueryKey } from "../utils/types";
import { API_BASE_URL } from "../config";
import { QueryFunctionContext } from "react-query";

const PROJECTS_URL = `${API_BASE_URL}/github/projects`;
const LANGUAGES_URL = `${API_BASE_URL}/github/languages`;

export const getOurProject = () => [
  {
    description: "Make a contribution to any of OSS Cameroon GitHub project and earn some Yotas.",
    name: "MiniYotas",
    html_url: "https://miniyotas.osscameroon.com",
  },
  {
    description: "blog for osscameroon",
    name: "OssBlog",
    html_url: "https://blog.osscameroon.com",
  },
  {
    description: "Company ratings and salaries in Cameroon",
    name: "Jobsika",
    html_url: "https://jobsika.cm",
  },
  {
    description: "camerapps lists useful applications, whatsapp, facebook, telegram groups or channel for Cameroonians.",
    name: "CamerApps",
    html_url: "https://camerapps.com",
  },
  {
    description: "You are a cameroonian developer, please take this 3 minutes survey",
    name: "Dev-Survey",
    html_url: "http://devsurvey.osscameroon.com",
  },
  {
    description: "Get information about programming languages through REST API or GraphQL.",
    name: "ProLang-Api",
    html_url: "https://www.prolanghistory.com",
  },
];

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
  } catch (e: any) {
    throw new Error(e);
  }
};

export const getLanguages = async (): Promise<Response<string[]>> => {
  try {
    const response = await axios.get<Response<string[]>>(LANGUAGES_URL);
    return response.data;
  } catch (e: any) {
    throw new Error(e);
  }
};
