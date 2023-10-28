import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { Icon } from '../../../components';
// import { useDebounce } from '../../../hooks';
import { Page, Wrapper } from '../../../layout';
// import ChapterService from '../../../service/chapter.service';
// import QuestionTemplateService from '../../../service/questionTemplate.service';
// import SubjectService from '../../../service/subject.service';
import { Question, QuestionType } from '../../../types';

interface ExerciseProps {
  name: string;
  subject: string;
  chapter: string;
  duration: {
    hours: number;
    minutes: number;
    seconds: number;
  };
  sampleSize: string;
  description: string;
  question: {
    filterSubject: string;
    filterChapter: string;
  };
}

const SUBJECTS = [
  {
    value: '123',
    label: 'Giải tích 1',
  },
  {
    value: '1234',
    label: 'Giải tích 2',
  },
  {
    value: '789',
    label: 'Giải tích 3',
  },
];

const CHAPTERS = [
  {
    value: '111',
    label: 'Đạo hàm hàm số',
  },
  {
    value: '112',
    label: 'Tích phân',
  },
  {
    value: '113',
    label: 'abc',
  },
];

const demoExercise: ExerciseProps = {
  name: 'Bài tập 1',
  subject: '123',
  chapter: '111',
  duration: {
    hours: 0,
    minutes: 30,
    seconds: 0,
  },
  sampleSize: '10',
  description: 'Bài tập 1',
  question: {
    filterSubject: '123',
    filterChapter: '111',
  },
};

const demoQuestion: Question[] = [
  {
    _id: '1',
    name: 'Câu hỏi 1',
    description: 'Câu hỏi 1',
    code: '1 + 1 = ?',
    subject: {
      _id: '123',
      name: 'Giải tích 1',
      description: 'Giải tích 1',
      createdBy: 'Demo',
      createdAt: 0,
      lastUpdatedAt: 0,
      deletedAt: 0,
    },
    chapter: {
      _id: '111',
      name: 'Đạo hàm hàm số',
      subject: {
        _id: '123',
        name: 'Giải tích 1',
        description: 'Giải tích 1',
        createdBy: 'Demo',
        createdAt: 0,
        lastUpdatedAt: 0,
        deletedAt: 0,
      },
      description: 'Đạo hàm hàm số',

      createdBy: 'Demo',
      createdAt: 0,
      lastUpdatedAt: 0,
      deletedAt: 0,
    },
    explanation: '',
    type: QuestionType.MULTIPLE_CHOICE_SINGLE_ANSWER,
    createdAt: 0,
    createdBy: 'Demo',
    lastUpdatedAt: 0,
    deletedAt: 0,
  },
  {
    _id: '2',
    name: 'Câu hỏi 2',
    description: 'Câu hỏi 2',
    code: '1 + 2 = ?',
    explanation: '',
    type: QuestionType.MULTIPLE_CHOICE_SINGLE_ANSWER,
    subject: {
      _id: '1234',
      name: 'Giải tích 2',
      description: 'Giải tích 2',
      createdBy: 'Demo',
      createdAt: 0,
      lastUpdatedAt: 0,
      deletedAt: 0,
    },
    chapter: {
      _id: '112',
      name: 'Tích phân',
      subject: {
        _id: '1234',
        name: 'Giải tích 2',
        description: 'Giải tích 2',
        createdBy: 'Demo',
        createdAt: 0,
        lastUpdatedAt: 0,
        deletedAt: 0,
      },
      description: 'Tích phân',

      createdBy: 'Demo',
      createdAt: 0,
      lastUpdatedAt: 0,
      deletedAt: 0,
    },
    createdAt: 0,
    createdBy: 'Demo',
    lastUpdatedAt: 0,
    deletedAt: 0,
  },
];

