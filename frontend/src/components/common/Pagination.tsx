import * as React from "react";
import { Row, Col } from "reactstrap";
import { FormattedMessage } from "react-intl";

import Paginate from "../../components/utils/Paginate";
import { PaginationChangeEventData } from "../../utils/types";
import { commonMessages } from "../../locales/messages";

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
  totalItems: number;
  onPageChange: (page: PaginationChangeEventData) => void;
  currentPage: number;
};

const Pagination = ({ currentPage, itemPerPage, onPageChange, position, totalItems }: PaginationProps) => {
  const isTop = position === "top";

  return (
    <Row className="pagination-container" style={isTop ? style.top : style.bottom}>
      <Col className="text-left d-flex align-items-center pl-0">
        <FormattedMessage
          defaultMessage={commonMessages.paginationText.defaultMessage}
          id={commonMessages.paginationText.id}
          values={{
            startResult: (currentPage - 1) * itemPerPage + 1,
            endResult: itemPerPage * currentPage,
            totalResults: totalItems,
            b: (chunks: string) => <span className="font-weight-bold ml-1 mr-1">{chunks}</span>,
          }}
        />
      </Col>
      <Col className="text-right pr-0">
        <Paginate pageLimit={itemPerPage} pageNeighbours={1} totalRecords={totalItems} onPageChanged={onPageChange} />
      </Col>
    </Row>
  );
};

export default Pagination;
