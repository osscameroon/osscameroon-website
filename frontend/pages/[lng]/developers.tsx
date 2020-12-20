import React from "react";
import { Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { BsArrowClockwise, BsXCircle } from "react-icons/bs";

import intl from "@utils/i18n";
import Layout from "@components/layout/layout";
import Breadcrumb from "@components/common/Breadcrumb";
import TagInput, { TagInputData } from "@components/common/TagInput";

const { useTranslation } = intl;

const tags: TagInputData[] = [
  { id: "python", name: "Python" },
  { id: "django", name: "Django" },
  { id: "react", name: "React.js" },
];
const suggestions: TagInputData[] = [
  { id: "java", name: "Java" },
  { id: "typescript", name: "Typescript" },
  { id: "nodejs", name: "Node.js" },
  { id: "php", name: "PHP" },
  { id: "csharp", name: "C-Sharp" },
  { id: "graphql", name: "GraphQL" },
  { id: "css", name: "CSS" },
  { id: "html", name: "HTML" },
];

const Developers = () => {
  const { t } = useTranslation();

  const onTagInputChange = (values: TagInputData[]) => {
    // eslint-disable-next-line no-console
    console.log(values);
  };

  return (
    <Layout title={t("title:developers")}>
      <Breadcrumb links={[{ title: "Developers", href: "" }]} />
      <Container id="developers-list">
        <Row style={{ marginTop: "30px" }}>
          <Col md="3">
            <div className="side-card filter-section">
              <div className="d-flex justify-content-between">
                <div className="bold">Filters</div>
                <div className="cursor-pointer text-color-main">
                  Reset <BsArrowClockwise />
                </div>
              </div>
              <div className="selected-title d-flex justify-content-between align-items-center mt-3 mb-3">
                <div className="bold w-75">Full Stack Web Developer</div>
                <div className="cursor-pointer font-weight-bold">
                  <BsXCircle />
                </div>
              </div>
              <div className="dropdown-divider" />
              <Form>
                <FormGroup>
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" placeholder="Full Stack Web Developer" type="text" />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="tools">Tools</Label>
                  <TagInput defaultValues={tags} suggestions={suggestions} onChange={onTagInputChange} />
                </FormGroup>
              </Form>
            </div>
          </Col>
          <Col md="9">Developers List</Col>
        </Row>
      </Container>
    </Layout>
  );
};

Developers.getInitialProps = async () => ({
  namespacesRequired: ["title"],
});

export default Developers;
