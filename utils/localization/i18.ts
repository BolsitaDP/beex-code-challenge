import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { languages, availableLanguages } from "./index";

const LANG_KEY = "app-language";

export const initI18n = async () => {
  let savedLang = await AsyncStorage.getItem(LANG_KEY);

  if (!savedLang || !availableLanguages.includes(savedLang)) {
    const locales = Localization.getLocales();
    const deviceLang = locales[0]?.languageCode || "en";

    savedLang = availableLanguages.includes(deviceLang) ? deviceLang : "en";
    await AsyncStorage.setItem(LANG_KEY, savedLang);
  }

  await i18n.use(initReactI18next).init({
    compatibilityJSON: "v4",
    resources: languages,
    lng: savedLang,
    fallbackLng: "es",
    interpolation: {
      escapeValue: false,
    },
  });
};

export const changeLanguage = async (lang: string) => {
  if (!availableLanguages.includes(lang)) return;
  await AsyncStorage.setItem(LANG_KEY, lang);
  await i18n.changeLanguage(lang);
};

export default i18n;
