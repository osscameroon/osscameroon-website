import React from "react";
import { DropdownItem, DropdownMenu, DropdownToggle, Nav, UncontrolledDropdown } from "reactstrap";
import { useIntl } from "react-intl";
import { NavLink } from "react-router-dom";

import { footerMessages, localeMessages } from "../../locales/messages";

import frenchFlagIcon from "../../assets/icons/flags/fr.svg";
import englishFlagIcon from "../../assets/icons/flags/en.svg";
import twitterIcon from "../../assets/icons/twitter-30-px.svg";
import telegramIcon from "../../assets/icons/telegram-30-px.svg";
import githubIcon from "../../assets/icons/github-30-px.svg";
import { LocaleSwitcher } from "../localeProvider";
import DarkModeSwitch from "components/utils/ThemeSwitcherBtn";

const getFlag = (locale: string) => {
  return locale === "fr" ? frenchFlagIcon : englishFlagIcon;
};

const Footer = () => {
  const year = new Date().getFullYear();
  const { formatMessage } = useIntl();
  const { changeLocale, locale } = LocaleSwitcher.useContainer();

  return (
    <footer className="d-flex justify-content-center align-items-center h-50 footer">
      <div className="container">
        <div className="row">
          <div className="col-md-5 description">
            {/*<img alt="OSS 237 Logo" className="desc-img" src="/static/icons/logo-alt.svg" />*/}
            {/*<img alt="OSS logo" src="/static/icons/oss.svg" />*/}
            <h3 className="font-weight-bold">{formatMessage(footerMessages.aboutTitle)}</h3>
            <p>{formatMessage(footerMessages.aboutText)}</p>
          </div>
          <div className="offset-md-1 col-md-3">
            <h3 className="font-weight-bold">{formatMessage(footerMessages.menuTitle)}</h3>
            <ul className="site">
              <li>
                <NavLink to="/projects">
                  <span>{formatMessage(footerMessages.projects)}</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/developers">
                  <span>{formatMessage(footerMessages.developers)}</span>
                </NavLink>
              </li>
              <li>
                <a className="txt-dark" href="https://blog.osscameroon.com" rel="noreferrer" target="_blank">
                  {formatMessage(footerMessages.blog)}
                </a>
              </li>
              <li>
                <a className="txt-dark" href="https://miniyotas.osscameroon.com/shop" rel="noreferrer" target="_blank">
                  {formatMessage(footerMessages.yotas)}
                </a>
              </li>
              <li>
                <a className="txt-dark" href="https://github.com/osscameroon/Branding" rel="noreferrer" target="_blank">
                  {formatMessage(footerMessages.brandResources)}
                </a>
              </li>
              <li>
                <NavLink to="/privacy">
                  <span>{formatMessage(footerMessages.privacy)}</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/terms">
                  <span>{formatMessage(footerMessages.terms)}</span>
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="col-md-3">
            <h3 className="font-weight-bold">{formatMessage(footerMessages.joinUs)}</h3>
            <ul className="join-us">
              <li>
                <a href="https://twitter.com/osscameroon" rel="noreferrer" target="_blank">
                  <img alt="Twitter logo" src={twitterIcon} />
                </a>
              </li>
              <li>
                <a href="https://github.com/osscameroon" rel="noreferrer" target="_blank">
                  <img alt="Github logo" src={githubIcon} />
                </a>
              </li>
              <li>
                <a href="https://t.me/joinchat/UpKZh_T3W02LsGvQ" rel="noreferrer" target="_blank">
                  <img alt="telegram Logo" src={telegramIcon} />{" "}
                </a>
              </li>
            </ul>
            <DarkModeSwitch />
            <div>
              <Nav className="locale-selector" navbar>
                <UncontrolledDropdown inNavbar nav>
                  <DropdownToggle className="d-flex align-items-center" nav>
                    <img alt="Flag" height={16} src={getFlag(locale)} />
                    {locale === "en" ? formatMessage(localeMessages.english) : formatMessage(localeMessages.french)}
                  </DropdownToggle>

                  <DropdownMenu className="locale-selector-dropdown" right>
                    <DropdownItem className="d-flex align-items-center" onClick={() => changeLocale("fr")}>
                      <img alt="French Flag" height={16} src={frenchFlagIcon} />
                      {formatMessage(localeMessages.french)}
                    </DropdownItem>
                    <DropdownItem className="d-flex align-items-center" onClick={() => changeLocale("en")}>
                      <img alt="English Flag" height={16} src={englishFlagIcon} />
                      {formatMessage(localeMessages.english)}
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Nav>
            </div>
          </div>
        </div>
        <div className="row text-center">
          <div className="col-md-12">
            &copy; {year} OSS Cameroon, {formatMessage(footerMessages.copyright)}.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
