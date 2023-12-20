import { ExamType, Semester } from './examArchive';
import { Subject } from './subject';

export type RegisteredUser = {
  userId: string;
  givenName: string;
  familyAndMiddleName: string;
  dateOfBirth: number;
  studentId: string;
  major: string;
  gender: string;
  phoneNumber: string;
};

export type Slots = {
  slotId: number;
  name: string;
  registeredUsers: RegisteredUser[];
  userLimit: number;
  questions: string[];
  startedAt: number;
  endedAt: number;
};

export type MockTest = {
  _id: string;
  name: string;
  subject: Subject;
  semester: Semester;
  type: ExamType;
  registrationStartedAt: number;
  registrationEndedAt: number;
  isHidden: boolean;
  description: string;
  slots: Slots[];
  createdBy: string;
  createdAt: number;
  lastUpdatedAt?: number;
};
