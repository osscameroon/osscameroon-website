import React, { PropsWithChildren } from "react";
import Head from "next/head";
import { Row } from "reactstrap";

import Header from "./header";
import { Footer } from "./footer";

type LayoutProps = {
  title: string;
};

const Layout = ({ children, title }: PropsWithChildren<LayoutProps>) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta content="initial-scale=1.0, width=device-width" name="viewport" />
      <link href="/favicon.ico" rel="icon" />
    </Head>
    <div className="app-container">
      <Header />
      <Row className="content">{children}</Row>
      <Footer />
    </div>
  </div>
);

export { Layout };
