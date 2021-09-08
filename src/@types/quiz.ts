export type OptionsResponse = {
  id: string;
  title: string;
  isCorrect: boolean;
  questionId: string;
  createdAt: string;
  updatedAt: string;
};

export type QuestionResponse = {
  id: string;
  title: string;
  quizId: string;
  createdAt: string;
  updatedAt: string;
  options: OptionsResponse[];
};

export type QuizResponse = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  questions: QuestionResponse[];
};
