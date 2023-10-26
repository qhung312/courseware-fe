import { Chapter } from './chapter';
import { ConcreteQuestion, QuestionTemplate } from './question';
import { Subject } from './subject';

export type QuizTemplate = {
  _id: string;
  name: string;
  description: string;
  subject: Subject;
  chapter: Chapter;

  duration: number;
  potentialQuestions?: QuestionTemplate[];
  sampleSize: number;

  createdBy: string;
  createdAt: number;
  lastUpdatedAt?: number;
  deletedAt?: number;
};

export enum QuizStatus {
  ONGOING = 'ONGOING',
  ENDED = 'ENDED',
}

export type Quiz = {
  _id: string;
  userId: string;
  status: QuizStatus;
  createdAt: number;
  duration: number;
  startTime: number;
  endTime?: number;
  standardizedScore?: number;

  fromTemplate: QuizTemplate;
  questions: ConcreteQuestion[];
};
