import React from "react";
import { Alert, Col, Row } from "reactstrap";
import { useIntl } from "react-intl";

import { commonMessages } from "../../locales/messages";

const EmptyData = () => {
  const { formatMessage } = useIntl();

  return (
    <Row>
      <Col>
        <Alert className="text-center" color="danger">
          {formatMessage(commonMessages.listEmpty)}
        </Alert>
      </Col>
    </Row>
  );
};

export { EmptyData };
