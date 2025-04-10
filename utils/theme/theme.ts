import { MD3LightTheme } from "react-native-paper";

export const themes = {
  black: {
    ...MD3LightTheme,
    colors: {
      ...MD3LightTheme.colors,
      primary: "#2B2B2B", // Gris oscuro
      background: "#E4E4E4", // Gris muy claro
      green: "#277927", // Verde
      red: "#b53b3b", // Rojo
      text: "#121212", // Negro
      secondary: "#A1A1A1", // Gris intermedio
      tertiary: "#777777", // Gris claro
    },
    roundness: 10,
  },
  green: {
    ...MD3LightTheme,
    colors: {
      ...MD3LightTheme.colors,
      primary: "#1F3D2B",
      background: "#E4E4E4",
      green: "#277927",
      red: "#b53b3b",
      text: "#121212",
      secondary: "#A1A1A1",
      tertiary: "#777777",
    },
    roundness: 10,
  },
  pink: {
    ...MD3LightTheme,
    colors: {
      ...MD3LightTheme.colors,
      primary: "#4A1C2B",
      background: "#E4E4E4",
      green: "#277927",
      red: "#b53b3b",
      text: "#121212",
      secondary: "#A1A1A1",
      tertiary: "#777777",
    },
    roundness: 10,
  },
  yellow: {
    ...MD3LightTheme,
    colors: {
      ...MD3LightTheme.colors,
      primary: "#3A341F",
      background: "#E4E4E4",
      green: "#277927",
      red: "#b53b3b",
      text: "#121212",
      secondary: "#A1A1A1",
      tertiary: "#777777",
    },
    roundness: 10,
  },
  blue: {
    ...MD3LightTheme,
    colors: {
      ...MD3LightTheme.colors,
      primary: "#1C2E4A",
      background: "#E4E4E4",
      green: "#277927",
      red: "#b53b3b",
      text: "#121212",
      secondary: "#A1A1A1",
      tertiary: "#777777",
    },
    roundness: 10,
  },
};

export type ThemeName = keyof typeof themes;
