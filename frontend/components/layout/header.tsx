import React, { useState } from "react";
import Link from "next/link";
import { Collapse, Navbar, NavbarToggler, Nav, NavItem, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";

import ActiveLink from "../utils/ActiveLink";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

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
              <ActiveLink href="/developers">Developers</ActiveLink>
            </NavItem>
            <NavItem>
              <ActiveLink href="/projects">Projects</ActiveLink>
            </NavItem>
            <NavItem>
              <ActiveLink href="/tweets">Tweets</ActiveLink>
            </NavItem>
          </Nav>
          <Nav navbar>
            <UncontrolledDropdown inNavbar nav>
              <DropdownToggle caret nav>
                Language
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>French</DropdownItem>
                <DropdownItem>English</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export { Header };
