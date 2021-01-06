export type LocaleMessages = {
  [key: string]: {
    [prop: string]: string
  }
};

export type ObjectOfString = { [key: string]: [string] };

export type ApplicationError = {
  errorType: string,
  message: ObjectOfString | string,
};

export type RouteConfig = {
  path: string;
  exact: boolean;
  name: string;
  component: any;
};

export type DeveloperData = {
  id: string;
  title: string;
  name: string;
  picture: string | null;
  tools: string[];
};

export type DeveloperDetailData = {
  id: string;
  title: string;
  name: string;
  picture: string | null;
  tools: string[];
  github: string;
  url?: string;
  twitter?: string;
  linkedin?: string;
  email?: string;
  summary?: string;
  yearsOfExperiences?: number;
  availabilities?: string[];
  location?: string;
};

export type ApiResponse<T> = {
  code: number;
  status: "success" | "failed";
  result: {
    hits: T;
    offset: number;
    limit: number;
    nbHits: number;
  };
};

export type GithubUser = {
  email: string;
  public_gists: number;
  bio: string;
  name: string;
  url: string;
  id: number;
  location: string;
  starred_url: string;
  followers_url: string;
  gravatar_id: string;
  twitter_username?: any;
  public_repos: number;
  avatar_url: string;
  following_url: string;
  company: string;
  received_events_url: string;
  updated_at: string;
  node_id: string;
  blog: string;
  hireable: boolean;
  subscriptions_url: string;
  type: string;
  html_url: string;
  organizations_url: string;
  login: string;
  site_admin: boolean;
  gists_url: string;
  repos_url: string;
  followers: number;
  following: number;
  created_at: string;
  events_url: string;
};

export type PaginationChangeEventData = {
  currentPage: number;
  totalPages: number;
  pageLimit: number;
  totalRecords: number;
};
