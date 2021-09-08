import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts, Inter_900Black } from "@expo-google-fonts/inter";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider } from "native-base";
import { AppearanceProvider, useColorScheme } from "react-native-appearance";
import { RootRoutePages } from "./src/@types/routes";
import { RecoilRoot } from "recoil";
import useAuth from "./src/hooks/useAuth";

// Telas
import HomePage from "./src/pages/Home";
import SignInPage from "./src/pages/SignIn";
import SignUpPage from "./src/pages/SignUp";
import useCustomTheme from "./src/services/theme";
import ConfirmSignUpPage from "./src/pages/Confirm";
import QuizPage from "./src/pages/Quiz";

const Stack = createNativeStackNavigator<RootRoutePages>();

function App() {
  useFonts({ Inter_900Black });
  const { isSigned } = useAuth();
  const scheme = useColorScheme();
  const { nativeBaseTheme, navigationTheme } = useCustomTheme({});

  return (
    <AppearanceProvider>
      <NativeBaseProvider theme={nativeBaseTheme}>
        <StatusBar />
        <RecoilRoot>
          <NavigationContainer theme={navigationTheme}>
            <Stack.Navigator
              screenOptions={{ headerShown: false }}
              initialRouteName={"Home"}
            >
              <Stack.Screen name="Quiz" component={QuizPage} />
              <Stack.Screen name="Home" component={HomePage} />
              <Stack.Screen name="SignIn" component={SignInPage} />
              <Stack.Screen name="SignUp" component={SignUpPage} />
              <Stack.Screen name="Confirm" component={ConfirmSignUpPage} />
            </Stack.Navigator>
          </NavigationContainer>
        </RecoilRoot>
      </NativeBaseProvider>
    </AppearanceProvider>
  );
}

export default App;
