import * as React from "react";
import { Row, Col } from "reactstrap";

import intl from "@utils/i18n";

const { useTranslation } = intl;

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

const Pagination = ({ currentPage, itemPerPage, nbItems, onPageChange, position }: PaginationProps) => {
  const { t } = useTranslation();
  const isTop = position === "top";
  const nbPages: number = Math.floor(nbItems / itemPerPage);
  const pages = new Array(nbPages).fill(0);

  return (
    <Row style={isTop ? style.top : style.bottom}>
      <Col className="text-left">{t("pagination-text", { startResult: 1, endResult: itemPerPage, totalResults: nbItems })}</Col>
      <Col className="text-right">
        {pages.map((value, index) => (
          <a href="#" key={`page${index}`} style={index + 1 !== currentPage ? { color: "var(--dark-color" } : {}} onClick={() => onPageChange(value)}>
            <strong>&nbsp; {index + 1} </strong>
          </a>
        ))}
      </Col>
    </Row>
  );
};

Pagination.getInitialProps = async () => ({
  namespacesRequired: ["common"],
});

export default Pagination;
