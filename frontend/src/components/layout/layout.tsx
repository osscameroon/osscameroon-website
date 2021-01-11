import React, { PropsWithChildren } from "react";
import { Helmet } from "react-helmet";
import { useIntl } from "react-intl";

import Header from "./header";
import Footer from "./footer";
import { commonMessages } from "../../locales/messages";

type LayoutProps = {
  title: string;
};

const Layout = ({ children, title }: PropsWithChildren<LayoutProps>) => {
  const { formatMessage } = useIntl();
  return (
    <div>
      <Helmet>
        <title>{`${formatMessage(commonMessages.appName)} - ${title}`}</title>
      </Helmet>
      <div className="app-container">
        <Header />
        <main className="content">{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
