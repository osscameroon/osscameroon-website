import React from "react";
import { Col } from "reactstrap";

import intl from "../../utils/i18n";
import Layout from "../../components/layout/layout";

const { useTranslation } = intl;

const Tweet = () => {
  const { t } = useTranslation();

  return (
    <Layout title={t("title:tweets")}>
      <Col className="d-flex justify-content-center align-items-center" sm="12">
        <h1>TWEETS</h1>
      </Col>
    </Layout>
  );
};

export default Tweet;
