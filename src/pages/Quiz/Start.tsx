import { Feather } from "@expo/vector-icons";
import { Button, Heading, Text } from "native-base";
import React from "react";
import { useSetRecoilState } from "recoil";
import { QuizResponse } from "../../@types/quiz";
import { currentQuestionIndexState, isPlayingState } from "./state";

type Props = {
  quiz: QuizResponse;
};

const Start: React.FC<Props> = ({ quiz }) => {
  const setCurrentQuestion = useSetRecoilState(currentQuestionIndexState);
  const setIsPlaying = useSetRecoilState(isPlayingState);

  function handleStart() {
    setCurrentQuestion(0);
    setIsPlaying(true);
  }

  return (
    <>
      <Heading mb={24} textAlign="center">
        {quiz.name}
      </Heading>

      <Text mb={24}>{quiz.description}</Text>

      <Button
        onPress={handleStart}
        endIcon={<Feather name="arrow-right" size={20} color="#fff" />}
      >
        Começar o Quiz
      </Button>
    </>
  );
};

export default Start;
