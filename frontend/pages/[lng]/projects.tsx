import React, { useState } from "react";
import { Form, Button, FormGroup, Input, Label, Container, Row, Col } from "reactstrap";
import Select from "react-select";

import Layout from "@components/layout/layout";
import Project from "@components/common/Project";
import Pagination from "@components/common/Pagination";
import Breadcrumb from "@components/common/Breadcrumb";
import TagInput, { TagInputData } from "@components/common/TagInput";
import { PROJECTS } from "@fixtures/home";
import { SUGGESTIONS, TAGS } from "@fixtures/developers";
import { BsArrowClockwise } from "react-icons/bs";

const orderOptions = [
  { value: "mp", label: "Most popular" },
  { value: "mr", label: "Most Recent" },
  { value: "alpha", label: "Alphabetical" },
];

export const ProjectPage = (): JSX.Element => {
  const [projectTitle, setProjectTitle] = useState("");
  const [languages, setLanguages] = useState<TagInputData[]>(TAGS);

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
    <Layout title="Projects">
      <Breadcrumb links={[{ title: "Projects", href: "" }]} />

      <Container id="project-list">
        <Row className="mt-30">
          <Col md="3">
            <div className="side-card">
              <div className="d-flex justify-content-between mb-3">
                <div className="bold">Filters</div>
                <div className="cursor-pointer text-color-main">
                  Reset <BsArrowClockwise />
                </div>
              </div>
              <Form>
                <FormGroup>
                  <Label className="font-weight-bold" htmlFor="title">
                    Title
                  </Label>
                  <Input id="title" placeholder="Project title" type="text" value={projectTitle} onChange={onTitleChange} />
                </FormGroup>
                <FormGroup>
                  <Form>
                    <Label className="font-weight-bold" htmlFor="languages">
                      Programming Languages
                    </Label>
                    <TagInput defaultValues={TAGS} suggestions={SUGGESTIONS} onChange={onLanguageTagChange} />
                  </Form>
                </FormGroup>

                <FormGroup className="text-center pt-4">
                  <Button color="primary" onClick={onFilterSubmit}>
                    Filter
                  </Button>
                </FormGroup>
              </Form>
            </div>

            <div className="side-card">
              <h4 className="bold">Sort by</h4>
              <Form>
                <FormGroup>
                  <Select options={orderOptions} isMulti />
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

export default ProjectPage;
