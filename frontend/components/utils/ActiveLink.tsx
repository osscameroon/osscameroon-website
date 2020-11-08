import { PropsWithChildren } from "react";
import { useRouter } from "next/router";

import intl from "../../utils/i18n";

const { Link } = intl;

type ActiveLinkProps = {
  href: string;
};

const ActiveLink = ({ children, href }: PropsWithChildren<ActiveLinkProps>) => {
  const router = useRouter();
  const style = {
    marginRight: 10,
    color: router.pathname === href ? "blue" : "black",
  };

  return (
    <Link href={href}>
      <a style={style}>{children}</a>
    </Link>
  );
};

export default ActiveLink;
