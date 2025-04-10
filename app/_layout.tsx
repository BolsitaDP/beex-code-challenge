import { Slot } from "expo-router";
import { I18nextProvider } from "react-i18next";
import "../utils/localization/i18";
import i18n from "../utils/localization/i18";
import { AuthProvider } from "../providers/authProvider";
import { ThemeProvider } from "@/providers/themeProvider";

export default function RootLayout() {
  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider>
        <AuthProvider>
          <Slot />
        </AuthProvider>
      </ThemeProvider>
    </I18nextProvider>
  );
}
