import React, { useState } from "react";
import {
  Box,
  KeyboardAvoidingView,
  FormControl,
  Input,
  Button,
} from "native-base";
import { Link } from "@react-navigation/native";
import SignInLayout from "../../components/Layout/Sign";
import useAuth, { SignInFormType } from "../../hooks/useAuth";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootRoutePages } from "../../@types/routes";

type Props = React.FC<NativeStackScreenProps<RootRoutePages, "SignIn">>;

const SignInPage: Props = ({ navigation }) => {
  const { signIn } = useAuth();
  const [form, setForm] = useState<SignInFormType>({
    user: "",
    password: "",
  });

  const handleChange = (name: keyof SignInFormType) => (value: string) =>
    setForm({ ...form, [name]: value });

  async function handleSubmit() {
    const valid = await signIn(form);

    valid && navigation.navigate("Home");
  }

  return (
    <SignInLayout title="Bem-vindo ao Quiz App" onSubmit={handleSubmit}>
      <KeyboardAvoidingView>
        <FormControl my={4}>
          <FormControl.Label>Usuário</FormControl.Label>
          <Input
            placeholder="Email ou Username"
            onChangeText={handleChange("user")}
          />
        </FormControl>

        <FormControl my={4}>
          <FormControl.Label>Senha</FormControl.Label>
          <Input
            placeholder="Senha"
            type="password"
            onChangeText={handleChange("password")}
          />
        </FormControl>
      </KeyboardAvoidingView>

      <Box my={6} alignItems="center">
        <Link to={{ screen: "SignUp" }}>Não tem conta ainda?</Link>
      </Box>
    </SignInLayout>
  );
};

export default SignInPage;
