import * as React from "react";
import { Button } from "reactstrap";
import {useIntl} from "react-intl";

import {projectMessages} from "../../locales/messages";
import starIcon from '../../assets/icons/star.svg';


type ProjectProps = {
  name: string;
  description: string;
  language: string;
  stars: number;
  link: string;
  type: "small" | "big";
};

const Project = ({ description, language, name, stars, link, type }: ProjectProps) => {
  const { formatMessage } = useIntl();
  const style = {
    card: {
      boxShadow: "var(--border-shadow)",
      padding: "15px 25px 15px 25px",
      borderRadius: "5px",
      height: "150px",
      width: "100%",
    },
    h1: {
      fontSize: "1.125rem",
      color: "var(--primary-color)",
    },
    p: {
      fontSize: "0.875rem",
      height: "50px",
    },
  };

  const isBig = type === "big";

  return (
    <div className="text-left" style={style.card}>
      <div className="row">
        <div className={isBig ? "col-10" : ""}>
          <h1 style={style.h1}>{name}</h1>
          <p style={style.p}>{description}</p>
          <div className="d-flex">
            <div className="project-language">{language}</div>
            <div className="d-flex justify-content-start align-items-center">
              <img alt="star icon" src={starIcon} />
              <span className="font-weight-bold">{stars}</span>
            </div>
          </div>
        </div>

        {isBig ? (
          <div className="col-2 item-center">
            {" "}
            <a href={link} target="_blank" rel="noreferrer"><Button color="primary"> {formatMessage(projectMessages.buttonView)} </Button> </a>
            {" "}
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Project;
