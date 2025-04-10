import { MD3LightTheme } from "react-native-paper";

const theme = {
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
};

export default theme;