const ViewExercisePage = () => {
  const [exercise] = useState<ExerciseProps>(demoExercise);
  const [potentialQuestions] = useState<Question[]>(demoQuestion);

  return (
    <Page>
      <Wrapper className='flex flex-1 flex-col'>
        <div className='w-full bg-[#4285F4]/90 py-4'>
          <p className='text-center text-sm font-bold text-white md:text-2xl 3xl:text-4xl'>
            Xem bài tập rèn luyện
          </p>
        </div>
        <div className='w-full p-4'>
          <div className='h-full w-full rounded-lg bg-white p-4 lg:p-6 3xl:p-8'>
            <main className='flex flex-col gap-y-4'>
              <Link
                to='/admin/exercises/manage'
                className='text-semibold mb-3 flex h-fit w-fit gap-x-2 rounded-xl bg-[#4285f4]/[.6] px-2 py-1 text-white hover:bg-[#4285f4]/[.8] lg:text-[18px] 3xl:text-2xl'
              >
                <Icon.ChevronLeft fill='white' className='w-2 3xl:w-3' />
                Quay lại
              </Link>
              <div className='flex flex-col gap-y-1'>
                <label
                  className='flex flex-[2.5] text-base lg:text-lg 3xl:text-xl'
                  htmlFor='question_name'
                >
                  Tên
                </label>
                <input
                  id='question_name'
                  className='flex w-full flex-1 rounded-lg border border-[#D9D9D9] p-1 text-xs font-medium lg:p-3 lg:text-sm 3xl:p-5 3xl:text-base'
                  value={exercise.name}
                  placeholder={exercise.name}
                  disabled
                />
              </div>
              <div className='flex flex-row gap-x-8'>
                <div className='flex w-full flex-col gap-y-1'>
                  <p className='flex flex-[2.5] text-base lg:text-lg 3xl:text-xl'>Môn</p>
                  <div className='flex w-full flex-1 items-center rounded-lg border border-[#CCC] bg-[#efefef4d]  p-1 text-xs font-medium text-[#252641] lg:p-3 lg:text-sm 3xl:p-5 3xl:text-base'>
                    {SUBJECTS.find((x) => x.value === exercise.subject)
                      ? SUBJECTS.find((x) => x.value === exercise.subject)?.label
                      : 'Không có môn học'}
                  </div>
                </div>
                <div className='flex w-full flex-col gap-y-1'>
                  <p className='flex flex-[2.5] text-base lg:text-lg 3xl:text-xl'>Chương</p>
                  <div className='flex w-full flex-1 items-center rounded-lg border border-[#CCC] bg-[#efefef4d]  p-1 text-xs font-medium text-[#252641] lg:p-3 lg:text-sm 3xl:p-5 3xl:text-base'>
                    {CHAPTERS.find((x) => x.value === exercise.chapter)
                      ? CHAPTERS.find((x) => x.value === exercise.chapter)?.label
                      : 'Không có môn học'}
                  </div>
                </div>
                <div className='flex flex-col'>
                  <p className='flex flex-[2.5] text-base lg:text-lg 3xl:text-xl'>
                    Thời gian làm bài (hh:mm:ss)
                  </p>
                  <input
                    className='flex flex-1 rounded-lg border border-[#D9D9D9] p-1 text-center text-xs font-medium lg:p-3 lg:text-sm 3xl:p-5 3xl:text-base'
                    value={
                      String(exercise.duration.hours).padStart(2, '0') +
                      ':' +
                      String(exercise.duration.minutes).padStart(2, '0') +
                      ':' +
                      String(exercise.duration.seconds).padStart(2, '0')
                    }
                    placeholder={
                      String(exercise.duration.hours).padStart(2, '0') +
                      ':' +
                      String(exercise.duration.minutes).padStart(2, '0') +
                      ':' +
                      String(exercise.duration.seconds).padStart(2, '0')
                    }
                    disabled
                  />
                </div>
                <div className='flex flex-col'>
                  <p className='flex flex-[2.5] text-base lg:text-lg 3xl:text-xl'>Số câu hỏi</p>
                  <input
                    className='flex w-24 flex-1 rounded-lg border border-[#D9D9D9] p-1 text-center text-xs font-medium lg:p-3 lg:text-sm 3xl:p-5 3xl:text-base'
                    value={exercise.sampleSize}
                    placeholder={exercise.sampleSize}
                    disabled
                  />
                </div>
              </div>
              <div className='flex flex-col gap-y-1'>
                <label
                  className='flex flex-[2.5] text-base lg:text-lg 3xl:text-xl'
                  htmlFor='description'
                >
                  Chú thích
                </label>
                <textarea
                  id='description'
                  rows={10}
                  className='flex w-full flex-1 rounded-lg border border-[#D9D9D9] p-1 text-xs font-medium lg:p-3 lg:text-sm 3xl:p-5 3xl:text-base'
                  value={exercise.description}
                  placeholder={exercise.description}
                  disabled
                />
              </div>
              <div className='flex flex-col gap-y-8'>
                <div className='flex flex-row items-center gap-x-8'>
                  <label
                    className='flex text-base lg:text-lg 3xl:text-xl'
                    htmlFor='search_question'
                  >
                    Các câu hỏi có thể ra
                  </label>
                </div>
                <div>
                  <div className='mb-5 flex flex-1 flex-shrink-0 flex-row gap-x-4 px-6 lg:px-8 3xl:px-10'>
                    <p className='flex flex-[2.5] text-base font-semibold text-[#4285f4] lg:text-lg 3xl:text-xl'>
                      Tên
                    </p>
                    <p className='flex flex-[2] text-base font-semibold text-[#4285F4] lg:text-lg 3xl:text-xl'>
                      Môn
                    </p>
                    <p className='flex flex-[1.2] text-base font-semibold text-[#4285F4] lg:text-lg 3xl:text-xl'>
                      Chương
                    </p>
                    <p className='flex flex-[1.5] text-base font-semibold text-[#4285F4] lg:text-lg 3xl:text-xl'>
                      Thời gian tạo
                    </p>
                  </div>
                  {potentialQuestions.map((question) => (
                    <div
                      key={question._id}
                      className='flex flex-1 flex-shrink-0 flex-row items-center gap-x-4 border-b border-b-[#CCC]/60
                      px-6 py-2 lg:py-4 lg:px-8 3xl:py-6 3xl:px-10'
                    >
                      <p className='flex flex-[2.5] text-xs font-medium lg:text-sm 3xl:text-base'>
                        {question.name}
                      </p>
                      <p className='flex flex-[2] text-xs font-medium lg:text-sm 3xl:text-base'>
                        {question?.subject?.name}
                      </p>
                      <p className='flex flex-[1.2] text-xs font-medium lg:text-sm 3xl:text-base'>
                        {question?.chapter?.name}
                      </p>
                      <p className='flex flex-[1.5] text-xs font-medium lg:text-sm 3xl:text-base'>
                        {new Date(question.createdAt).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className='my-5 flex flex-row-reverse gap-x-8'>
                <Link
                  to={`/admin/exercises/edit/0`}
                  className='flex h-9 w-36 items-center justify-center rounded-lg bg-[#4285F4] px-4 hover:bg-[#4285F4]/[.8]'
                >
                  <p className='text-white'>Chỉnh sửa</p>
                </Link>
              </div>
            </main>
          </div>
        </div>
      </Wrapper>
    </Page>
  );
};

export default ViewExercisePage;
