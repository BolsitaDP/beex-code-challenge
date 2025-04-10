import { ReactNode, useEffect, useState } from "react";
import { I18nextProvider } from "react-i18next";
import i18n, { initI18n } from "@/utils/localization/i18";
import { ActivityIndicator, View } from "react-native";

interface Props {
  children: ReactNode;
}

export const I18nProvider = ({ children }: Props) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const initialize = async () => {
      await initI18n();
      setIsReady(true);
    };
    initialize();
  }, []);

  if (!isReady) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#E4E4E4",
        }}>
        <ActivityIndicator size="large" color={"#2B2B2B"} />
      </View>
    );
  }

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};
