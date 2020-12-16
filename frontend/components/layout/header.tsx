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
            <a className="navbar-brand">
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
                <ActiveLink href="/tweets">{t("tweets")}</ActiveLink>
              </NavItem>
            </Nav>
            <div className="d-flex align-items-center">
              <LocaleLink as="#" href="#">
                <a className="btn-join-us btn btn-primary" color="primary">
                  {t("joinUs")}
                </a>
              </LocaleLink>
            </div>
          </Collapse>
        </Navbar>
      </Container>
    </header>
  );
};

export default Header;
