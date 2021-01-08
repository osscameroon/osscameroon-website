import React, { PropsWithChildren } from "react";

import Header from "./header";
import Footer from "./footer";

type LayoutProps = {
  title: string;
};

const Layout = ({ children }: PropsWithChildren<LayoutProps>) => {
  return (
    <div>
      {/*<Head>
        <title>{`${t("appName")} - ${title}`}</title>
        <meta content="initial-scale=1.0, width=device-width" name="viewport" />
        <link href="/favicon.ico" rel="icon" />
      </Head>*/}
      <div className="app-container">
        <Header />
        <main className="content">{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
