import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import HOME_EN from "./locales/en/home.json";
import DETAILS_EN from "./locales/en/details.json";
import HOME_VI from "./locales/vi/home.json";
import DETAILS_VI from "./locales/vi/details.json";

export const locales = {
  en: "English",
  vi: "Tiếng Việt",
};

const resources = {
  en: {
    home: HOME_EN,
    details: DETAILS_EN,
  },
  vi: {
    home: HOME_VI,
    details: DETAILS_VI,
  },
};

const defaultNS = "home";

i18n.use(initReactI18next).init({
  resources,
  lng: "vi",
  ns: ["home, details"],
  fallbackLng: "vi",
  defaultNS,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
