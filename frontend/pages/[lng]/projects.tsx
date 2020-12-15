import React from "react";
import { Form, Button, FormGroup, Input, Label } from "reactstrap";
import Select from 'react-select';
import { Layout } from "../../components/layout/layout";
import { PROJECTS } from "../../fixtures";
import { Project, Pagination, Breadcrumb } from "../../components/common";


const languages = [
  { value: 'python', label: 'Python' },
  { value: 'c', label: 'C' },
  { value: 'javascript', label: 'Javascript' },
  { value: 'typescript', label: 'Typescript' }
];

export const Home = (): JSX.Element => (
  <Layout title="Projects">
    <Breadcrumb links={[{title: "Projects", href: ""}]}/>

    <div className="container">
      <div className="row" style={{marginTop: "30px"}}>
        <div className="col-md-3">
          <div className="side-card">
            <h4 className="bold">Filters</h4>
            <Form>
              <FormGroup>
                <Label htmlFor="title">Title</Label>
                <Input type="text" id="title" placeholder="Project title" />
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
                <Input type="select" name="select">
                  <option>Most popular</option>
                  <option>Most Recent</option>
                  <option>Alphabetical</option>
                </Input>
              </FormGroup>
            </Form>
          </div>
        </div>
        <div className="col-md-9">
          <Pagination position="top" />
          {PROJECTS.map((project, i) => (
            <div className="row" key={i} style={{marginTop: "20px", marginBottom: "20px"}}>
              <Project
                description={project.description}
                language={project.language}
                name={project.name}
                stars={project.stars}
                type="big"
              />
            </div>
          ))}
          <Pagination position="bottom" />
        </div>
      </div>
    </div>
  </Layout>
);

export default Home;
