export type GetUsersRequestParameter = {
  count?: string;
  page?: string;
  query?: string;
  sort_type?: 'popularity' | 'alphabetic' | 'most_recent'
};

export type GetProjectsRequestParameter = {
  count?: string;
  page?: string;
  query?: string;
  sort_type?: 'popularity' | 'alphabetic' | 'most_recent';
  languages?: string;
};

