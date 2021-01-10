import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import "@formatjs/intl-relativetimeformat/polyfill";
import "@formatjs/intl-relativetimeformat/dist/include-aliases";
import "@formatjs/intl-relativetimeformat/dist/locale-data/en";
import "@formatjs/intl-relativetimeformat/dist/locale-data/de";
import "@formatjs/intl-relativetimeformat/dist/locale-data/es";
import "@formatjs/intl-relativetimeformat/dist/locale-data/fr";

import messages_en from "./locales/en.json";
import messages_fr from "./locales/fr.json";

import LocaleProvider, { LocaleSwitcher } from "./components/localeProvider";
import HomePage from "./containers/home";
import DeveloperPage from "./containers/developers";
import ProjectPage from "./containers/projects";
import NotFound from "./containers/notFound";
import {QUERY_CACHE_TIME, QUERY_STALE_TIME} from "./config";

const messages = {
  en: messages_en,
  fr: messages_fr,
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: QUERY_STALE_TIME,
      cacheTime: QUERY_CACHE_TIME
    }
  }
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <LocaleSwitcher.Provider>
        <LocaleProvider messages={messages}>
          <BrowserRouter>
            <Switch>
              <Route exact={true} path="/" name="Login Page" component={HomePage} />
              <Route exact={true} path="/developers" name="Register Page" component={DeveloperPage} />
              <Route exact={true} path="/projects" name="Register Page" component={ProjectPage} />
              <Route name="Page 404" component={NotFound} />
            </Switch>
          </BrowserRouter>
        </LocaleProvider>
      </LocaleSwitcher.Provider>
    </QueryClientProvider>
  );
};

export default App;
