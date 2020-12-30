import * as React from "react";
import { DeveloperDetailData} from "@utils/types";


type DeveloperDetailProps = {
  data: DeveloperDetailData;
  onClose: () => void;
}

const defaultPicture = "/static/fixtures/developers/no-dev.svg";

const locationIcon = "/static/icons/location.svg";
const emailIcon = "/static/icons/email.svg";
const urlIcon = "/static/icons/url.svg";
const twitterIcon = "/static/icons/twitter-dark.svg";
const linkedinIcon = "/static/icons/linkedin.svg";
const githubIcon = "/static/icons/github-dark.svg";
const closeIcon = "/static/icons/close.svg";


const DeveloperDetail = ({ data, onClose }: DeveloperDetailProps) => {
  const picture = data.picture || defaultPicture;

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
          <h3 className="mt-20"><strong>{data.name}</strong></h3>

          <h4 className="mt-20">
            {data.title}
          </h4>

          <p className="mt-20">
            {data.location && (<span> <img alt="location icon" src={locationIcon} /> {data.location} </span>)} &emsp;
            {data.email && (<span> <img alt="email icon" src={emailIcon} /> {data.email} </span>)} &emsp;
            {data.url && (<a className="dark-color" href={data.url}> <img alt="url icon" src={urlIcon} /> {data.url} </a>)}
          </p>

          <p>
            {data.twitter && (<a href={data.twitter}><img alt="twitter icon" src={twitterIcon} /> </a>)} &emsp;
            {data.linkedin && (<a href={data.linkedin}><img alt="linkedin icon" src={linkedinIcon} /> </a>)} &emsp;
            <a href={data.github}><img alt="github icon" src={githubIcon} /> </a>
          </p>

          {data.summary &&
            (
              <div className="mt-20">
                <h4>Summary</h4>
                <p>{data.summary}</p>
              </div>
            )
          }

          {data.tools &&
            (
              <div>
                <h4>Tools</h4>
                <p className="devtool-list">
                  {data.tools.map((tool, index) => (
                    <div className="devtool-item d-inline-block" key={index}>
                      {tool}
                    </div>
                  ))}
                </p>
              </div>
            )
          }

          {data.yearsOfExperiences &&
            (
              <h4>Years of experiences : {data.yearsOfExperiences}</h4>
            )
          }

          {data.availabilities &&
            (
              <p>
                <h4>Availabilities: &nbsp;
                  {data.availabilities.map((value, index) => (
                    <span key={index}>{value}</span>
                  ))}
                </h4>
              </p>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default DeveloperDetail;
