import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { RootRoutePages } from "../@types/routes";
import { User } from "../@types/user";
import api from "../services/api";
import Storage from "../services/storage";

const tokenKey = "@auth-token";
export type SignInFormType = {
  user: string;
  password: string;
};

export type UseAuthProps = {
  private?: boolean;
  navigation?: NativeStackNavigationProp<RootRoutePages, keyof RootRoutePages>;
};

function useAuth(props?: UseAuthProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isSigned, setIsSigned] = useState<boolean | null>(null);

  async function signIn(form: SignInFormType) {
    const { data } = await api.post("/users/sign-in", form);

    Alert.alert(data.msg);

    if (data.success) {
      await Storage.set(tokenKey, data.token);
      setIsSigned(true);
    }

    return data.success;
  }

  async function signOut() {
    if (!user) return;

    const { data } = await api.get(`/users/sign-out/${user.id}`);

    if (data.success) await Storage.remove(tokenKey);
  }

  async function getUser(jwt: string) {
    const token = jwt || (await Storage.get(tokenKey));

    const { data } = await api.post("/users/get-user-by-token", {
      token,
    });

    setUser(data);
  }

  async function getToken() {
    const token = await Storage.get(tokenKey);

    if (!token) {
      return props?.navigation?.navigate("SignIn");
    }

    getUser(token);
    setIsSigned(true);
    return true;
  }

  useEffect(() => {
    getToken().then((hasToken) => {
      if (!hasToken && props?.private && props.navigation) {
        props.navigation.navigate("Home");
      }
    });
  }, []);

  return { signIn, user, isSigned, signOut };
}

export default useAuth;
