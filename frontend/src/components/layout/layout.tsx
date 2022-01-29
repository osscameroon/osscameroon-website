import React, { PropsWithChildren } from "react";
import { Helmet } from "react-helmet";
import { useIntl } from "react-intl";

import Header from "./header";
import Footer from "./footer";
import { commonMessages } from "../../locales/messages";
import { IS_PRODUCTION } from "../../config";
import { ThemeContext } from "../utils/ThemeProvider";

type LayoutProps = {
  title: string;
};

const Layout = ({ children, title }: PropsWithChildren<LayoutProps>) => {
  const { formatMessage } = useIntl();
  const themeContext = React.useContext(ThemeContext);
  return (
    <div>
      <Helmet>
        {themeContext.isChristmas && <link href="/merry-christmas-oss.ico" rel="shortcut icon" />}
        <title>{`${formatMessage(commonMessages.appName)} - ${title}`}</title>
        {IS_PRODUCTION && <script src="https://www.googletagmanager.com/gtag/js?id=G-74NJSCWW8W" async />}
        {IS_PRODUCTION && (
          <script>
            {`window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', 'G-74NJSCWW8W');`}
          </script>
        )}
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
