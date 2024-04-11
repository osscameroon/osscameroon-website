export type GetUsersRequestParameter = {
  count?: number;
  page?: number;
  query?: string;
  sort_type: 'popularity' | 'alphabetic' | 'most_recent'
};

