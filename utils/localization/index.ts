import en from "./langs/en.json";
import es from "./langs/es.json";

export const languages = {
  en: { translation: en },
  es: { translation: es },
};

export const availableLanguages = Object.keys(languages);
