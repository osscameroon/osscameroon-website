/**
 * Convert provide link to a valid http absolute link
 * @param link
 */
export const setHttp = (link: string): string => {
  if (link.search(/^http[s]?:\/\//) === -1) {
    link = "http://" + link;
  }
  return link;
};
