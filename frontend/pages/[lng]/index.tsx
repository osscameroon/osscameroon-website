import React from "react";
import { Input, InputGroup, InputGroupAddon, Button, Container, Row, Col } from "reactstrap";

import intl from "@utils/i18n";
import Layout from "@components/layout/layout";
import Tweet from "@components/common/Tweet";
import Project from "@components/common/Project";
import { TWEETS, PROJECTS } from "@fixtures/home";
import LocaleLink from "@components/utils/localeLink";

const { useTranslation } = intl;

const HomePage = () => {
  const { t } = useTranslation();

  return (
    <Layout title={t("title:home")}>
      <div className="home-page">
        <section id="banner">
          <Container>
            <Row>
              <Col md="6">
                <h1>{t("home:mainTitle")}</h1>
                <p className="main-text">
                  <LocaleLink as="/projects" href="/projects">
                    <a className="navbar-brand cursor-pointer btn btn-outline-primary btn-sm">{t("home:btnToProject")}</a>
                  </LocaleLink>
                </p>
              </Col>
              <Col className="text-right" md="6">
                <img alt="developer illustration" className="d-none d-md-block" src="/static/img/developer.svg" style={{ marginTop: "30px" }} />
              </Col>
            </Row>
          </Container>
        </section>

        <section className="item-center" id="search">
          <div className="text-center">
            <h2>{t("home:searchTitle")}</h2>
            <form className="search-form">
              <div>
                <InputGroup>
                  <Input className="search-input" placeholder="ex: Full Stack Web Developer" />
                  <InputGroupAddon addonType="append">
                    <Button className="search-button">
                      <img alt="search button" src="/static/icons/search.svg" />
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
            <h2> {t("home:topProjectTitle")} </h2>
            <Container>
              <Row style={{ margin: "40px 0 40px 0" }}>
                {PROJECTS.map((project, i) => (
                  <Col key={i} md="4" style={{ margin: "20px 0 20px 0" }}>
                    <Project description={project.description} language={project.language} name={project.name} stars={project.stars} type="small" />
                  </Col>
                ))}
              </Row>
            </Container>
            <Button color="primary">{t("home:btnViewMoreProject")}</Button>
          </div>
        </section>

        <section className="item-center" id="tweets">
          <div className="text-center">
            <h2> {t("home:topTweetTitle")} </h2>
            <Container>
              <Row style={{ margin: "40px 0 40px 0" }}>
                {TWEETS.map((tweet, i) => (
                  <Col key={i} md="4" style={{ margin: "20px 0 20px 0" }}>
                    <Tweet
                      avatar={tweet.avatar}
                      comments={tweet.comments}
                      likes={tweet.likes}
                      name={tweet.name}
                      retweets={tweet.retweets}
                      text={tweet.text}
                      username={tweet.username}
                    />
                  </Col>
                ))}
              </Row>
            </Container>
            <Button color="primary"> {t("home:btnViewMoreTweet")} </Button>
          </div>
        </section>
      </div>
    </Layout>
  );
};

HomePage.getInitialProps = async () => ({
  namespacesRequired: ["title", "home"],
});

export default HomePage;
