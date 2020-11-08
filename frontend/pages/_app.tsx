import React, { Suspense } from "react";
import "../utils/i18n";

import "../styles/index.css";

const App = ({ Component, pageProps }: any) => {
  return (
    <Suspense fallback="loading">
      <Component {...pageProps} />
    </Suspense>
  );
};

export default App;
