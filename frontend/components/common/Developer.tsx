import React from "react";
import { Card, CardBody, CardImg, CardSubtitle, CardTitle } from "reactstrap";

import { DeveloperData } from "@utils/types";

type DeveloperProps = {
  data: DeveloperData;
};

const defaultPicture = "/static/fixtures/developers/no-dev.svg";

const Developer = ({ data }: DeveloperProps) => {
  const picture = data.picture || defaultPicture;

  return (
    <div className="developer-item">
      <Card>
        <CardImg alt="Dev picture" src={picture} top />
        <CardBody>
          <CardTitle tag="h5">{data.name}</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            {data.title}
          </CardSubtitle>
          <div className="devtool-list">
            {data.tools.map((tool) => (
              <div className="devtool-item d-inline-block" key={tool}>
                {tool}
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default Developer;
