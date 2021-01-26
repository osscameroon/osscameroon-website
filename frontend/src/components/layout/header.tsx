import React, { useState } from "react";
import { Collapse, Navbar, NavbarToggler, Nav, NavItem, Container } from "reactstrap";
import { useIntl } from "react-intl";
import { NavLink } from "react-router-dom";

import ActiveLink from "../../components/utils/activeLink";
import { commonMessages } from "../../locales/messages";

import logo from "../../assets/icons/oss.svg";
import DarkModeSwitch from "components/utils/DarkModeBtn";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const { formatMessage } = useIntl();

  return (
    <header style={{ borderTop: "5px solid var(--primary-color)" }}>
      <Container>
        <Navbar color="white" expand="md" light>
          <NavLink className="navbar-brand cursor-pointer" to="/">
            <img alt="OSS logo" src={logo} />
            <span className="d-sm-none d-inline-block" style={{ marginLeft: "8px", verticalAlign: "middle", fontSize: "1.2rem" }}>
              OSS
            </span>
          </NavLink>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem className="nav-item item-center">
                <ActiveLink href="/developers">{formatMessage(commonMessages.developers)}</ActiveLink>
              </NavItem>
              <NavItem className="nav-item item-center">
                <ActiveLink href="/projects">{formatMessage(commonMessages.projects)}</ActiveLink>
              </NavItem>
              <NavItem className="nav-item item-center">
                <a className="text-dark" href="https://twitter.com/caparledev" rel="noreferrer" target="_blank">
                  {formatMessage(commonMessages.tweets)}
                </a>
              </NavItem>
            </Nav>
            <div className="nav-item item-center">
              <DarkModeSwitch />
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
