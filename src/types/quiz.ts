import { Chapter } from './chapter';
import { Question } from './question';
import { Subject } from './subject';
import { User } from './user';

export type QuizTemplate = {
  name: string;
  description: string;
  subject: Subject;
  chapter: Chapter;

  duration: number;
  potentialQuestions: string[];
  sampleSize: number;

  createdBy: User;
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
  userId: User;
  status: QuizStatus;
  createdAt: number;
  duration: number;
  startTime: number;
  endTime?: number;
  standardizedScore: number;

  fromTemplate: QuizTemplate;
  questions: Question[];
};
