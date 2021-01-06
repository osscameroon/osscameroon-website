import React from "react";
import {useIntl} from "react-intl";
import {NavLink} from "react-router-dom";

import {commonMessages} from "../../locales/messages";
import homeIcon from "../../assets/icons/home.svg";

type BreadcrumbProps = {
  links: { title: string; href: string }[];
};

const style = {
  breadcrumb: {
    display: "flex",
    alignItems: "center",
    background: "var(--dark-color)",
    color: "var(--white)",
    height: "70px",
  },
  bottom: {
    verticalAlign: "bottom",
  },
  a: {
    color: "var(--white)",
    textDecoration: "none",
  },
};

const Breadcrumb = ({ links }: BreadcrumbProps) => {
  const { formatMessage } = useIntl();

  return (
    <div className="container-fluid" style={style.breadcrumb}>
      <div className="container">
        <NavLink to="/">
          <span style={style.a}>
            <img alt="home icon" src={homeIcon} style={style.bottom} /> {formatMessage(commonMessages.home)}
          </span>
        </NavLink>
        {links.map((link, index) => {
          if (index === links.length - 1) {
            return <span key={index}> / {link.title}</span>;
          }
          return (
            <NavLink to="#" key={index}>
              <span style={style.a}> / {link.title} </span>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default Breadcrumb;
