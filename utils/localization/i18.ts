import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./langs/en.json";
import es from "./langs/es.json";

i18n.use(initReactI18next).init({
  compatibilityJSON: "v4",
  resources: {
    en: { translation: en },
    es: { translation: es },
  },
  lng: "es",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
