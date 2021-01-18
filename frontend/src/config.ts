export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const IS_PRODUCTION = process.env.REACT_APP_ENV === "production";

export const QUERY_STALE_TIME = 1000 * 120; // 2 minutes
export const QUERY_CACHE_TIME = 1000 * 120; // 2 minutes

export const DEFAULT_CACHE_OPTIONS = {
  staleTime: QUERY_STALE_TIME,
  cacheTime: QUERY_CACHE_TIME,
};
