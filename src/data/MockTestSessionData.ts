import { Exam, ExamType, Semester, Subject, User } from '../types';

export const examData: Exam[] = [
  {
    _id: '1',
    name: 'Ca thi 1',
    description: '',

    subject: {} as Subject,
    semester: Semester.SEMESTER_231,
    type: ExamType.MIDTERM_EXAM,

    registrationStartedAt: Date.now() - 7 * 24 * 60 * 60 * 1000,
    registrationEndedAt: Date.now() + 60 * 60 * 1000,

    slots: [
      {
        slotId: 1,
        name: 'Ca thi 1',
        registeredUsers: [],

        userLimit: 50,
        questions: [],

        startedAt: Date.now() + 24 * 60 * 60 * 1000,
        endedAt: Date.now() + 24 * 60 * 60 * 1000 + 15 * 60 * 1000,
      },
      {
        slotId: 2,
        name: 'Ca thi 2',
        registeredUsers: [
          {
            _id: '1',
            email: 'khoi27012003@gmail.com',
          } as unknown as User,
        ],

        userLimit: 50,
        questions: [],

        startedAt: Date.now() + 24 * 60 * 60 * 1000,
        endedAt: Date.now() + 25 * 60 * 60 * 1000,
      },
      {
        slotId: 3,
        name: 'Ca thi 3',
        registeredUsers: [
          {
            _id: '1',
            email: 'khoi27012003@gmail.com',
          } as unknown as User,
        ],

        userLimit: 50,
        questions: [],

        startedAt: Date.now(),
        endedAt: Date.now() + 2 * 60 * 60 * 1000,
      },
      {
        slotId: 4,
        name: 'Ca thi 4',
        registeredUsers: [],

        userLimit: 50,
        questions: [],

        startedAt: Date.now(),
        endedAt: Date.now() + 1 * 60 * 1000,
      },
      {
        slotId: 5,
        name: 'Ca thi 5',
        registeredUsers: [
          {
            _id: '1',
            email: 'khoi27012003@gmail.com',
          } as unknown as User,
        ],

        userLimit: 50,
        questions: [],

        startedAt: Date.now() - 25 * 60 * 60 * 1000,
        endedAt: Date.now() - 24 * 60 * 60 * 1000,
      },
    ],

    createdBy: '',
    createdAt: Date.now(),
    isHidden: false,
  },
  {
    _id: '2',
    name: 'Ca thi 2',
    description: '',

    subject: {} as Subject,
    semester: Semester.SEMESTER_231,
    type: ExamType.MIDTERM_EXAM,

    registrationStartedAt: Date.now() - 7 * 24 * 60 * 60 * 1000,
    registrationEndedAt: Date.now() + 60 * 60 * 1000,

    slots: [
      {
        slotId: 2,
        name: '',
        registeredUsers: [
          {
            _id: '1',
            email: 'khoi27012003@gmail.com',
          } as unknown as User,
        ],

        userLimit: 50,
        questions: [],

        startedAt: Date.now() + 24 * 60 * 60 * 1000,
        endedAt: Date.now() + 24 * 60 * 60 * 1000 + 15 * 60 * 1000,
      },
    ],

    createdBy: '',
    createdAt: Date.now(),
    isHidden: false,
  },
  {
    _id: '3',
    name: 'Ca thi 3',
    description: '',

    subject: {} as Subject,
    semester: Semester.SEMESTER_231,
    type: ExamType.MIDTERM_EXAM,

    registrationStartedAt: Date.now() - 10 * 24 * 60 * 60 * 1000,
    registrationEndedAt: Date.now() - 3 * 24 * 60 * 60 * 1000,

    slots: [
      {
        slotId: 2,
        name: '',
        registeredUsers: [
          {
            _id: '1',
            email: 'khoi27012003@gmail.com',
          } as unknown as User,
        ],

        userLimit: 50,
        questions: [],

        startedAt: Date.now(),
        endedAt: Date.now() + 30 * 60 * 1000,
      },
    ],

    createdBy: '',
    createdAt: Date.now(),
    isHidden: false,
  },
  {
    _id: '4',
    name: 'Ca thi 4',
    description: '',

    subject: {} as Subject,
    semester: Semester.SEMESTER_231,
    type: ExamType.MIDTERM_EXAM,

    registrationStartedAt: Date.now() - 10 * 24 * 60 * 60 * 1000,
    registrationEndedAt: Date.now() - 3 * 24 * 60 * 60 * 1000,

    slots: [
      {
        slotId: 2,
        name: '',
        registeredUsers: [],

        userLimit: 50,
        questions: [],

        startedAt: Date.now() + 24 * 60 * 60 * 1000,
        endedAt: Date.now() + 25 * 60 * 60 * 1000,
      },
    ],

    createdBy: '',
    createdAt: Date.now(),
    isHidden: false,
  },
  {
    _id: '5',
    name: 'Ca thi 5',
    description: '',

    subject: {} as Subject,
    semester: Semester.SEMESTER_231,
    type: ExamType.MIDTERM_EXAM,

    registrationStartedAt: Date.now() - 10 * 24 * 60 * 60 * 1000,
    registrationEndedAt: Date.now() - 3 * 24 * 60 * 60 * 1000,

    slots: [
      {
        slotId: 2,
        name: '',
        registeredUsers: [],

        userLimit: 50,
        questions: [],

        startedAt: Date.now() - 25 * 60 * 60 * 1000,
        endedAt: Date.now() - 24 * 60 * 60 * 1000,
      },
    ],

    createdBy: '',
    createdAt: Date.now(),
    isHidden: false,
  },
];
