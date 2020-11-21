import React from "react";
import { Col, Button } from "reactstrap";

import intl from "../../utils/i18n";
import { Layout } from "../../components/layout/layout";
import Tweet from "../../components/utils/Tweet";
import Project from "../../components/utils/Project";

const { useTranslation } = intl;

const Tweets = [
  {
    name: "Eleanor Pena",
    username: "@eleanor_pena",
    text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin aliquet ipsum ac tortor varius, 
      hendrerit auctor est volutpat.`,
    avatar: '/static/fixtures/guy-3.svg',
    comments: 2,
    retweets: 50,
    likes: 25
  },
  {
    name: "Jacob_jones",
    username: "@guy_hawkins",
    text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin aliquet ipsum ac tortor varius, 
      hendrerit auctor est volutpat.`,
    avatar: '/static/fixtures/guy-1.svg',
    comments: 5,
    retweets: 15,
    likes: 12
  },
  {
    name: "Guy Hawkins",
    username: "@guy_hawkins",
    text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin aliquet ipsum ac tortor varius, 
      hendrerit auctor est volutpat.`,
    avatar: '/static/fixtures/guy-1.svg',
    comments: 9,
    retweets: 10,
    likes: 30
  },
  {
    name: "Marvin McKinney",
    username: "@marvin_MCK",
    text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin aliquet ipsum ac tortor varius, 
      hendrerit auctor est volutpat.`,
    avatar: '/static/fixtures/guy-2.svg',
    comments: 4,
    retweets: 70,
    likes: 47
  },
  {
    name: "Darrell Steward",
    username: "@Darell_ste",
    text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin aliquet ipsum ac tortor varius, 
      hendrerit auctor est volutpat.`,
    avatar: '/static/fixtures/guy-3.svg',
    comments: 9,
    retweets: 60,
    likes: 278
  },
  {
    name: "Floyd Miles",
    username: "@floyd_miles",
    text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin aliquet ipsum ac tortor varius, 
      hendrerit auctor est volutpat.`,
    avatar: '/static/fixtures/guy-1.svg',
    comments: 1,
    retweets: 5,
    likes: 17
  }
];

const Projects = [
  {
    name: "Organizer",
    description: "Command for organizing files inside a directory",
    language: "Go",
    stars: 3
  },
  {
    name: "Opus",
    description: `An audio fingerprinting microservice. 
    Allow to creae a unique fingerprint for your audio files, and compare two songs.`,
    language: "Python",
    stars: 10
  },
  {
    name: "react-lists-dnd",
    description: "Drag and drop lists with reactjs",
    language: "Typescript",
    stars: 15
  },
  {
    name: "ozone-app",
    description: "Android application for monitoring data usage.",
    language: "Java",
    stars: 3
  },
  {
    name: "alt-vuln",
    description: "vulnerabilities and exploits search engine",
    language: "Python",
    stars: 6
  },
  {
    name: "ussd_simulator",
    description: "simulation for ussd server and client",
    language: "C",
    stars: 3
  }
];

export const Home = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <Layout title={t("title:home")}>
      <div className="home-page">
        <section id="banner">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <h1>Lorem ipsum dolor sit amet, consectetur adipscing elit.</h1>
                <p>
                  <Button color="primary" outline> COMMUNITY PROJECTS </Button>
                </p>
              </div>
              <div className="col-md-6 text-right">
                <img alt="developer illustration" src="/static/img/developer.svg" style={{marginTop: "30px"}}/>
              </div>
            </div>
          </div>
        </section>

        <section className="item-center" id="search">
          <div className="text-center">
            <h2>Looking for experienced developers ?</h2>
            <form>
              <input className="search-input" placeholder="ex: Full Stack Web Developer" type="text" />
            </form>
            <a href="#">Advenced search</a>
          </div>
        </section>

        <section className="item-center" id="projects">
          <div className="text-center">
            <h2> TOP PROJECTS </h2>
            <div className="container">
              <div className="row" style={{margin: "40px 0 40px 0"}}>
                {Projects.map((project, i) => (
                  <div className="col-md-4" key={i} style={{margin: "20px 0 20px 0"}}>
                    <Project description={project.description}
                      language={project.language}
                      name={project.name}
                      stars={project.stars} />
                  </div>
                ))}
              </div>
            </div>
            <Button color="primary">VIEW MORE PROJECTS</Button>
          </div>
        </section>

        <section className="item-center" id="tweets">
          <div className="text-center">
            <h2> TOP TWEETS </h2>
            <div className="container">
              <div className="row" style={{margin: "40px 0 40px 0"}}>
                {Tweets.map((tweet, i) => (
                  <div className="col-md-4" key={i} style={{margin: "20px 0 20px 0"}}>
                    <Tweet avatar={tweet.avatar}
                      comments={tweet.comments}
                      likes={tweet.likes}
                      name={tweet.name}
                      retweets={tweet.retweets}
                      text={tweet.text}
                      username={tweet.username} />
                  </div>
                ))}
              </div>
            </div>
            <Button color="primary"> VIEW MORE TWEETS </Button>
          </div>
        </section>
      </div>
    </Layout>
  );
};

Home.getInitialProps = async () => ({
  namespacesRequired: ["common"],
});

export default Home;
