import { MD3LightTheme } from "react-native-paper";

const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: "#2B2B2B", // Gris oscuro
    background: "#E4E4E4", // Gris claro
    green: "#277927", // Verde
    red: "#b53b3b", // Rojo
    text: "#121212", // Negro
    secondary: "#a1a1a1",
    tertiary: "#777777",
  },
  roundness: 10,
};

export default theme;
