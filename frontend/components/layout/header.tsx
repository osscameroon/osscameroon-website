import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container,
} from "reactstrap";

import ActiveLink from "../utils/ActiveLink";
import intl from "../../utils/i18n";

const { Link, i18n, useTranslation } = intl;

const getFlag = (locale: string) => {
  if (locale === "fr") {
    return "/static/icons/flags/fr.svg";
  }

  return "/static/icons/flags/en.svg";
};

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const { t } = useTranslation();

  return (
    <header>
      <Container>
        <Navbar color="white" expand="md">
          <Link href="/">
            <a className="navbar-brand">
              <img alt="OSS logo" src="/static/icons/oss.svg" />
            </a>
          </Link>
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
              <Link href="#">
                <a className="btn-join-us btn btn-primary" color="primary">
                  JOIN US
                </a>
              </Link>
              {i18n.language && (
                <Nav navbar>
                  <UncontrolledDropdown inNavbar nav>
                    <DropdownToggle nav>
                      <img alt="Flag" height={16} src={getFlag(i18n.language)} />
                    </DropdownToggle>

                    <DropdownMenu right>
                      <DropdownItem onClick={() => i18n.changeLanguage("fr")}>
                        <img alt="French Flag" height={16} src="/static/icons/flags/fr.svg" /> {t("french")}
                      </DropdownItem>
                      <DropdownItem onClick={() => i18n.changeLanguage("en")}>
                        <img alt="English Flag" height={16} src="/static/icons/flags/en.svg" /> {t("english")}
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </Nav>
              )}
            </div>
          </Collapse>
        </Navbar>
      </Container>
    </header>
  );
};

export default Header;
