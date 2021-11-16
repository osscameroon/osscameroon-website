import { Button } from "reactstrap";
import { useIntl } from "react-intl";

import { projectMessages } from "../../locales/messages";
import starIcon from "../../assets/icons/star.svg";
import starLightIcon from "../../assets/icons/star-light.svg";
import { useContext } from "react";
import { ThemeContext, DARK } from "../utils/ThemeProvider";

type ProjectProps = {
  name: string;
  description: string;
  issues: number;
  language: string;
  stars: number;
  link: string;
  type: "small" | "big";
};

const Project = ({ description, issues, language, link, name, stars, type }: ProjectProps) => {
  const { formatMessage } = useIntl();
  const themeContext = useContext(ThemeContext);

  const windowWidth = window.innerWidth;

  const isBig = type === "big" && windowWidth >= 700;

  const style = {
    card: {
      boxShadow: "var(--border-shadow)",
      padding: "15px 25px 25px 25px",
      borderRadius: "5px",
      minHeight: isBig ? "160px" : "180px",
      width: "100%",
      backgroundColor: "var(--card-bg)",
    },
    h1: {
      fontSize: "1.125rem",
      color: "var(--primary-color)",
      minHeight: isBig ? "25px" : "35px",
    },
    p: {
      fontSize: "0.875rem",
      minHeight: isBig ? "50px" : "60px",
    },
  };

  const displayDescription = description.length <= 110 ? description : `${description.slice(0, 110)}...`;
  const defaultLanguage = "Docs"; // The repo contains only docs

  return (
    <div className="text-left" style={style.card}>
      <div className="row">
        <div className={isBig ? "col-10" : "col"}>
          <h1 style={style.h1}>
            <a href={link} rel="noreferrer" target="_blank">
              {name}
            </a>
          </h1>
          <p style={style.p}>{displayDescription}</p>
          <div className="d-flex flex-column flex-sm-row justify-content-start justify-content-lg-center flex-wrap">
            <div className="project-language">{language || defaultLanguage}</div>
            <div className="project-language"> Issues {issues}</div>
            <div className="d-flex justify-content-start align-items-center">
              <img alt="star icon" src={themeContext.theme === DARK ? starLightIcon : starIcon} />
              &ensp;
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
