import React from "react";
import App from "next/app";

import intl from "@utils/i18n";

import "@styles/index.scss";

const { appWithTranslation } = intl;

const MyApp = ({ Component, pageProps }: any) => {
  return <Component {...pageProps} />;
};

MyApp.getInitialProps = async (appContext: any) => ({ ...(await App.getInitialProps(appContext)) });

// @ts-ignore
export default appWithTranslation(App);
