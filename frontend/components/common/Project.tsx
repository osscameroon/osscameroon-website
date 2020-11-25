import * as React from "react";
import { Badge } from "reactstrap";

type ProjectProps = {
  name: string
  description: string
  language: string
  stars: number
}

const Project: React.FunctionComponent<ProjectProps> = (props) => {
  const style = {
    border: {
      boxShadow: "var(--border-shadow)",
      padding: "15px 25px 15px 25px",
      borderRadius: "5px",
      height: "150px"
    },
    h1: {
      fontSize: "1.125rem",
      color: "var(--primary-color)",
    },
    p: {
      fontSize: "0.875rem",
      height: "50px"
    }
  };

  return (
    <div className="text-left" style={style.border}>
      <h1 style={style.h1}>{props.name}</h1>
      <p style={style.p}>{props.description}</p>
      <div>
        <span><Badge color="secondary">{props.language}</Badge></span>&emsp;
        <span style={{verticalAlign: "middle"}}><img alt="star icon" src="/static/icons/star.svg" /> <strong>{props.stars}</strong></span>
      </div>
    </div>
  ); 
};

export default Project;