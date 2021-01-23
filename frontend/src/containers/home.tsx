import React, { useState, ChangeEvent } from "react";
import { Input, InputGroup, InputGroupAddon, Button, Container, Row, Col } from "reactstrap";
import { useIntl } from "react-intl";
import { NavLink, useHistory } from "react-router-dom";

import Layout from "../components/layout/layout";
import Tweet from "../components/common/Tweet";
import Project from "../components/common/Project";
import { homeMessages, titleMessages } from "../locales/messages";

import developer from "../assets/img/developer.svg";
import search from "../assets/icons/search.svg";
import { useQuery } from "react-query";
import { searchProject } from "../services/projects";
import { getTopTweets } from "../services/tweets";
import { DEFAULT_CACHE_OPTIONS } from "../config";
import Loader from "../components/common/Loader";
import NetworkError from "../components/common/NetworkError";

const HomePage = () => {
  const history = useHistory();

  const NB_TOP_PROJECTS = 6;
  const TOP_PROJECTS_PAGE = 1;
  const TOP_PROJECTS_SORT = "popularity";

  const { data: projects_data, error: projectsError, isLoading: projectsLoading } = useQuery(
    ["projects", { page: TOP_PROJECTS_PAGE, count: NB_TOP_PROJECTS, sortMethod: TOP_PROJECTS_SORT }],
    searchProject,
    DEFAULT_CACHE_OPTIONS,
  );

  const [searchKey, setSearchKey] = useState("");
  const onSearchKeyChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchKey(e.target.value);
  };

  const onSearch = () => {
    if (searchKey.trim() !== "") {
      history.push(`/developers?keyword=${searchKey}`);
    }
  };

  const { data: tweets_data, error: tweetsError, isLoading: tweetsLoading } = useQuery("tweets", getTopTweets, DEFAULT_CACHE_OPTIONS);

  const { formatMessage } = useIntl();

  return (
    <Layout title={formatMessage(titleMessages.home)}>
      <div className="home-page">
        <section id="banner">
          <Container>
            <Row>
              <Col md="6">
                <h1>{formatMessage(homeMessages.mainTitle)}</h1>
                <p className="main-text">
                  <NavLink to="/projects">
                    <span className="navbar-brand cursor-pointer btn btn-outline-primary btn-sm">{formatMessage(homeMessages.btnToProject)}</span>
                  </NavLink>
                </p>
              </Col>
              <Col className="text-right" md="6">
                <img alt="developer illustration" className="d-none d-md-block" src={developer} style={{ marginTop: "30px" }} />
              </Col>
            </Row>
          </Container>
        </section>

        <section className="item-center" id="search">
          <div className="text-center">
            <h2>{formatMessage(homeMessages.searchTitle)}</h2>
            <form className="search-form">
              <div>
                <InputGroup>
                  <Input className="search-input" placeholder="ex: Full Stack Web Developer" onChange={onSearchKeyChange} />
                  <InputGroupAddon addonType="append">
                    <Button className="search-button" onClick={onSearch}>
                      <img alt="search button" src={search} />
                    </Button>
                  </InputGroupAddon>
                </InputGroup>
              </div>
            </form>
            {/*
            <a href="#">
              <img alt="circle down arrow" src="/static/icons/circle-down-arrow.svg" /> <br />
              {t('home:btnAdvancedSearch')}
            </a>
            */}
          </div>
        </section>

        <section className="item-center" id="projects">
          <div className="text-center">
            <h2> {formatMessage(homeMessages.topProjectTitle)} </h2>
            <Container>
              <Row style={{ margin: "40px 0 40px 0" }}>
                {projectsLoading && <Loader loading={projectsLoading} />}

                {!projectsLoading && projectsError && <NetworkError />}

                {!projectsLoading &&
                  !projectsError &&
                  projects_data?.result.hits.map((project, i) => (
                    <Col key={i} md="4" style={{ margin: "20px 0 20px 0" }}>
                      <Project
                        description={project.description}
                        language={project.language}
                        link={project.html_url}
                        name={project.name}
                        stars={project.stargazers_count}
                        type="small"
                      />
                    </Col>
                  ))}
              </Row>
            </Container>
            <NavLink to="/projects">
              <Button color="primary">{formatMessage(homeMessages.btnViewMoreProject)}</Button>
            </NavLink>
          </div>
        </section>

        <section className="item-center" id="tweets">
          <div className="text-center">
            <h2> {formatMessage(homeMessages.topTweetTitle)} </h2>
            <Container>
              <Row style={{ margin: "40px 0 40px 0" }}>
                {tweetsLoading && <Loader loading={tweetsLoading} />}

                {!tweetsLoading && tweetsError && <NetworkError />}

                {!tweetsLoading &&
                  !tweetsError &&
                  tweets_data?.result.statuses.map((tweet, i) => (
                    <Col key={i} md="4" style={{ margin: "20px 0 20px 0" }}>
                      <Tweet
                        hashtags={tweet.entities.hashtags}
                        likes={tweet.favorite_count}
                        retweets={tweet.retweet_count}
                        text={tweet.text}
                        urls={tweet.entities.urls}
                        user={tweet.user}
                        user_mentions={tweet.entities.user_mentions}
                      />
                    </Col>
                  ))}
              </Row>
            </Container>
            <a href="https://twitter.com/hashtag/caparledev" rel="noreferrer nofollow" target="_blank">
              <Button color="primary"> {formatMessage(homeMessages.btnViewMoreTweet)} </Button>
            </a>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default HomePage;
