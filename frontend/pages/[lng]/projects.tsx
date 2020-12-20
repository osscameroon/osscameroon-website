import React from "react";
import { Form, Button, FormGroup, Input, Label, Container, Row, Col } from "reactstrap";
import Select from "react-select";
import Layout from "@components/layout/layout";
import Project from "@components/common/Project";
import Pagination from "@components/common/Pagination";
import Breadcrumb from "@components/common/Breadcrumb";
import { PROJECTS } from "@fixtures/home";

const languages = [
  { value: "python", label: "Python" },
  { value: "c", label: "C" },
  { value: "javascript", label: "Javascript" },
  { value: "typescript", label: "Typescript" },
];

export const ProjectPage = (): JSX.Element => {
  const onPageChange = (page: number) => {
    // Do something with page
    // eslint-disable-next-line no-console
    console.log(page);
  };

  return (
    <Layout title="Projects">
      <Breadcrumb links={[{ title: "Projects", href: "" }]} />

      <Container>
        <Row style={{ marginTop: "30px" }}>
          <Col md="3">
            <div className="side-card">
              <h4 className="bold">Filters</h4>
              <Form>
                <FormGroup>
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" placeholder="Project title" type="text" />
                </FormGroup>
                <FormGroup>
                  <Form>
                    <Label htmlFor="languages">Programming Languages</Label>
                    <Select options={languages} isMulti />
                  </Form>
                </FormGroup>

                <FormGroup className="text-center">
                  <Button color="primary">Filter</Button>
                </FormGroup>
              </Form>
            </div>

            <div className="side-card">
              <h4 className="bold">Sort by</h4>
              <Form>
                <FormGroup>
                  <Input name="select" type="select">
                    <option>Most popular</option>
                    <option>Most Recent</option>
                    <option>Alphabetical</option>
                  </Input>
                </FormGroup>
              </Form>
            </div>
          </Col>

          <Col md="9">
            <div style={{ margin: "0 15px 0 15px" }}>
              <Pagination currentPage={1} itemPerPage={12} nbItems={40} position="top" onPageChange={onPageChange} />
              {PROJECTS.map((project, i) => (
                <Row key={i} style={{ marginTop: "20px", marginBottom: "20px" }}>
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
