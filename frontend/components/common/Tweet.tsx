import * as React from "react";
import { Row, Col } from "reactstrap";

type TweetProps = {
  avatar: string;
  name: string;
  username: string;
  text: string;
  comments: number;
  retweets: number;
  likes: number;
};

const Tweet: React.FunctionComponent<TweetProps> = (props) => {
  return (
    <Row className="row">
      <Col md="2" xs="2">
        <img alt={`${props.name} avatar`} src={props.avatar} />
      </Col>
      <Col className="text-left" md="10" xs="10">
        <div>
          <strong>{props.name}</strong> <span style={{ fontWeight: 100 }}>&ensp; {props.username}</span>
        </div>
        <p>{props.text}</p>
        <div>
          <ul className="inline-ul">
            <li>
              <img alt="comment icon" src="/static/icons/comments.svg" /> <strong>{props.comments}</strong>{" "}
            </li>
            <li>
              <img alt="retweet icon" src="/static/icons/retweet.svg" /> <strong>{props.retweets}</strong>
            </li>
            <li>
              <img alt="like icon" src="/static/icons/like.svg" /> <strong>{props.likes}</strong>
            </li>
          </ul>
        </div>
      </Col>
    </Row>
  );
};

export default Tweet;
