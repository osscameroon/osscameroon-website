import React, { useState } from "react";
import { Collapse, Navbar, NavbarToggler, Nav, NavItem, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";

import ActiveLink from "../utils/ActiveLink";
import intl from "../../utils/i18n";

const { Link, i18n, useTranslation } = intl;

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const { t } = useTranslation();

  return (
    <div>
      <Navbar color="light" expand="md" light>
        <Link href="/">
          <a className="navbar-brand">OSS CM</a>
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
          <Nav navbar>
            <UncontrolledDropdown inNavbar nav>
              <DropdownToggle caret nav>
                {t("language")}
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem onClick={() => i18n.changeLanguage("fr")}>{t("french")}</DropdownItem>
                <DropdownItem onClick={() => i18n.changeLanguage("en")}>{t("english")}</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
