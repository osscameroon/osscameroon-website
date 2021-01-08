import * as React from "react";
import { Row, Col } from "reactstrap";
import { useIntl } from "react-intl";

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
};

const Pagination = ({ itemPerPage, onPageChange, position, totalItems }: PaginationProps) => {
  const { formatMessage } = useIntl();
  const isTop = position === "top";

  return (
    <Row style={isTop ? style.top : style.bottom}>
      <Col className="text-left">
        {formatMessage(commonMessages.paginationText, { startResult: 1, endResult: itemPerPage, totalResults: totalItems })}
      </Col>
      <Col className="text-right">
        <Paginate pageLimit={itemPerPage} pageNeighbours={1} totalRecords={totalItems} onPageChanged={onPageChange} />
      </Col>
    </Row>
  );
};

export default Pagination;
