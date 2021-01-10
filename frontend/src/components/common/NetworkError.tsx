import React from "react";
import { Alert, Col, Row } from "reactstrap";
import { useIntl } from "react-intl";

import { commonMessages } from "../../locales/messages";

const NetworkError = () => {
  const { formatMessage } = useIntl();

  return (
    <Row>
      <Col>
        <Alert color="danger">
          <div className="font-weight-bold">{formatMessage(commonMessages.errorTitle)}</div>
          <div>{formatMessage(commonMessages.errorMessage)}</div>
        </Alert>
      </Col>
    </Row>
  );
};

export default NetworkError;
