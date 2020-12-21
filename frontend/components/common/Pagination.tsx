import * as React from "react";
import { Row, Col } from "reactstrap";

const style = {
  top: {
    borderTop: "5px var(--primary-color) solid",
    borderRadius: "5px 5px 0 0",
    boxShadow: "var(--border-shadow)",
    padding: "8px 15px 8px 15px",
  },
  bottom: {
    margin: " 25px 0 25px 0",
  },
};

type PaginationProps = {
  position: "top" | "bottom";
  itemPerPage: number;
  nbItems: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

const Pagination: React.FunctionComponent<PaginationProps> = (props) => {
  const isTop = props.position === "top";
  const pages: number[] = [];
  const nbPages: number = Math.floor(props.nbItems / props.itemPerPage);

  for (let i = 0; i < nbPages; i++) {
    pages.push(i + 1);
  }

  return (
    <Row style={isTop ? style.top : style.bottom}>
      <Col className="text-left">
        1 - {props.itemPerPage} of more than {props.nbItems} results
      </Col>
      <Col className="text-right">
        {pages.map((value) => (
          <a href="#" key={value} style={value !== props.currentPage ? { color: "var(--dark-color" } : {}} onClick={() => props.onPageChange(value)}>
            <strong>&nbsp; {value} </strong>
          </a>
        ))}
      </Col>
    </Row>
  );
};

export default Pagination;
