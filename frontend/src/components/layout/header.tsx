import React, { useState } from "react";
import { Collapse, Navbar, NavbarToggler, Nav, NavItem, Container } from "reactstrap";
import {useIntl} from "react-intl";
import {NavLink} from "react-router-dom";

import ActiveLink from "../../components/utils/activeLink";
import {commonMessages} from "../../locales/messages";

import logo from '../../assets/icons/oss.svg';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const { formatMessage } = useIntl();

  return (
    <header>
      <Container>
        <Navbar color="white" expand="md">
          <NavLink to="/">
            <a className="navbar-brand cursor-pointer">
              <img alt="OSS logo" src={logo} />
            </a>
          </NavLink>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <ActiveLink href="/developers">{formatMessage(commonMessages.developers)}</ActiveLink>
              </NavItem>
              <NavItem>
                <ActiveLink href="/projects">{formatMessage(commonMessages.projects)}</ActiveLink>
              </NavItem>
              <NavItem>
                <a className="text-dark" href="https://twitter.com/caparledev" rel="noreferrer" target="_blank">
                  {formatMessage(commonMessages.tweets)}
                </a>
              </NavItem>
            </Nav>
            <div className="d-flex align-items-center">
              <a className="btn-join-us btn btn-primary" color="primary" href="https://telegram.org" rel="noreferrer" target="_blank">
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
