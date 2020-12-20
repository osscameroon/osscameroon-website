import React from "react";
import Link from "next/link";

import intl from "@utils/i18n";

const { useTranslation } = intl;

const LocaleLink = ({ as, href, ...props }) => {
  const {
    i18n: { language },
  } = useTranslation();
  return <Link {...props} as={`/${language}${as}`} href={`/${language}${href}`} />;
};

export default LocaleLink;
