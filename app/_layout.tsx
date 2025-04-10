import { Slot } from "expo-router";
import { PaperProvider } from "react-native-paper";
import { I18nextProvider } from "react-i18next";
import "../utils/localization/i18";
import i18n from "../utils/localization/i18";
import theme from "../utils/theme/theme";
import { AuthProvider } from "../providers/authProvider";
import { StatusBar } from "react-native";

export default function RootLayout() {
  return (
    <I18nextProvider i18n={i18n}>
      <PaperProvider theme={theme}>
        <AuthProvider>
          <Slot />
        </AuthProvider>
      </PaperProvider>
    </I18nextProvider>
  );
}
