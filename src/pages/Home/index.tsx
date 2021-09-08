import { Feather } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  Box,
  Button,
  Center,
  FlatList,
  Flex,
  Heading,
  Icon,
  IconButton,
  ScrollView,
  Text,
  VStack,
} from "native-base";
import React, { useEffect, useState } from "react";
import { QuizResponse } from "../../@types/quiz";
import { RootRoutePages } from "../../@types/routes";
import Layout from "../../components/Layout";
import useAuth from "../../hooks/useAuth";
import api from "../../services/api";

type Props = React.FC<NativeStackScreenProps<RootRoutePages, "Home">>;

const HomePage: Props = ({ navigation }) => {
  const { signOut } = useAuth({ private: true, navigation });
  const [quizes, setQuizes] = useState<QuizResponse[]>([]);

  async function handleSignOut() {
    await signOut();
    await navigation.navigate("SignIn");
  }

  async function getQuizes() {
    const { data } = await api.get<QuizResponse[]>("/quizes");

    setQuizes(data);
  }

  function goToQuiz(quiz: QuizResponse) {
    return navigation.navigate("Quiz", { quiz });
  }

  useEffect(() => {
    getQuizes();
  }, []);

  return (
    <Layout>
      <Flex
        p={8}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Heading>Quizes</Heading>
        <IconButton
          onPress={handleSignOut}
          icon={<Icon color="primary.500" as={<Feather name="log-out" />} />}
        />
      </Flex>

      <Box alignItems="center">
        <Box w="90%">
          <ScrollView>
            <VStack>
              {quizes.map((quiz) => (
                <Box
                  key={quiz.id}
                  borderRadius={10}
                  borderWidth={1}
                  borderColor="#000"
                  mb={4}
                  p={4}
                >
                  <Flex direction="row" justifyContent="space-between">
                    <Box w="80%">
                      <Text fontWeight="bold" fontSize={24} mb={4}>
                        {quiz.name}
                      </Text>
                      <Text>{quiz.description}</Text>
                    </Box>

                    <Box justifyContent="flex-end">
                      <Button p={2} onPress={() => goToQuiz(quiz)}>
                        <Feather name="arrow-right" color="#fff" size={20} />
                      </Button>
                    </Box>
                  </Flex>
                </Box>
              ))}
            </VStack>
          </ScrollView>
        </Box>
      </Box>
    </Layout>
  );
};

export default HomePage;
