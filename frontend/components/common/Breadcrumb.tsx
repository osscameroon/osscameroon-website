import * as React from "react";
import LocaleLink from "@components/utils/localeLink";

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

const Breadcrumb: React.FunctionComponent<BreadcrumbProps> = (props) => {
  return (
    <div className="container-fluid" style={style.breadcrumb}>
      <div className="container">
        <LocaleLink as="/" href="/">
          <a style={style.a}>
            <img alt="home icon" src="/static/icons/home.svg" style={style.bottom} /> Home
          </a>
        </LocaleLink>
        {props.links.map((link, index) => {
          if (index === props.links.length - 1) {
            return <span key={index}> / {link.title}</span>;
          }
          return (
            <LocaleLink as="#" href={link.href} key={index}>
              <a style={style.a}> / {link.title} </a>
            </LocaleLink>
          );
        })}
      </div>
    </div>
  );
};

export default Breadcrumb;
