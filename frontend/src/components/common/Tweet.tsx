import React from "react";
import { Row, Col } from "reactstrap";

import tweetCommentIcon from '../../assets/icons/comments.svg';
import tweetLikeIcon from '../../assets/icons/like.svg';
import retweetIcon from '../../assets/icons/retweet.svg';

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
              <img alt="comment icon" src={tweetCommentIcon} /> <strong>{comments}</strong>{" "}
            </li>
            <li>
              <img alt="retweet icon" src={retweetIcon} /> <strong>{retweets}</strong>
            </li>
            <li>
              <img alt="like icon" src={tweetLikeIcon} /> <strong>{likes}</strong>
            </li>
          </ul>
        </div>
      </Col>
    </Row>
  );
};

export default Tweet;
