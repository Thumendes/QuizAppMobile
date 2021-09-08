import { atom } from "recoil";

export const currentQuestionIndexState = atom<number>({
  key: "currentQuestionIndexState",
  default: 0,
});

export const isPlayingState = atom<boolean>({
  key: "isPlayingState",
  default: false,
});

export const answersState = atom<{ [key: string]: string }>({
  key: "answersState",
  default: {},
});

export const finishedState = atom<boolean>({
  key: "finishedState",
  default: false,
});
