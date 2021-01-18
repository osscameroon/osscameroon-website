import { useLocation } from "react-router";

const useQueryString = <T>(): T => {
  const { search } = useLocation();

  const entries = search
    .replace("?", "")
    .split("&")
    .map((query) => {
      const querySplit = query.split("=");
      if (querySplit.length !== 2) return null;

      return [querySplit];
    })
    .filter((object) => object !== null)
    .flat(1);

  // @ts-ignore
  return Object.fromEntries(entries);
};

export { useQueryString };
