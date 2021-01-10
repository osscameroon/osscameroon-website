import React from "react";
import { useIntl } from "react-intl";

import { GithubUser } from "../../../utils/types";
import { developerMessages } from "../../../locales/messages";

import locationIcon from "../../../assets/icons/location.svg";
import emailIcon from "../../../assets/icons/email.svg";
import urlIcon from "../../../assets/icons/url.svg";
import twitterIcon from "../../../assets/icons/twitter-dark.svg";
import githubIcon from "../../../assets/icons/github-dark.svg";
import closeIcon from "../../../assets/icons/close.svg";
import DeveloperItem from "./DeveloperItem";
import DeveloperItemLink from "./DeveloperItemLink";

type DeveloperDetailProps = {
  data: GithubUser | undefined;
  onClose: () => void;
};

const defaultPicture = "/static/fixtures/developers/no-dev.svg";

const DeveloperDetail = ({ data, onClose }: DeveloperDetailProps) => {
  const { formatMessage } = useIntl();
  if (!data) return null;

  const picture = data.avatar_url || defaultPicture;

  return (
    <div className="text-center" id="developer-detail">
      <div className="close-icon">
        <img alt="close icon" src={closeIcon} onClick={onClose} />
      </div>
      <div className="item-center dev-detail-header">
        <img alt={`developer ${data.name}`} className="avatar mt-70" src={picture} />
      </div>

      <div className="item-center">
        <div className="w-75">
          <h3 className="mt-20">
            <strong>{data.name}</strong>
          </h3>

          <h4 className="mt-20">{data.bio}</h4>

          <p className="mt-20">
            {data.location && <DeveloperItem alt="location icon" picture={locationIcon} text={data.location} />} &emsp;
            {data.email && <DeveloperItem alt="email icon" picture={emailIcon} text={data.email} />} &emsp;
            {data.blog && <DeveloperItemLink alt="url icon" link={data.blog} picture={urlIcon} />}
          </p>

          <p>
            {data.twitter_username && (
              <DeveloperItemLink
                alt="twitter icon"
                link={`https://twitter.com/${data.twitter_username}`}
                picture={twitterIcon}
                text={`@${data.twitter_username}`}
              />
            )}{" "}
            &emsp;
            {/*{data.linkedin && (
              <a href={data.linkedin}>
                <img alt="linkedin icon" src={linkedinIcon} />{" "}
              </a>
            )}{" "}
            &emsp;*/}
            <DeveloperItemLink alt="github icon" link={`https://github.com/${data.login}`} picture={githubIcon} text={data.login} />
          </p>

          {data.bio && (
            <div className="mt-20">
              <h4>{formatMessage(developerMessages.summary)}</h4>
              <p>{data.bio}</p>
            </div>
          )}
          {/*{data.tools && (
            <div>
              <h4>{formatMessage(developerMessages.tools)}</h4>
              <p className="devtool-list">
                {data.tools.map((tool, index) => (
                  <div className="devtool-item d-inline-block" key={index}>
                    {tool}
                  </div>
                ))}
              </p>
            </div>
          )}

          {data.yearsOfExperiences && (
            <h4>
              {formatMessage(developerMessages.yearOfExperience)} {data.yearsOfExperiences}
            </h4>
          )}*/}
          <h4>
            {formatMessage(developerMessages.availability)} &nbsp;
            {data.hireable ? "Yes" : "No"}
          </h4>
        </div>
      </div>
    </div>
  );
};

DeveloperDetail.getInitialProps = async () => ({
  namespacesRequired: ["developer"],
});

export default DeveloperDetail;
