import { Col } from "reactstrap";

import { Layout } from "../../components/layout/layout";

export const Home = (): JSX.Element => (
  <Layout title="OSS Cameroon - Tweets">
    <Col className="d-flex justify-content-center align-items-center" sm="12">
      <h1>TWEETS</h1>
    </Col>
  </Layout>
);

export default Home;
