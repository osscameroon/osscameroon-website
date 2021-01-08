import React, { FC, ReactElement, useState } from "react";
import { IntlProvider } from "react-intl";
import { createContainer } from "unstated-next";

import { LocaleMessages } from "../../utils/types";

type ILocaleProviderProps = {
  messages: LocaleMessages;
  children: React.ReactElement;
};

export const useLocale = () => {
  const [locale, setLocale] = useState("en");

  const changeLocale = (locale: string) => {
    setLocale(locale);
  };

  return { locale, changeLocale };
};

export const LocaleSwitcher = createContainer(useLocale);

const LocaleProvider: FC<ILocaleProviderProps> = ({ children, messages }: ILocaleProviderProps): ReactElement => {
  const { locale } = LocaleSwitcher.useContainer();

  return (
    <IntlProvider locale={locale} key={locale} messages={messages[locale]}>
      {React.Children.only(children)}
    </IntlProvider>
  );
};

export default LocaleProvider;
