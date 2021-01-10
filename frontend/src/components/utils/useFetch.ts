import { useState, useEffect } from "react";
import axios from "axios";
import qs from "querystring";

const useFetch = <T>() => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const buildUrlWithQueryParams = (url: string, params: Record<string, string | number | undefined>) => {
    if (Object.keys(params).length === 0) return url;

    const filteredParams = Object.fromEntries(Object.entries(params).filter(([, value]) => value));

    return `${url}?${qs.stringify(filteredParams)}`;
  };

  const doFetch = async (url: string, params: Record<string, string | number | undefined>): Promise<T | undefined> => {
    setLoading(true);
    try {
      const res = await axios.get(buildUrlWithQueryParams(url, params));
      setLoading(false);
      return res.data;
    } catch (e) {
      setLoading(false);
      setError(e);
    }

    return;
  };

  useEffect(() => {
    return () => {
      // TODO Cancel axios call;
    };
  }, []);

  return { error, loading, doFetch };
};

export default useFetch;
