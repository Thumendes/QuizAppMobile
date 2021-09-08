import React, { useState } from "react";
import { Box, FormControl, Input, Button } from "native-base";
import { Link } from "@react-navigation/native";
import SignInLayout from "../../components/Layout/Sign";
import api from "../../services/api";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootRoutePages } from "../../@types/routes";
import { Alert } from "react-native";

type Props = React.FC<NativeStackScreenProps<RootRoutePages, "SignUp">>;

const SignUpPage: Props = ({ navigation }) => {
  const [form, setForm] = useState({
    email: "",
    name: "",
    password: "",
    username: "",
  });

  async function handleSubmit() {
    const { data } = await api.post("/users/sign-up", form);

    Alert.alert(data.msg);

    navigation.navigate("Confirm", { userId: data.userId });
  }

  const handleChange = (name: keyof typeof form) => (text: string) =>
    setForm({ ...form, [name]: text });

  return (
    <SignInLayout
      title="Ansioso pro Quiz?"
      sub="Insira suas informações abaixo para prosseguir com o cadastro!"
      onSubmit={handleSubmit}
    >
      <FormControl my={4}>
        <FormControl.Label>Email</FormControl.Label>
        <Input
          autoCompleteType="email"
          onChangeText={handleChange("email")}
          value={form.email}
        />
      </FormControl>

      <FormControl my={4}>
        <FormControl.Label>Nome</FormControl.Label>
        <Input
          autoCompleteType="name"
          onChangeText={handleChange("name")}
          value={form.name}
        />
      </FormControl>

      <FormControl my={4}>
        <FormControl.Label>Username</FormControl.Label>
        <Input
          autoCompleteType="username"
          onChangeText={handleChange("username")}
          value={form.username}
        />
      </FormControl>

      <FormControl my={4}>
        <FormControl.Label>Senha</FormControl.Label>
        <Input
          autoCompleteType="password"
          type="password"
          onChangeText={handleChange("password")}
          value={form.password}
        />
      </FormControl>

      <Box my={6} alignItems="center">
        <Link to={{ screen: "SignIn" }}>Já tem conta?</Link>
      </Box>
    </SignInLayout>
  );
};

export default SignUpPage;
