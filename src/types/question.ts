export enum QuestionType {
  MULTIPLE_CHOICE_SINGLE_ANSWER = 'MULTIPLE_CHOICE_SINGLE_ANSWER',
  MULTIPLE_CHOICE_MULTIPLE_ANSWERS = 'MULTIPLE_CHOICE_MULTIPLE_ANSWERS',
  TEXT = 'TEXT',
  NUMBER = 'NUMBER',
}

export type Question = {
  _id: string;
  questionType: QuestionType;
  description: string;
  options?: {
    key: number;
    description: string;
  }[];
  answerKey?: number;
  answerKeys?: number[];
  answerField?: string | number;
  matchCase?: boolean;
  maximumError?: number;
  explanation: string;

  // fields for logging user answer
  userAnswerKey?: number;
  userAnswerKeys?: number[];
  userAnswerField?: string | number;
  isCorrect: boolean;
};

export type ConcreteQuestion = {
  _id: string;
  description?: string;
  questions: Question[];
};
