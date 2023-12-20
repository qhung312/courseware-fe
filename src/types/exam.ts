import { ConcreteQuestion, ExamType, Question, Semester, Subject, User } from './';

export type Exam = {
  _id: string;
  name: string;
  description: string;

  subject: Subject;
  semester: Semester;
  type: ExamType;

  registrationStartedAt: number;
  registrationEndedAt: number;

  slots: {
    slotId: number;

    name: string;
    registeredUsers: User[];
    userLimit: number;
    questions: Question[];

    startedAt: number;
    endedAt: number;
  }[];

  createdBy: string;
  createdAt: number;
  lastUpdatedAt?: number;

  isHidden: boolean;
  deletedAt?: number;
};

export enum ExamSessionStatus {
  ONGOING = 'ONGOING',
  ENDED = 'ENDED',
}

export type ExamSession = {
  _id: string;
  userId: string;
  status: ExamSessionStatus;

  duration: number;
  timeLeft?: number;
  startedAt: number;
  endedAt?: number;

  standardizedScore?: number;
  fromExam: Exam;
  slotId: number;

  questions: ConcreteQuestion[];
};
