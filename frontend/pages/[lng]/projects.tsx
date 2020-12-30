import React, { useState } from "react";
import { Form, Button, FormGroup, Input, Label, Container, Row, Col } from "reactstrap";
import Select from "react-select";
import { BsArrowClockwise } from "react-icons/bs";

import Layout from "@components/layout/layout";
import Project from "@components/common/Project";
import Pagination from "@components/common/Pagination";
import Breadcrumb from "@components/common/Breadcrumb";
import TagInput, { TagInputData } from "@components/common/TagInput";
import { PROJECTS } from "@fixtures/home";
import { SUGGESTIONS, TAGS } from "@fixtures/developers";
import intl from "@utils/i18n";

const { useTranslation } = intl;

const orderOptions = [
  { value: "mp", label: "project:mostPopularOption" },
  { value: "mr", label: "project:mostRecentOption" },
  { value: "alpha", label: "project:alphabeticalOption" },
];

export const ProjectPage = (): JSX.Element => {
  const [projectTitle, setProjectTitle] = useState("");
  const [languages, setLanguages] = useState<TagInputData[]>(TAGS);

  const { t } = useTranslation(["project", "title"]);

  const translatedOrderOptions = orderOptions.map((option) => ({
    ...option,
    label: t(option.label),
  }));

  const onPageChange = (page: number) => {
    // Do something with page
    // eslint-disable-next-line no-console
    console.log(page);
  };

  const onTitleChange = (event) => {
    setProjectTitle(event.target.value);
  };

  const onLanguageTagChange = (values: TagInputData[]) => {
    // eslint-disable-next-line no-console
    console.log("Languages : ", values);
    setLanguages(values);
  };

  const onFilterSubmit = () => {
    const input = {
      title: projectTitle,
      tools: languages.map((value) => value.id),
    };

    // eslint-disable-next-line no-console
    console.log(input);
  };

  return (
    <Layout title={t("title:projects")}>
      <Breadcrumb links={[{ title: t("title:projects"), href: "" }]} />

      <Container id="project-list">
        <Row className="mt-30">
          <Col md="3">
            <div className="side-card">
              <div className="d-flex justify-content-between mb-3">
                <div className="bold">{t("project:filterTitle")}</div>
                <div className="cursor-pointer text-color-main">
                  {t("project:btnReset")} <BsArrowClockwise />
                </div>
              </div>
              <Form>
                <FormGroup>
                  <Label className="font-weight-bold" htmlFor="title">
                    {t("project:titleLabel")}
                  </Label>
                  <Input id="title" placeholder={t("project:titleHint")} type="text" value={projectTitle} onChange={onTitleChange} />
                </FormGroup>
                <FormGroup>
                  <Label className="font-weight-bold" htmlFor="languages">
                    {t("project:languageLabel")}
                  </Label>
                  <TagInput defaultValues={TAGS} suggestions={SUGGESTIONS} onChange={onLanguageTagChange} />
                </FormGroup>

                <FormGroup className="text-center pt-4">
                  <Button color="primary" onClick={onFilterSubmit}>
                    {t("project:btnFilter")}
                  </Button>
                </FormGroup>
              </Form>
            </div>

            <div className="side-card">
              <h4 className="bold">{t("project:sortTitle")}</h4>
              <Form>
                <FormGroup>
                  <Select options={translatedOrderOptions} />
                </FormGroup>
              </Form>
            </div>
          </Col>

          <Col md="9">
            <div id="project-row-content">
              <Pagination currentPage={1} itemPerPage={12} nbItems={40} position="top" onPageChange={onPageChange} />
              {PROJECTS.map((project, i) => (
                <Row className="project-row" key={i}>
                  <Project description={project.description} language={project.language} name={project.name} stars={project.stars} type="big" />
                </Row>
              ))}
              <Pagination currentPage={1} itemPerPage={12} nbItems={40} position="bottom" onPageChange={onPageChange} />
            </div>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

ProjectPage.getInitialProps = async () => ({
  namespacesRequired: ["title", "project"],
});

export default ProjectPage;
