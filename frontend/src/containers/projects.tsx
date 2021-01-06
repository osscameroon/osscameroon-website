import React, { useState } from "react";
import { Form, Button, FormGroup, Input, Label, Container, Row, Col } from "reactstrap";
import Select from "react-select";
import { BsArrowClockwise } from "react-icons/bs";
import {useIntl} from "react-intl";

import Layout from "../components/layout/layout";
import Project from "../components/common/Project";
import Pagination from "../components/common/Pagination";
import Breadcrumb from "../components/common/Breadcrumb";
import TagInput, { TagInputData } from "../components/common/TagInput";
import { PROJECTS } from "../fixtures/home";
import { SUGGESTIONS, TAGS } from "../fixtures/developers";
import {projectMessages, titleMessages} from "../locales/messages";
import {PaginationChangeEventData} from "../utils/types";

type OrderOption = {
  value: string;
  label: keyof typeof projectMessages
}

const orderOptions: OrderOption[] = [
  { value: "mp", label: "mostPopularOption" },
  { value: "mr", label: "mostRecentOption" },
  { value: "alpha", label: "alphabeticalOption" },
];

export const ProjectPage = (): JSX.Element => {
  const [projectTitle, setProjectTitle] = useState("");
  const [languages, setLanguages] = useState<TagInputData[]>(TAGS);
  const { formatMessage} = useIntl();

  // @ts-ignore
  const translatedOrderOptions = orderOptions.map((option) => ({
    ...option,
    label: formatMessage(projectMessages[option.label]),
  }));

  const onPaginationChange = (eventData: PaginationChangeEventData) => {
    // eslint-disable-next-line no-console
    console.log("Pagination Page : ", eventData);
  };

  const onTitleChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
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
    <Layout title={formatMessage(titleMessages.projects)}>
      <Breadcrumb links={[{ title: formatMessage(titleMessages.projects), href: "" }]} />

      <Container id="project-list">
        <Row className="mt-30">
          <Col md="3">
            <div className="side-card">
              <div className="d-flex justify-content-between mb-3">
                <div className="bold">{formatMessage(projectMessages.filterTitle)}</div>
                <div className="cursor-pointer text-color-main">
                  {formatMessage(projectMessages.btnReset)} <BsArrowClockwise />
                </div>
              </div>
              <Form>
                <FormGroup>
                  <Label className="font-weight-bold" htmlFor="title">
                    {formatMessage(projectMessages.titleLabel)}
                  </Label>
                  <Input id="title" placeholder={formatMessage(projectMessages.titleHint)} type="text" value={projectTitle} onChange={onTitleChange} />
                </FormGroup>
                <FormGroup>
                  <Label className="font-weight-bold" htmlFor="languages">
                    {formatMessage(projectMessages.languageLabel)}
                  </Label>
                  <TagInput defaultValues={TAGS} suggestions={SUGGESTIONS} onChange={onLanguageTagChange} />
                </FormGroup>

                <FormGroup className="text-center pt-4">
                  <Button color="primary" onClick={onFilterSubmit}>
                    {formatMessage(projectMessages.btnFilter)}
                  </Button>
                </FormGroup>
              </Form>
            </div>

            <div className="side-card">
              <h4 className="bold">{formatMessage(projectMessages.sortTitle)}</h4>
              <Form>
                <FormGroup>
                  <Select options={translatedOrderOptions} />
                </FormGroup>
              </Form>
            </div>
          </Col>

          <Col md="9">
            <div id="project-row-content">
              <Pagination currentPage={1} itemPerPage={12} totalItems={40} position="top" onPageChange={onPaginationChange} />
              {PROJECTS.map((project, i) => (
                <Row className="project-row" key={i}>
                  <Project description={project.description} language={project.language} name={project.name} stars={project.stars} type="big" />
                </Row>
              ))}
              <Pagination currentPage={1} itemPerPage={12} totalItems={40} position="bottom" onPageChange={onPaginationChange} />
            </div>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default ProjectPage;
