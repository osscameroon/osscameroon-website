import React from "react";

import "../styles/index.css";

const App = ({ Component, pageProps }: any) => {
  return <Component {...pageProps} />;
};

export default App;
