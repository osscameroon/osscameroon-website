import { PropsWithChildren } from "react";
import { useRouter } from "next/router";

type ActiveLinkProps = {
  href: string;
};

const ActiveLink = ({ children, href }: PropsWithChildren<ActiveLinkProps>) => {
  const router = useRouter();
  const style = {
    marginRight: 10,
    color: router.pathname === href ? "blue" : "black",
  };

  const handleClick = (e: any) => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <a href={href} style={style} onClick={handleClick}>
      {children}
    </a>
  );
};

export default ActiveLink;
