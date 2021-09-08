import { Feather } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Box, Button, Heading, Text } from "native-base";
import React from "react";
import { useRecoilValue } from "recoil";
import { RootRoutePages } from "../../@types/routes";
import Layout from "../../components/Layout";
import useDimensions from "../../hooks/useDimensions";
import Finish from "./Finish";
import Question from "./Question";
import Start from "./Start";
import {
  currentQuestionIndexState,
  finishedState,
  isPlayingState,
} from "./state";
import Steps from "./Steps";

type Props = React.FC<NativeStackScreenProps<RootRoutePages, "Quiz">>;

const QuizPage: Props = ({ route }) => {
  const [height, width] = useDimensions();
  const { quiz } = route.params;
  const isPlaying = useRecoilValue(isPlayingState);
  const finished = useRecoilValue(finishedState);
  const currentQuestion = useRecoilValue(currentQuestionIndexState);

  return (
    <Box
      alignItems="center"
      flexDir="column"
      justifyContent="space-between"
      h="100%"
    >
      <Box
        w={width * 0.8}
        h={height * 0.9}
        justifyContent="center"
        alignItems="center"
      >
        {!isPlaying ? (
          <Start quiz={quiz} />
        ) : finished ? (
          <Finish quiz={quiz} />
        ) : (
          <Question question={quiz.questions[currentQuestion]} />
        )}
      </Box>

      <Box bg="#dddddd" h={height * 0.1} w="100%">
        <Steps questions={quiz.questions} />
      </Box>
    </Box>
  );
};

export default QuizPage;
