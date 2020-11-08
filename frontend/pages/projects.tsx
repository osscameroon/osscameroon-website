import { Col } from "reactstrap";

import { Layout } from "../components/layout/layout";

export const Home = (): JSX.Element => (
  <Layout title="OSS Cameroon - Projects">
    <Col className="d-flex justify-content-center align-items-center" sm="12">
      <h1>PROJECTS</h1>
    </Col>
  </Layout>
);

export default Home;
