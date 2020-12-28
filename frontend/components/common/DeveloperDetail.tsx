import * as React from "react";
import { DeveloperDetailData} from "@utils/types";


type DeveloperProps = {
  data: DeveloperDetailData;
}

const defaultPicture = "/static/fixtures/developers/no-dev.svg";

const DeveloperDetail = ({ data }: DeveloperProps) => {
  const picture = data.picture || defaultPicture;

  return (
    <div>
      <div>
        <img alt={`developer ${data.name}`} src={picture} />
      </div>
      <div>
        <strong>{data.name}</strong>
        <p>
          {data.title}
        </p>

        <p>
          {data.location}
          {data.email}
          {data.url}
        </p>

        <p>
          {data.twitter}
          {data.linkedin}
          {data.github}
        </p>

        <div>
          <h2>Summary</h2>
          <p>{data.summary}</p>
        </div>

        <div>
          <h2>Tools</h2>
          <p>
            {data.tools.map((value, index) => (
              <span key={index}>{value}</span>
            ))}
          </p>
        </div>

        <p>Years of experiences : {data.yearsOfExperiences}</p>

        <p>
          {data.availabilities.map((value, index) => (
            <span key={index}>{value}</span>
          ))}
        </p>
      </div>
    </div>
  );
};

export default DeveloperDetail;
