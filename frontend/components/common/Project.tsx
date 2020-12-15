import * as React from "react";
import { Badge, Button } from "reactstrap";

type ProjectProps = {
  name: string;
  description: string;
  language: string;
  stars: number;
  type: "small" | "big"
};

export const Project: React.FunctionComponent<ProjectProps> = (props) => {
  const style = {
    card: {
      boxShadow: "var(--border-shadow)",
      padding: "15px 25px 15px 25px",
      borderRadius: "5px",
      height: "150px",
      width: "100%"
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
          <span>
            <Badge color="secondary">{props.language}</Badge>
          </span>
          &emsp;
          <span style={{ verticalAlign: "middle" }}>
            <img alt="star icon" src="/static/icons/star.svg" /> <strong>{props.stars}</strong>
          </span>
        </div>

        {isBig ?
          <div className="col-2 item-center"> <Button color="primary"> View </Button> </div> : <></>
        }
      </div>
    </div>
  );
};
