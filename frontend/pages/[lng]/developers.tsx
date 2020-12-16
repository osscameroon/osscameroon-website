import { Col } from "reactstrap";

import intl from "../../utils/i18n";
import Layout from "../../components/layout/layout";

const { useTranslation } = intl;

const Developers = () => {
  const { t } = useTranslation();

  return (
    <Layout title={t("title:developers")}>
      <Col className="d-flex justify-content-center align-items-center" sm="12">
        <h1>DEVELOPERS</h1>
      </Col>
    </Layout>
  );
};

export default Developers;
