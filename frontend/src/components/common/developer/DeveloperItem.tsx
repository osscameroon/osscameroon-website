import React from "react";

type DeveloperItemProps = {
  alt: string;
  text: string;
  picture: string;
};

const DeveloperItem = ({ alt, picture, text }: DeveloperItemProps) => {
  return (
    <span>
      {" "}
      <img alt={alt} src={picture} /> {text}{" "}
    </span>
  );
};

export default DeveloperItem;
