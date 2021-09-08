import React from "react";
import { Feather } from "@expo/vector-icons";
import { Button, IButtonProps } from "native-base";
import {
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from "recoil";
import { OptionsResponse, QuestionResponse } from "../../@types/quiz";
import {
  answersState,
  currentQuestionIndexState,
  finishedState,
  isPlayingState,
} from "./state";
import { Alert } from "react-native";

const ArrowButton: React.FC<
  { dir: "left" | "right"; text?: string } & IButtonProps
> = ({ dir, text, ...rest }) => {
  const buttonProps: IButtonProps = {
    position: "absolute",
    top: -24,
    py: 4,
    px: 8,
    [dir]: 8,
    ...rest,
  };

  return (
    <Button {...buttonProps}>
      {text || <Feather color="#fff" name={`arrow-${dir}`} size={24} />}
    </Button>
  );
};

const Steps: React.FC<{ questions: QuestionResponse[] }> = ({ questions }) => {
  const [currentIndex, setCurrentIndex] = useRecoilState(
    currentQuestionIndexState
  );
  const setIsPlaying = useSetRecoilState(isPlayingState);
  const resetAnswers = useResetRecoilState(answersState);
  const isPlaying = useRecoilValue(isPlayingState);
  const [finished, setFinished] = useRecoilState(finishedState);

  const isFirst = currentIndex === 0;
  const isLast = currentIndex === questions.length - 1;

  function handlePrevious() {
    if (finished) {
      setIsPlaying(false);
      setFinished(false);
      resetAnswers();
      setCurrentIndex(0);
      return;
    }

    if (!isFirst) return setCurrentIndex(currentIndex - 1);

    setIsPlaying(false);
    resetAnswers();
  }

  function handleNext() {
    if (!isLast) return setCurrentIndex(currentIndex + 1);

    setFinished(true);
  }

  if (!isPlaying) return <></>;

  return (
    <>
      <ArrowButton
        dir="left"
        onPress={handlePrevious}
        text={isFirst ? "Voltar" : undefined}
      />

      {!finished && (
        <ArrowButton
          dir="right"
          onPress={handleNext}
          text={isLast ? "Finalizar" : undefined}
        />
      )}
    </>
  );
};

export default Steps;
