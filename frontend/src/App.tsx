import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import "@formatjs/intl-relativetimeformat/polyfill";
import "@formatjs/intl-relativetimeformat/dist/include-aliases";
import "@formatjs/intl-relativetimeformat/dist/locale-data/en";
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
              <Route component={HomePage} exact={true} name="Login Page" path="/" />
              <Route component={DeveloperPage} exact={true} name="Register Page" path="/developers" />
              <Route component={ProjectPage} exact={true} name="Register Page" path="/projects" />
              <Route component={NotFound} name="Page 404" />
            </Switch>
          </BrowserRouter>
        </LocaleProvider>
      </LocaleSwitcher.Provider>
    </QueryClientProvider>
  );
};

export default App;
