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

const Tweet = ({ avatar, comments, likes, name, retweets, text, username }: TweetProps) => {
  return (
    <Row className="row">
      <Col md="2" xs="2">
        <img alt={`${name} avatar`} src={avatar} />
      </Col>
      <Col className="text-left" md="10" xs="10">
        <div>
          <strong>{name}</strong> <span style={{ fontWeight: 100 }}>&ensp; {username}</span>
        </div>
        <p>{text}</p>
        <div>
          <ul className="inline-ul">
            <li>
              <img alt="comment icon" src="/static/icons/comments.svg" /> <strong>{comments}</strong>{" "}
            </li>
            <li>
              <img alt="retweet icon" src="/static/icons/retweet.svg" /> <strong>{retweets}</strong>
            </li>
            <li>
              <img alt="like icon" src="/static/icons/like.svg" /> <strong>{likes}</strong>
            </li>
          </ul>
        </div>
      </Col>
    </Row>
  );
};

export default Tweet;
