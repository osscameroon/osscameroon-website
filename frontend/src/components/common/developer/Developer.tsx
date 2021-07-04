import React from "react";
import { Card, CardBody, CardImg, CardSubtitle, CardTitle } from "reactstrap";

import { GithubUser } from "../../../utils/types";

type DeveloperProps = {
  developer: GithubUser;
};

const defaultPicture = "/static/fixtures/developers/no-dev.svg";

const Developer = ({ developer }: DeveloperProps) => {
  const picture = developer.avatar_url || defaultPicture;

  return (
    <div className="developer-item">
      <Card>
        <CardImg alt="Dev picture" src={picture} top />
        <CardBody>
          <CardTitle tag="h5">{developer.name ? developer.name : developer.login}</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            {developer.company}
          </CardSubtitle>
          {/*<div className="devtool-list">
            {data.tools.map((tool) => (
              <div className="devtool-item d-inline-block" key={tool}>
                {tool}
              </div>
            ))}
          </div>*/}
        </CardBody>
      </Card>
    </div>
  );
};

export default Developer;
