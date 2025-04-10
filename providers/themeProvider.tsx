import React, { createContext, useContext, useEffect, useState } from "react";
import { themes, ThemeName } from "@/utils/theme/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Provider as PaperProvider } from "react-native-paper";

const THEME_KEY = "@selectedTheme";

interface ThemeContextType {
  themeName: ThemeName;
  setThemeName: (theme: ThemeName) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  themeName: "black",
  setThemeName: () => {},
});

export const useThemeContext = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [themeName, setThemeName] = useState<ThemeName>("black");

  useEffect(() => {
    const loadTheme = async () => {
      const storedTheme = await AsyncStorage.getItem(THEME_KEY);
      if (storedTheme && themes[storedTheme as ThemeName]) {
        setThemeName(storedTheme as ThemeName);
      }
    };
    loadTheme();
  }, []);

  const changeTheme = async (name: ThemeName) => {
    setThemeName(name);
    await AsyncStorage.setItem(THEME_KEY, name);
  };

  return (
    <ThemeContext.Provider value={{ themeName, setThemeName: changeTheme }}>
      <PaperProvider theme={themes[themeName]}>{children}</PaperProvider>
    </ThemeContext.Provider>
  );
};
