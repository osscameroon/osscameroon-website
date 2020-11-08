import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-xhr-backend";

i18n
  .use(LanguageDetector)
  .use(Backend)
  .use(initReactI18next)
  .init({
    debug: true,
    lng: "en",
    fallbackLng: "en",
    defaultNS: "messages",
    interpolation: {
      escapeValue: false, // not needed for react!!
    },
    react: {
      wait: true,
    },
  });

export default i18n;
