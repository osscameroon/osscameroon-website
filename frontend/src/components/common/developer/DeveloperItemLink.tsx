import React from "react";
import { setHttp } from "../../utils/absoluteLink";

type DeveloperItemLinkProps = {
  alt: string;
  text?: string;
  picture: string;
  link: string;
};

const DeveloperItemLink = ({ alt, link, picture, text }: DeveloperItemLinkProps) => {
  return (
    <a className="dark-color" href={setHttp(link)} rel="noreferrer" target="_blank">
      <img alt={alt} src={picture} /> {text || link}
    </a>
  );
};

export default DeveloperItemLink;
