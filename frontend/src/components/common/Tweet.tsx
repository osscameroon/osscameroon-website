import React from "react";
import { Row, Col } from "reactstrap";

import tweetLikeIcon from "../../assets/icons/like.svg";
import retweetIcon from "../../assets/icons/retweet.svg";
import { TwitterUrl, TwitterUser, HashTag, TwitterMention } from "../../utils/types";

type TweetProps = {
  user: TwitterUser;
  user_mentions: TwitterMention[];
  hashtags: HashTag[];
  urls: TwitterUrl[];
  text: string;
  retweets: number;
  likes: number;
};

const Tweet = ({ hashtags, likes, retweets, text, urls, user, user_mentions }: TweetProps) => {
  const userUrl = `https://twitter.com/${user.screen_name}`;

  let formattedText = text;

  for (const hashtag of hashtags) {
    const tag = `#${hashtag.text}`;
    const link = `<a href="https://twitter.com/hashtag/${hashtag.text}" rel="noreferrer nofollow" target="_blank"> #${hashtag.text} </a>`;
    formattedText = formattedText.replace(tag, link);
  }

  for (const url of urls) {
    const link = `<a href="${url.url}" rel="noreferrer nofollow" target="_blank"> ${url.url} </a>`;
    formattedText = formattedText.replace(url.url, link);
  }

  for (const mention of user_mentions) {
    const username = `@${mention.screen_name}`;
    const link = `
        <a href="https://twitter.com/${mention.screen_name}" 
            rel="noreferre nofollow" 
            target="_blank" 
            title="${mention.name}"> 
            @${mention.screen_name} 
        </a>`;
    formattedText = formattedText.replace(username, link);
  }

  return (
    <Row className="row">
      <Col md="2" xs="2">
        <a href={userUrl} rel="noreferrer nofollow" target="_blank">
          <img alt={`${user.name} avatar`} className="rounded-circle" src={user.profile_image_url_https} />
        </a>
      </Col>
      <Col className="text-left" md="10" xs="10">
        <div>
          <a href={userUrl} rel="noreferrer nofollow" style={{ color: "var(--white)" }} target="_blank">
            <strong>{user.name}</strong> <span style={{ fontWeight: 100 }}>&ensp; @{user.screen_name}</span>
          </a>
        </div>
        <p dangerouslySetInnerHTML={{ __html: `${formattedText}` }} />
        <div>
          <ul className="inline-ul">
            {/*
            <li>
              <img alt="comment icon" src={tweetCommentIcon} /> <strong>{comments}</strong>{" "}
            </li>
            */}
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
