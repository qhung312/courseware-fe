import { Subject } from './subject';

export enum Semester {
  SEMESTER_181 = 'SEMESTER_181',
  SEMESTER_182 = 'SEMESTER_182',
  SEMESTER_183 = 'SEMESTER_183',

  SEMESTER_191 = 'SEMESTER_191',
  SEMESTER_192 = 'SEMESTER_192',
  SEMESTER_193 = 'SEMESTER_193',

  SEMESTER_201 = 'SEMESTER_201',
  SEMESTER_202 = 'SEMESTER_202',
  SEMESTER_203 = 'SEMESTER_203',

  SEMESTER_211 = 'SEMESTER_211',
  SEMESTER_212 = 'SEMESTER_212',
  SEMESTER_213 = 'SEMESTER_213',

  SEMESTER_221 = 'SEMESTER_221',
  SEMESTER_222 = 'SEMESTER_222',
  SEMESTER_223 = 'SEMESTER_223',

  SEMESTER_231 = 'SEMESTER_231',
  SEMESTER_232 = 'SEMESTER_232',
  SEMESTER_233 = 'SEMESTER_233',
}

export enum ExamType {
  MIDTERM_EXAM = 'MIDTERM_EXAM',
  FINAL_EXAM = 'FINAL_EXAM',
}

export type ExamArchive = {
  _id: string;
  name: string;
  subject: Subject;
  semester: Semester;
  type: ExamType;
  description: string;
  resource: string;
  createdBy: string;
  lastUpdatedAt?: number;
  deletedAt?: number;
};
