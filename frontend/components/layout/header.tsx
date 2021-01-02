import React, { useState } from "react";
import { Collapse, Navbar, NavbarToggler, Nav, NavItem, Container } from "reactstrap";

import intl from "@utils/i18n";
import ActiveLink from "@components/utils/activeLink";
import LocaleLink from "@components/utils/localeLink";

const { useTranslation } = intl;

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const { t } = useTranslation();

  return (
    <header>
      <Container>
        <Navbar color="white" expand="md">
          <LocaleLink as="" href="">
            <a className="navbar-brand cursor-pointer">
              <img alt="OSS logo" src="/static/icons/oss.svg" />
            </a>
          </LocaleLink>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <ActiveLink href="/developers">{t("developers")}</ActiveLink>
              </NavItem>
              <NavItem>
                <ActiveLink href="/projects">{t("projects")}</ActiveLink>
              </NavItem>
              <NavItem>
                <a className="text-dark" href="https://twitter.com/caparledev" rel="noreferrer" target="_blank">
                  {t("tweets")}
                </a>
              </NavItem>
            </Nav>
            <div className="d-flex align-items-center">
              <a className="btn-join-us btn btn-primary" color="primary" href="https://telegram.org" rel="noreferrer" target="_blank">
                {t("joinUs")}
              </a>
            </div>
          </Collapse>
        </Navbar>
      </Container>
    </header>
  );
};

export default Header;
