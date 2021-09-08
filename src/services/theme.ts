import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import { extendTheme } from "native-base";
import { ColorSchemeName } from "react-native-appearance";

export type UseCustomThemeProps = {
  scheme?: ColorSchemeName;
};

const useCustomTheme = ({ scheme = "no-preference" }: UseCustomThemeProps) => {
  const nativeBaseTheme = extendTheme({
    colors: {
      primary: {
        50: "#e5f9e3",
        100: "#c5f3cb",
        200: "#aeeca2",
        300: "#7ae47a",
        400: "#58da47",
        500: "#22cc00",
        600: "#06b800",
        700: "#0da100",
        800: "#048500",
        900: "#005e00",
      },
    },
    config: {
      initialColorMode: scheme,
    },
  });

  const NavigationTheme = scheme === "dark" ? DarkTheme : DefaultTheme;

  console.log(scheme);

  const navigationTheme = {
    ...NavigationTheme,
    colors: {
      ...NavigationTheme.colors,
      background: scheme === "dark" ? "#222" : "#fff",
    },
  };

  return { nativeBaseTheme, navigationTheme };
};

export default useCustomTheme;
