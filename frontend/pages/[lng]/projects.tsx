import { Layout } from "../../components/layout/layout";

import { PROJECTS } from "../../fixtures";
import Project from "../../components/common/Project";
import React from "react";

export const Home = (): JSX.Element => (
  <Layout title="OSS Cameroon - Projects">
    <div className="container">
      <div className="row" style={{marginTop: "30px"}}>
        <div className="col-md-3">
          <div className="card">
            <h3>Filter</h3>

          </div>

          <div className="card">

          </div>
        </div>
        <div className="col-md-9">
          {PROJECTS.map((project, i) => (
            <div className="row" key={i} style={{ margin: "20px 0 20px 0" }}>
              <Project
                description={project.description}
                language={project.language}
                name={project.name}
                stars={project.stars}
                type="big"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  </Layout>
);

export default Home;
