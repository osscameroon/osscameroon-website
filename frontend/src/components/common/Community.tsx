import React from "react";
import { Row, Card, CardImg, CardBody, CardTitle, CardText, CardLink, Button } from "reactstrap";

type OtherCommunitieProps = {
  name: string;
  website: string;
  twitter: string;
  image: string;
  telegram: string;
  description: string;
  github_account: string;
  other_links: { name: string; link: string }[];
};

const OtherCommunity = ({ description, github_account, image, name, other_links, telegram, twitter, website }: OtherCommunitieProps) => {
  return (
    <Row className="row">
      <Card style={{ width: "19rem" }}>
        <CardImg src={image} variant="top" />
        <CardBody>
          <CardTitle tag="h3">{name}</CardTitle>
          <CardText style={{ color: "#00000" }}>{description}</CardText>
        </CardBody>

        <CardBody>
          <Button color="primary" href={website} target="_blank">
            Join Us
          </Button>
        </CardBody>
        <CardBody>
          <CardLink href={website} target="_blank">
            website
          </CardLink>
          <CardLink href={github_account} target="_blank">
            Github
          </CardLink>
          <CardLink href={telegram} target="_blank">
            telegram
          </CardLink>
          <CardLink href={twitter} target="_blank">
            twitter
          </CardLink>
          {other_links.map((other, i) => (
            <CardLink href={other.link} key={i} target="_blank">
              {other.name}
            </CardLink>
          ))}
        </CardBody>
      </Card>
    </Row>
  );
};

export default OtherCommunity;
