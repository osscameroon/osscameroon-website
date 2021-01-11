import React from "react";
import { Helmet } from "react-helmet";

const AppHeader = () => {
  return (
    <Helmet>
      <html lang="en" />
      <title>OSS Cameroon</title>
      <meta content="initial-scale=1.0, width=device-width" name="viewport" />
      <meta content="Open Source Software in Cameroon" name="description" />
      <meta content="#E6E6FA" name="theme-color" />
      <link href="/favicon.ico" rel="icon" />
    </Helmet>
  );
};

export default AppHeader;
