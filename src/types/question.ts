import { Chapter } from './chapter';
import { Subject } from './subject';

export enum QuestionType {
  MULTIPLE_CHOICE_SINGLE_ANSWER = 'MULTIPLE_CHOICE_SINGLE_ANSWER',
  MULTIPLE_CHOICE_MULTIPLE_ANSWERS = 'MULTIPLE_CHOICE_MULTIPLE_ANSWERS',
  TEXT = 'TEXT',
  NUMBER = 'NUMBER',
}

export type ConcreteQuestion = {
  _id: string;
  description?: string;
  subQuestions: {
    _id: string;
    type: QuestionType;
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
    isCorrect?: boolean;
  }[];
};

export type QuestionTemplate = {
  _id: string;
  name: string;
  /**
   * Description of the question, written in Markdown
   * This is used as a unified description for all subquestions, since
   * a question may have multiple subquestions
   */
  description?: string;

  code: string;
  subject: Subject;
  chapter: Chapter;

  subQuestions: {
    _id: string;
    type: { type: String; enum: QuestionType; required: true };
    questionType: QuestionType;
    description: string;
    /**
     * Options to choose from (multiple choice questions)
     * and the key for the correct answer
     */
    options?: {
      key: number;
      description: string;
    }[];
    shuffleOptions: boolean;
    answerKey?: number;
    answerKeys?: number[];

    /**
     * Store the correct answer on text or number field questions
     */
    answerField?: string;
    matchCase?: boolean; // require matching case on text questions
    maximumError?: number; // maximum error allowed on numeric questions

    explanation: string;
  }[];

  createdAt: number;
  createdBy: string;
  lastUpdatedAt?: number;
  deletedAt?: number;
};
