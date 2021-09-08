import { QuizResponse } from "./quiz";

export type RootRoutePages = {
  Home: undefined;
  SignIn: undefined;
  SignUp: undefined;
  Confirm: { userId: string };
  Quiz: { quiz: QuizResponse };
};
