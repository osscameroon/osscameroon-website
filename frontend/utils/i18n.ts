import NextI18Next from "next-i18next";
import path from "path";

const ni18n = new NextI18Next({
  defaultLanguage: "en",
  otherLanguages: ["fr"],
  localeSubpaths: {
    en: "en",
    fr: "fr",
  },
  localePath: path.resolve("./public/static/locales"),
});

export default ni18n;
