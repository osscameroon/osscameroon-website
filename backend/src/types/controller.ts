export type GetUsersRequestParameter = {
  count?: string;
  page?: string;
  query?: string;
  sort_type?: 'popularity' | 'alphabetic' | 'most_recent';
};

export type GetProjectsRequestParameter = {
  count?: string;
  languages?: string;
  page?: string;
  query?: string;
  sort_type?: 'popularity' | 'alphabetic' | 'most_recent';
};

export type HttpResponseData<T> = {
  result: {
    hits: T[];
    limit: number;
    nbHits: number;
    page: number;
    totalPages: number;
  };
};
