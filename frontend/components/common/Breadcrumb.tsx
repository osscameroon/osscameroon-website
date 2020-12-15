import * as React from "react";
import Link from "next/link";


type BreadcrumbProps = {
  links: {title: string, href: string}[]
}

const style = {
  breadcrumb: {
    display: "flex",
    alignItems: "center",
    background: "var(--dark-color)",
    color: "var(--white)",
    height: "70px"
  },
  bottom: {
    verticalAlign: "bottom"
  },
  a: {
    color: "var(--white)",
    textDecoration: "none"
  }
};

export const Breadcrumb: React.FunctionComponent<BreadcrumbProps> = (props) => {
  return (
    <div className="container-fluid" style={style.breadcrumb}>
      <div className="container">
        <Link href="/">
          <a style={style.a}>
            <img alt="home icon" src="/static/icons/home.svg" style={style.bottom}/> Home
          </a>
        </Link>
        {props.links.map((link, index) => {
          if(index === props.links.length - 1){
            return <span key={index}> / {link.title}</span>;
          }
          return <Link href={link.href} key={index}> <a style={style.a}> / {link.title} </a> </Link>;
        })}
      </div>
    </div>
  );
};
