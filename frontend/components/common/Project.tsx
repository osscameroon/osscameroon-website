import * as React from "react";
import { Button } from "reactstrap";
import intl from "@utils/i18n";

const { useTranslation } = intl;

type ProjectProps = {
  name: string;
  description: string;
  language: string;
  stars: number;
  type: "small" | "big";
};

const Project = (props: ProjectProps) => {
  const { t } = useTranslation("project");
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

  const isBig = props.type == "big";

  return (
    <div className="text-left" style={style.card}>
      <div className="row">
        <div className={isBig ? "col-10" : ""}>
          <h1 style={style.h1}>{props.name}</h1>
          <p style={style.p}>{props.description}</p>
          <div className="d-flex">
            <div className="project-language">{props.language}</div>
            <div className="d-flex justify-content-start align-items-center">
              <img alt="star icon" src="/static/icons/star.svg" />
              <span className="font-weight-bold">{props.stars}</span>
            </div>
          </div>
        </div>

        {isBig ? (
          <div className="col-2 item-center">
            {" "}
            <Button color="primary"> {t("buttonView")} </Button>{" "}
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

Project.getInitialProps = async () => ({
  namespacesRequired: ["project"],
});

export default Project;
