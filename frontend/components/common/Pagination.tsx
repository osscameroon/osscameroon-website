import * as React from "react";

const style = {
  top: {
    borderTop: "5px var(--primary-color) solid",
    borderRadius: "5px 5px 0 0",
    boxShadow: "var(--border-shadow)",
    padding: "8px 15px 8px 15px"
  },
  bottom: {
    margin: " 25px 0 25px 0"
  }
};

type PaginationProps = {
  position: "top" | "bottom"
};

export const Pagination: React.FunctionComponent<PaginationProps> = (props) => {
  const isTop = props.position === "top";

  return (
    <div className="row" style={isTop ? style.top : style.bottom}>
      <div className="col text-left">
        1-12 of more than 200 results
      </div>
      <div className="col text-right">
        1 2 3 4 5 ... 50
      </div>
    </div>
  );
};