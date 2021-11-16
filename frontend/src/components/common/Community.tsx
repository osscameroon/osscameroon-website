import React from "react";
import { Card, CardImg, CardBody, CardTitle, CardText, Button } from "reactstrap";
import githubDarkIcon from "../../assets/icons/github-dark.svg";
import facebookDarkIcon from "../../assets/icons/facebook-dark.svg";
import linkedinDarkIcon from "../../assets/icons/linkedin.svg";
import mediumDarkIcon from "../../assets/icons/medium-dark.svg";
import slackDarkIcon from "../../assets/icons/slack-dark.svg";
import telegramDarkIcon from "../../assets/icons/telegram-dark.svg";
import twitterDarkIcon from "../../assets/icons/twitter-dark.svg";
import websiteDarkIcon from "../../assets/icons/globe-dark.svg";
import youtubeDarkIcon from "../../assets/icons/youtube-dark.svg";

const otherLinksImages: { [key: string]: string } = {
  youtube: youtubeDarkIcon,
  medium: mediumDarkIcon,
  slack: slackDarkIcon,
  linkedin: linkedinDarkIcon,
  facebook: facebookDarkIcon,
};

type OtherCommunityProps = {
  name: string;
  website: string;
  twitter: string;
  image: string;
  telegram: string;
  description: string;
  github_account: string;
  other_links: { name: string; link: string }[];
};

const OtherCommunity = ({ description, github_account, image, name, other_links, telegram, twitter, website }: OtherCommunityProps) => {
  return (
    <Card style={{ width: "19rem", borderRadius: "16px" }}>
      <CardImg className="img-fluid" src={image} style={{ height: "14rem" }} variant="top" />
      <CardBody className="border-top">
        <div className="mb-3">
          <CardTitle className="d-inline" tag="h4">
            {name}
          </CardTitle>
          <Button
            className="float-right"
            color="primary"
            href={website}
            style={{ width: "85px", height: "32px", padding: "2px 4px" }}
            target="_blank"
          >
            Join Us
          </Button>
        </div>
        <CardText className="text-justify mb-3" style={{ height: "100px", textOverflow: "ellipsis", overflow: "hidden" }}>
          {description}
        </CardText>
        <div className="pb-1" style={{ height: "70px" }}>
          <a className="mr-3" href={website} rel="noreferrer" target="_blank">
            <img alt="Website icon" src={websiteDarkIcon} />
          </a>
          <a className="mr-3" href={github_account} rel="noreferrer" target="_blank">
            <img alt="Github icon" src={githubDarkIcon} />
          </a>
          <a className="mr-3" href={telegram} rel="noreferrer" target="_blank">
            <img alt="Telegram icon" src={telegramDarkIcon} />
          </a>
          <a className="mr-3" href={twitter} rel="noreferrer" target="_blank">
            <img alt="Twitter icon" src={twitterDarkIcon} />
          </a>
          {other_links.map((other, i) =>
            otherLinksImages[other.name.toLowerCase()] ? (
              <a className="mr-3" href={other.link} key={i} rel="noreferrer" target="_blank">
                <img alt={other.name + ` icon`} src={otherLinksImages[other.name.toLowerCase()]} />
              </a>
            ) : null,
          )}
        </div>
      </CardBody>
    </Card>
  );
};

export default OtherCommunity;
