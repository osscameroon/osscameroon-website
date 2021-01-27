import React, { PropsWithChildren } from "react";
import { NavLink, useLocation } from "react-router-dom";

type ActiveLinkProps = {
  href: string;
};

const ActiveLink = ({ children, href }: PropsWithChildren<ActiveLinkProps>) => {
  const location = useLocation();
  const style = {
    color: location.pathname.includes(href) ? "var(--link)" : "var(--txt-dark)",
  };

  return (
    <NavLink to={href}>
      <span style={style}>{children}</span>
    </NavLink>
  );
};

export default ActiveLink;
