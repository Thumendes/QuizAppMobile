import { Text } from "native-base";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import useCustomTheme from "../../services/theme";

const Layout: React.FC = ({ children }) => {
  return <SafeAreaView>{children}</SafeAreaView>;
};

export default Layout;
