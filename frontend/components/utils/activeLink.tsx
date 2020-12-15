import React, { PropsWithChildren } from "react";
import { useRouter } from "next/router";

import { LocaleLink } from "./localeLink";

type ActiveLinkProps = {
  href: string;
};

const ActiveLink = ({ children, href }: PropsWithChildren<ActiveLinkProps>) => {
  const router = useRouter();
  const style = {
    marginRight: 10,
    color: router.pathname.includes(href) ? "#2f80ed" : "black",
  };

  return (
    <LocaleLink as={href} href={href}>
      <a style={style}>{children}</a>
    </LocaleLink>
  );
};

export default ActiveLink;
