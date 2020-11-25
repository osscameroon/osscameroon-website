import React from "react";
import {useTranslation} from "react-i18next";
import Link from "next/link";

const Footer = () => {
  const year = new Date().getFullYear();
  const { t } = useTranslation();

  return (
    <footer className="d-flex justify-content-center align-items-center h-50 footer">
      <div className="container">
        <div className="row">
          <div className="col-md-5 description">
            <img alt="OSS 237 Logo" className="desc-img" src="/static/icons/logo-alt.svg" />
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Nulla venenatis leo nibh, nec consectetur ligula sollicitudin ac.
              Duis eu lorem venenatis, feugiat erat eget, bibendum massa.
              Sed ac ipsum eget libero faucibus tincidunt sed eu massa.
            </p>
          </div>
          <div className="offset-md-1 col-md-3">
            <h3 className="font-weight-bold">Site</h3>
            <ul className="site">
              <li>
                <Link href="/projects" >
                  <a>{t("projects")}</a>
                </Link>
              </li>
              <li>
                <Link href="/developers">
                  <a>{t("developers")}</a>
                </Link>
              </li>
              <li>
                <a href="https://twitter.com/hashtag/CaParleDev">{t("tweets")}</a>
              </li>
              <li>
                <Link href="/privacy">
                  <a>{t("privacy")}</a>
                </Link>
              </li>
              <li>
                <Link href="/terms">
                  <a>{t("terms")}</a>
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-md-3">
            <h3 className="font-weight-bold">Join us</h3>
            <ul className="join-us">
              <li><a href="https://twitter.com/caparledev"><img alt="Twitter logo" src="/static/icons/twitter-30-px.svg" /></a></li>
              <li><a href="https://github.com/osscameroon"><img alt="Github logo" src="/static/icons/github-30-px.svg" /></a></li>
              <li><a href="#"><img alt="telegram Logo" src="/static/icons/telegram-30-px.svg" /> </a></li>
            </ul>
          </div>
        </div>
        <div className="row text-center">
          <div className="col-md-12">
            &copy; {year} Open Source Software 237, {t("copyright")}.
          </div>
        </div>
      </div>
    </footer>
  );
};

export { Footer };
