import { Box, Heading, Text, VStack } from "native-base";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { OptionsResponse, QuizResponse } from "../../@types/quiz";
import { answersState } from "./state";

type FinishProps = {
  quiz: QuizResponse;
};

type FinalAnswersType = {
  title?: string;
  isCorrect?: boolean;
  option?: OptionsResponse;
  correctOption?: OptionsResponse;
}[];

const Finish: React.FC<FinishProps> = ({ quiz }) => {
  const [finalAnswers, setFinalAnswers] = useState<FinalAnswersType>([]);
  const [points, setPoints] = useState(0);
  const answers = useRecoilValue(answersState);

  useEffect(() => {
    if (!Object.keys(answers).length) return;
    let pointsAcc = 0;

    setFinalAnswers(
      Object.keys(answers).map((questionId) => {
        const question = quiz.questions.find(({ id }) => id === questionId);

        const option = question?.options.find(
          ({ id }) => id === answers[questionId]
        );

        const correctOption = question?.options.find(
          ({ isCorrect }) => isCorrect
        );

        if (option?.isCorrect) pointsAcc += 10;

        return {
          title: question?.title,
          isCorrect: option?.isCorrect,
          correctOption,
          option,
        };
      })
    );

    setPoints(pointsAcc);
  }, [answers]);

  return (
    <Box w="100%">
      <Heading mb={4}>Boaa</Heading>
      <Text fontSize={24} color="#888" mb={8}>
        Quiz {quiz.name} finalizado!
      </Text>

      <VStack>
        {finalAnswers.map((answer, index) => {
          return (
            <Box
              borderRadius={10}
              borderWidth={2}
              borderColor={answer.option?.isCorrect ? "primary.500" : "#8f0000"}
              mb={4}
              p={4}
              key={index}
            >
              <Text fontWeight="bold">{answer.option?.title}</Text>
              {}
            </Box>
          );
        })}
      </VStack>

      <Text fontSize={24} color="#888">
        Pontos:{" "}
        <Text color="#000" fontSize={24} fontWeight="bold">
          {points}
        </Text>
      </Text>
    </Box>
  );
};

export default Finish;
