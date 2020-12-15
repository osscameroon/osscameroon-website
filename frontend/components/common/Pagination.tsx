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
  itemPerPage: number
  nbItems: number
  currentPage: number
};

export const Pagination: React.FunctionComponent<PaginationProps> = (props) => {
  const isTop = props.position === "top";
  const pages: any[] = [];
  const nbPages: number = Math.floor(props.nbItems / props.itemPerPage);

  for(let i = 0; i < nbPages; i++) {
    pages.push(i + 1);
  }

  return (
    <div className="row" style={isTop ? style.top : style.bottom}>
      <div className="col text-left">
        1 - {props.itemPerPage} of more than {props.nbItems} results
      </div>
      <div className="col text-right">
        {pages.map((value) => (
          <a href={`#${value}`} style={value !== props.currentPage ? {color: "var(--dark-color"} : {}}>
            <strong>&nbsp; {value} </strong>
          </a>
        ))}
      </div>
    </div>
  );
};