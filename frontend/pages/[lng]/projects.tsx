import React from "react";
import { Col } from "reactstrap";

import intl from "@utils/i18n";
import Layout from "@components/layout/layout";

const { useTranslation } = intl;

const Project = () => {
  const { t } = useTranslation();

  return (
    <Layout title={t("title:projects")}>
      <Col className="d-flex justify-content-center align-items-center" sm="12">
        <h1>PROJECTS</h1>
      </Col>
    </Layout>
  );
};

Project.getInitialProps = async () => ({
  namespacesRequired: ["title"],
});

export default Project;
