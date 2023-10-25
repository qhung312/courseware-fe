import { Option } from '../components/Select';

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

export const SEMESTER_OPTIONS: Option[] = [
  { value: Semester.SEMESTER_181, label: 'Học kì 181' },
  { value: Semester.SEMESTER_182, label: 'Học kì 182' },
  { value: Semester.SEMESTER_183, label: 'Học kì 183' },

  { value: Semester.SEMESTER_191, label: 'Học kì 191' },
  { value: Semester.SEMESTER_192, label: 'Học kì 192' },
  { value: Semester.SEMESTER_193, label: 'Học kì 193' },

  { value: Semester.SEMESTER_201, label: 'Học kì 201' },
  { value: Semester.SEMESTER_202, label: 'Học kì 202' },
  { value: Semester.SEMESTER_203, label: 'Học kì 203' },

  { value: Semester.SEMESTER_211, label: 'Học kì 211' },
  { value: Semester.SEMESTER_212, label: 'Học kì 212' },
  { value: Semester.SEMESTER_213, label: 'Học kì 213' },

  { value: Semester.SEMESTER_221, label: 'Học kì 221' },
  { value: Semester.SEMESTER_222, label: 'Học kì 222' },
  { value: Semester.SEMESTER_223, label: 'Học kì 223' },

  { value: Semester.SEMESTER_231, label: 'Học kì 231' },
  { value: Semester.SEMESTER_232, label: 'Học kì 232' },
  { value: Semester.SEMESTER_233, label: 'Học kì 233' },
];

export const EXAM_TYPE_OPTIONS: Option[] = [
  { value: ExamType.MIDTERM_EXAM, label: 'Giữa kì' },
  { value: ExamType.FINAL_EXAM, label: 'Cuối kì' },
];

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
