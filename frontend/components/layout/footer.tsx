import React from "react";
import { DropdownItem, DropdownMenu, DropdownToggle, Nav, UncontrolledDropdown } from "reactstrap";

import intl from "@utils/i18n";
import LocaleLink from "@components/utils/localeLink";

const { i18n, useTranslation } = intl;

const getFlag = (locale: string) => {
  if (locale === "fr") {
    return "/static/icons/flags/fr.svg";
  }

  return "/static/icons/flags/en.svg";
};

const Footer = () => {
  const year = new Date().getFullYear();
  const { t } = useTranslation(["footer", "common"]);

  return (
    <footer className="d-flex justify-content-center align-items-center h-50 footer">
      <div className="container">
        <div className="row">
          <div className="col-md-5 description">
            <img alt="OSS 237 Logo" className="desc-img" src="/static/icons/logo-alt.svg" />
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla venenatis leo nibh, nec consectetur ligula sollicitudin ac. Duis eu lorem
              venenatis, feugiat erat eget, bibendum massa. Sed ac ipsum eget libero faucibus tincidunt sed eu massa.
            </p>
          </div>
          <div className="offset-md-1 col-md-3">
            <h3 className="font-weight-bold">{t("footer:menuTitle")}</h3>
            <ul className="site">
              <li>
                <LocaleLink as="/projects" href="/projects">
                  <a>{t("footer:projects")}</a>
                </LocaleLink>
              </li>
              <li>
                <LocaleLink as="/developers" href="/developers">
                  <a>{t("footer:developers")}</a>
                </LocaleLink>
              </li>
              <li>
                <a href="https://twitter.com/hashtag/CaParleDev" rel="noreferrer" target="_blank">
                  {t("tweets")}
                </a>
              </li>
              <li>
                <LocaleLink as="/privacy" href="/privacy">
                  <a>{t("footer:privacy")}</a>
                </LocaleLink>
              </li>
              <li>
                <LocaleLink as="/terms" href="/terms">
                  <a>{t("footer:terms")}</a>
                </LocaleLink>
              </li>
            </ul>
          </div>
          <div className="col-md-3">
            <h3 className="font-weight-bold">{t("footer:joinUs")}</h3>
            <ul className="join-us">
              <li>
                <a href="https://twitter.com/caparledev" rel="noreferrer" target="_blank">
                  <img alt="Twitter logo" src="/static/icons/twitter-30-px.svg" />
                </a>
              </li>
              <li>
                <a href="https://github.com/osscameroon" rel="noreferrer" target="_blank">
                  <img alt="Github logo" src="/static/icons/github-30-px.svg" />
                </a>
              </li>
              <li>
                <a href="#" rel="noreferrer" target="_blank">
                  <img alt="telegram Logo" src="/static/icons/telegram-30-px.svg" />{" "}
                </a>
              </li>
            </ul>
            <div>
              {i18n.language && (
                <Nav className="locale-selector" navbar>
                  <UncontrolledDropdown inNavbar nav>
                    <DropdownToggle className="d-flex align-items-center" nav>
                      <img alt="Flag" height={16} src={getFlag(i18n.language)} />
                      {i18n.language === "en" ? t("common:english") : t("common:french")}
                    </DropdownToggle>

                    <DropdownMenu className="locale-selector-dropdown" right>
                      <DropdownItem className="d-flex align-items-center" onClick={() => i18n.changeLanguage("fr")}>
                        <img alt="French Flag" height={16} src="/static/icons/flags/fr.svg" />
                        {t("common:french")}
                      </DropdownItem>
                      <DropdownItem className="d-flex align-items-center" onClick={() => i18n.changeLanguage("en")}>
                        <img alt="English Flag" height={16} src="/static/icons/flags/en.svg" />
                        {t("common:english")}
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </Nav>
              )}
            </div>
          </div>
        </div>
        <div className="row text-center">
          <div className="col-md-12">
            &copy; {year} Open Source Software 237, {t("footer:copyright")}.
          </div>
        </div>
      </div>
    </footer>
  );
};

Footer.getInitialProps = async () => ({
  namespacesRequired: ["footer", "common"],
});

export default Footer;
