import React from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";

const LocaleLink = ({ as, href, ...props }) => {
  const {
    i18n: { language },
  } = useTranslation();
  return <Link {...props} as={`/${language}${as}`} href={`/${language}${href}`} />;
};

export { LocaleLink };
