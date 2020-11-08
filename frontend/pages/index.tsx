import React from "react";
import { Col } from "reactstrap";

import { Layout } from "../components/layout/layout";

export const Home = (): JSX.Element => (
  <Layout title="OSS Cameroon">
    <Col className="d-flex justify-content-center align-items-center" sm="12">
      <h1>WELCOME</h1>
    </Col>
  </Layout>
);

export default Home;
