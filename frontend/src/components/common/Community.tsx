import React from "react";
import { Facebook, Github, Medium, Slack, Telegram, Twitter, Youtube } from "react-bootstrap-icons";
import { IoGlobeOutline } from "react-icons/io5";
import { Card, CardImg, CardBody, CardTitle, CardText, CardLink, Button } from "reactstrap";

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

const style = {
  cardImage: {
    height: "200px",
    with: "100%",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  }
};

const OtherCommunity = ({ description, github_account, image, name, other_links, telegram, twitter, website }: OtherCommunitieProps) => {

  const getIcon = (name: string) => {

    // Register missed icons here
    const icons: {[index: string]: any} = {
      "facebook": <Facebook />,
      "youtube": <Youtube />,
      "slack": <Slack />,
      "medium": <Medium />
    };

    return icons[name.toLowerCase()] || name;
  };

  return (
    <Card style={{ borderRadius: "16px", overflow: "clip" }}>
      <CardImg className="image-cover" src={image} style={style.cardImage} />
      <CardBody>
        <CardTitle className="text-left" style={style.cardHeader}>
          <h5><strong>{name}</strong></h5>
          <Button color="primary" href={website} size="sm" target="_blank">
            Join&nbsp;Us
          </Button>
        </CardTitle>
        <CardText style={{ color: "#00000", textAlign: "left" }}>
          <div className="mb-3" style={{ height: "100px", overflowY: "auto" }}>{description}</div>
          <div className="text-dark">
            <CardLink href={website} target="_blank">
              <IoGlobeOutline />
            </CardLink>
            <CardLink href={github_account} target="_blank">
              <Github />
            </CardLink>
            <CardLink href={telegram} target="_blank">
              <Telegram />
            </CardLink>
            <CardLink href={twitter} target="_blank">
              <Twitter />
            </CardLink>
            {other_links.map((other, i) => (
              <CardLink href={other.link} key={i} target="_blank">
                {getIcon(other.name)}
              </CardLink>
            ))}
          </div>
        </CardText>
      </CardBody>
    </Card>
  );
};

export default OtherCommunity;
