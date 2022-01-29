import React, { useContext, useState } from "react";
import { Collapse, Navbar, NavbarToggler, Nav, NavItem, Container } from "reactstrap";
import { useIntl } from "react-intl";
import { NavLink } from "react-router-dom";

import ActiveLink from "../../components/utils/activeLink";
import { commonMessages } from "../../locales/messages";

import logo from "../../assets/icons/oss.svg";
import darkLogo from "../../assets/icons/dark-logo.svg";
import lightLogo from "../../assets/icons/light-logo.svg";
import { ThemeContext, DARK, LIGHT } from "../utils/ThemeProvider";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const { formatMessage } = useIntl();
  const themeContext = useContext(ThemeContext);

  const getLogo = () => {
    if (!themeContext.isChristmas) {
      return logo;
    }
    return themeContext.theme === LIGHT ? lightLogo : darkLogo;
  };

  return (
    <header style={{ borderTop: "5px solid var(--primary-color)" }}>
      <Container>
        <Navbar dark={themeContext.theme === DARK} expand="md" light={themeContext.theme === LIGHT}>
          <NavLink className="navbar-brand cursor-pointer" to="/">
            <img alt="OSS logo" src={getLogo()} />
            <span className="d-sm-none d-inline-block" style={{ marginLeft: "8px", verticalAlign: "middle", fontSize: "1.2rem" }}>
              OSS
            </span>
          </NavLink>
          <NavbarToggler color="dark" onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem className="nav-item item-center">
                <ActiveLink href="/developers">{formatMessage(commonMessages.developers)}</ActiveLink>
              </NavItem>
              <NavItem className="nav-item item-center">
                <ActiveLink href="/projects">{formatMessage(commonMessages.projects)}</ActiveLink>
              </NavItem>
              <NavItem className="nav-item item-center">
                <a className="txt-dark" href="https://twitter.com/caparledev" rel="noreferrer" target="_blank">
                  {formatMessage(commonMessages.tweets)}
                </a>
              </NavItem>
              <NavItem className="nav-item item-center">
                <a className="txt-dark" href="https://blog.osscameroon.com" rel="noreferrer" target="_blank">
                  {formatMessage(commonMessages.blog)}
                </a>
              </NavItem>
              <NavItem className="nav-item item-center">
                <a className="txt-dark" href="https://miniyotas.osscameroon.com/shop" rel="noreferrer" target="_blank">
                  {formatMessage(commonMessages.yotas)}
                </a>
              </NavItem>
            </Nav>
            <div className="nav-item item-center">
              <a
                className="btn-join-us btn btn-primary"
                color="primary"
                href="https://t.me/joinchat/UpKZh_T3W02LsGvQ"
                rel="noreferrer"
                target="_blank"
              >
                {formatMessage(commonMessages.joinUs)}
              </a>
            </div>
          </Collapse>
        </Navbar>
      </Container>
    </header>
  );
};

export default Header;
