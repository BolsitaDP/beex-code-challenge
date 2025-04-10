import { Slot } from "expo-router";
import { AuthProvider } from "../providers/authProvider";
import { ThemeProvider } from "@/providers/themeProvider";
import { I18nProvider } from "@/providers/i18nProvider";

export default function RootLayout() {
  return (
    <I18nProvider>
      <ThemeProvider>
        <AuthProvider>
          <Slot />
        </AuthProvider>
      </ThemeProvider>
    </I18nProvider>
  );
}
