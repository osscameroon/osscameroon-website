import React, { useState, ChangeEvent, useContext } from "react";
import { Form, Input, InputGroup, InputGroupAddon, Button, Container, Row, Col } from "reactstrap";
import { useIntl } from "react-intl";
import { NavLink, useHistory } from "react-router-dom";

import Layout from "../components/layout/layout";
import Tweet from "../components/common/Tweet";
import OtherCommunity from "../components/common/Community";
import Project from "../components/common/Project";
import { homeMessages, titleMessages, otherOpenSourceCommunities } from "../locales/messages";

import developer from "../assets/img/developer.svg";
import lightDeveloper from "../assets/img/light-developer.svg";
import darkDeveloper from "../assets/img/dark-developer.svg";

import search from "../assets/icons/search.svg";
import { useQuery } from "react-query";
import { searchProject } from "../services/projects";
import { getTopTweets } from "../services/tweets";
import { DEFAULT_CACHE_OPTIONS } from "../config";
import Loader from "../components/common/Loader";
import NetworkError from "../components/common/NetworkError";
import BannerBackgroundLight from "../assets/img/banner-background.svg";
import BannerBackgroundDark from "../assets/img/banner-background-alt.svg";
import { ThemeContext, LIGHT } from "../components/utils/ThemeProvider";

// Merry Christmas Images
import starsImage from "../assets/img/merry_christmas/stars.png";
import moonImage from "../assets/img/merry_christmas/moon.png";
import sunImage from "../assets/img/merry_christmas/sun.png";
import lightningImage from "../assets/img/merry_christmas/lightning.png";
import { HomeStyles, Lightning } from "./home.styles";

const HomePage = () => {
  const history = useHistory();
  const themeContext = useContext(ThemeContext);

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

  const BannerStyle = {
    background: `url(${themeContext.theme === LIGHT ? BannerBackgroundLight : BannerBackgroundDark}) center no-repeat`,
  };

  const getDeveloperImage = () => {
    if (!themeContext.isChristmas) {
      return developer;
    }
    return themeContext.theme === LIGHT ? lightDeveloper : darkDeveloper;
  };

  return (
    <Layout title={formatMessage(titleMessages.home)}>
      {themeContext.isChristmas && <HomeStyles />}
      <div className="home-page">
        <section id="banner" style={BannerStyle}>
          <Container>
            {themeContext.isChristmas && (
              <div className="decorative-wrapper">
                <img alt="stars" className="stars" src={starsImage} />
                <img alt="stars" className="stars right" src={starsImage} />
                {themeContext.theme === LIGHT ? (
                  <img alt="sun" className="sun" src={sunImage} />
                ) : (
                  <img alt="moon" className="moon" src={moonImage} />
                )}
                <Lightning alt="lightning" animated={themeContext.theme !== LIGHT} src={lightningImage} />
              </div>
            )}

            <Row>
              <Col md="6">
                <h1>{formatMessage(homeMessages.mainTitle)}</h1>
                <p className="main-text">
                  <NavLink to="/projects">
                    <span className="navbar-brand cursor-pointer btn btn-outline-primary btn-sm">{formatMessage(homeMessages.btnToProject)}</span>
                  </NavLink>
                </p>
                <p className="main-text">
                  <a href="https://opencollective.com/osscameroon/donate" rel="noreferrer" target="_blank">
                    <span className="navbar-brand cursor-pointer btn-primary btn-sm">{formatMessage(homeMessages.btnToSupport)}</span>
                  </a>
                </p>
              </Col>
              <Col className="text-right" md="6">
                <img alt="developer illustration" className="d-none d-md-block" src={getDeveloperImage()} style={{ marginTop: "30px" }} />
              </Col>
            </Row>
          </Container>
        </section>

        <section className="item-center" id="search">
          <div className="text-center">
            <h2>{formatMessage(homeMessages.searchTitle)}</h2>
            <Form className="search-form" onSubmit={onSearch}>
              <div>
                <InputGroup>
                  <Input className="search-input" placeholder="ex: Full Stack Web Developer" onChange={onSearchKeyChange} />
                  <InputGroupAddon addonType="append">
                    <Button className="search-button">
                      <img alt="search button" src={search} />
                    </Button>
                  </InputGroupAddon>
                </InputGroup>
              </div>
            </Form>
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
                    <Col key={i} md="6" style={{ margin: "20px 0 20px 0" }} xl="4">
                      <Project
                        description={project.description}
                        issues={project.open_issues_count}
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

        <section className="item-center" id="projects">
          <div>
            <h2 className="text-center mb-4">
              {" "}
              <strong>{formatMessage(homeMessages.otherOpenSourceCommunities)}</strong>{" "}
            </h2>
            <Container>
              <Row>
                {otherOpenSourceCommunities.map((other_communitie, i) => (
                  <Col className="mb-3" key={i} lg="4" md="6">
                    <OtherCommunity
                      description={other_communitie.description}
                      github_account={other_communitie.github_account}
                      image={other_communitie.image}
                      name={other_communitie.name}
                      other_links={other_communitie.other_links}
                      telegram={other_communitie.telegram}
                      twitter={other_communitie.twitter}
                      website={other_communitie.website}
                    />
                  </Col>
                ))}
              </Row>
            </Container>
            {/* <a href="https://twitter.com/hashtag/caparledev" rel="noreferrer nofollow" target="_blank">
              <Button color="primary"> {formatMessage(homeMessages.btnViewMoreTweet)} </Button>
            </a> */}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default HomePage;
