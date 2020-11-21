import * as React from "react";

type ProjectProps = {
  name: string
  description: string
  language: string
  stars: number
}

const Project: React.FunctionComponent<ProjectProps> = (props) => {
  return (
    <div className="text-left" style={{boxShadow: "var(--border-shadow)", padding: "15px 25px 15px 25px", borderRadius: "5px", height: "150px"}}>
      <h1 style={{fontSize: "1.125rem", color: "var(--primary-color)"}}>{props.name}</h1>
      <p style={{fontSize: "0.875rem", height: "50px"}}>{props.description}</p>
      <div>
        <span>{props.language}</span>&emsp;
        <span style={{verticalAlign: "middle"}}><img alt="star icon" src="/static/icons/star.svg" /> <strong>{props.stars}</strong></span>
      </div>
    </div>
  );
};

export default Project;