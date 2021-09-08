import React, { useEffect, useState } from "react";
import { FormControl, Input, Button } from "native-base";
import SignInLayout from "../../components/Layout/Sign";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootRoutePages } from "../../@types/routes";
import { Alert } from "react-native";
import api from "../../services/api";

type Props = React.FC<NativeStackScreenProps<RootRoutePages, "Confirm">>;

const ConfirmSignUpPage: Props = ({ route, navigation }) => {
  const { userId } = route.params;
  const [codeValue, setCodeValue] = useState("");

  async function handleSubmit() {
    if (!codeValue) return Alert.alert("Preencha o campo corretamente!");

    const { data } = await api.get(
      `/users/confirm/${codeValue}?userId=${userId}`
    );

    Alert.alert(data.msg);

    return navigation.navigate("SignIn");
  }

  useEffect(() => {
    if (!userId) return navigation.goBack();
  }, []);

  return (
    <SignInLayout title="Quiz Project" sub="Confirmar registro">
      <FormControl my={4}>
        <FormControl.Label>Código de cadastro</FormControl.Label>
        <Input onChangeText={setCodeValue} />
        <FormControl.HelperText>
          Acesse seu email para recuperar o código enviado!
        </FormControl.HelperText>
      </FormControl>

      <Button onPress={handleSubmit}>Confirmar</Button>
    </SignInLayout>
  );
};

export default ConfirmSignUpPage;
