import { Box, Heading, Pressable, Text, VStack } from "native-base";
import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { OptionsResponse, QuestionResponse } from "../../@types/quiz";
import { answersState, currentQuestionIndexState } from "./state";

type Props = {
  question: QuestionResponse;
};

const Question: React.FC<Props> = ({ question }) => {
  const index = useRecoilValue(currentQuestionIndexState);
  const answers = useRecoilValue(answersState);
  const setAnswers = useSetRecoilState(answersState);

  function handleChoose(option: OptionsResponse) {
    setAnswers({ ...answers, [question.id]: option.id });
  }

  return (
    <Box w="100%">
      <Text fontSize={24} mb={4} color="#888">{index + 1}º</Text>
      <Heading mb={8}>{question.title}</Heading>

      <VStack>
        {question.options.map((option) => {
          const isSelected = answers[question.id] === option.id;

          return (
            <Pressable
              onPress={() => handleChoose(option)}
              borderRadius={10}
              borderWidth={2}
              borderColor={isSelected ? "primary.500" : "#818283"}
              mb={4}
              p={4}
              key={option.id}
            >
              <Text fontWeight={isSelected ? "bold" : "normal"}>
                {option.title}
              </Text>
            </Pressable>
          );
        })}
      </VStack>
    </Box>
  );
};

export default Question;
