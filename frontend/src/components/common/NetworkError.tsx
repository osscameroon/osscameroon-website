import React from "react";
import { Alert, Col, Row } from "reactstrap";

const NetworkError = () => {
  return (
    <Row>
      <Col>
        <Alert color="danger">
          <div className="font-weight-bold">Oops</div>
          <div>An error occured while processing the request</div>
        </Alert>
      </Col>
    </Row>
  );
};

export default NetworkError;
