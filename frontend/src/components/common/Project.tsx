import * as React from "react";
import { Button } from "reactstrap";
import { useIntl } from "react-intl";

import { projectMessages } from "../../locales/messages";
import starIcon from "../../assets/icons/star.svg";

type ProjectProps = {
  name: string;
  description: string;
  language: string;
  stars: number;
  link: string;
  type: "small" | "big";
};

const Project = ({ description, language, link, name, stars, type }: ProjectProps) => {
  const { formatMessage } = useIntl();

  const windowWidth = window.innerWidth;

  const isBig = type === "big" && windowWidth >= 700;

  const style = {
    card: {
      boxShadow: "var(--border-shadow)",
      padding: "15px 25px 25px 25px",
      borderRadius: "5px",
      height: isBig ? "160px" : "180px",
      width: "100%",
    },
    h1: {
      fontSize: "1.125rem",
      color: "var(--primary-color)",
      height: isBig ? "25px" : "35px",
    },
    p: {
      fontSize: "0.875rem",
      height: isBig ? "50px" : "60px",
    },
  };

  const displayDescription = description.length <= 150 ? description : `${description.slice(0, 150)}...`;
  const defaultLanguage = "Docs"; // The repo contains only docs

  return (
    <div className="text-left" style={style.card}>
      <div className="row">
        <div className={isBig ? "col-10" : "col"}>
          <h1 style={style.h1}>
            <a href={link} rel="noreferrer" target="_blank">
              {" "}
              {name}{" "}
            </a>
          </h1>
          <p style={style.p}>{displayDescription}</p>
          <div className="d-flex">
            <div className="project-language">{language || defaultLanguage}</div>
            <div className="d-flex justify-content-start align-items-center">
              <img alt="star icon" src={starIcon} />
              <span className="font-weight-bold">{stars}</span>
            </div>
          </div>
        </div>

        {isBig && (
          <div className="col-2 item-center">
            <a href={link} rel="noreferrer" target="_blank">
              <Button color="primary"> {formatMessage(projectMessages.buttonView)} </Button>{" "}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Project;
