import React from "react";
import { Col } from "reactstrap";

import intl from "../../utils/i18n";
import { Layout } from "../../components/layout/layout";

const { useTranslation } = intl;

export const Home = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <Layout title={t("title:home")}>
      <Col className="d-flex justify-content-center align-items-center" sm="12">
        <h1>WELCOME</h1>
      </Col>
    </Layout>
  );
};

Home.getInitialProps = async () => ({
  namespacesRequired: ["common"],
});

export default Home;
