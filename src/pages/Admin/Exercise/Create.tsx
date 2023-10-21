import React, { ChangeEvent, useState } from 'react';
import { SingleValue } from 'react-select';

import { Icon, Select } from '../../../components';
import { Option } from '../../../components/Select';
import { Page, Wrapper } from '../../../layout';

const QUESTIONS = [
  {
    id: 1,
    name: 'Câu hỏi 1',
    subject: 'Giải tích',
    chapter: 'Chương 1',
    createdAt: '2 ngày trước',
    lastUpdatedAt: '1 ngày trước',
  },
  {
    id: 2,
    name: 'Câu hỏi 2',
    subject: 'Giải tích',
    chapter: 'Chương 1',
    createdAt: '2 ngày trước',
    lastUpdatedAt: '1 ngày trước',
  },
  {
    id: 3,
    name: 'Câu hỏi 3',
    subject: 'Giải tích',
    chapter: 'Chương 1',
    createdAt: '2 ngày trước',
    lastUpdatedAt: '1 ngày trước',
  },
  {
    id: 4,
    name: 'Câu hỏi 1',
    subject: 'Giải tích',
    chapter: 'Chương 1',
    createdAt: '2 ngày trước',
    lastUpdatedAt: '1 ngày trước',
  },
  {
    id: 5,
    name: 'Câu hỏi 1',
    subject: 'Giải tích',
    chapter: 'Chương 1',
    createdAt: '2 ngày trước',
    lastUpdatedAt: '1 ngày trước',
  },
];

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

const CreateExercisePage = () => {
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [chapter, setChapter] = useState('');
  const [duration, setDuration] = useState('');
  const [sampleSize, setSampleSize] = useState('');
  const [description, setDescription] = useState('');

  const [filterName, setFilterName] = useState('');
  const [filterSubject, setFilterSubject] = useState('');
  const [filterChapter, setFilterChapter] = useState('');

  console.log(chapter);

  const onInputName = (event: ChangeEvent<HTMLInputElement>) => setName(event.target.value);

  const onSelectSubject = (event: SingleValue<Option>) => {
    if (event !== null) {
      setSubject(event.value);
    }
  };

  const onSelectChapter = (event: SingleValue<Option>) => {
    if (event !== null) {
      setChapter(event.value);
    }
  };

  const onInputDuration = (event: ChangeEvent<HTMLInputElement>) => setDuration(event.target.value);

  const onInputSampleSize = (event: ChangeEvent<HTMLInputElement>) =>
    setSampleSize(event.target.value);

  const onInputDescription = (event: ChangeEvent<HTMLTextAreaElement>) =>
    setDescription(event.target.value);

  const onInputFilterName = (event: ChangeEvent<HTMLInputElement>) =>
    setFilterName(event.target.value);

  const onSelectFilterSubject = (event: SingleValue<Option>) => {
    if (event !== null) {
      setFilterSubject(event.value);
    }
  };

  const onSelectFilterChapter = (event: SingleValue<Option>) => {
    if (event !== null) {
      setFilterChapter(event.value);
    }
  };

  const createExercise = (_: React.MouseEvent<HTMLButtonElement>) => {
    console.log('nyahello');
  };

  return (
    <Page>
      <Wrapper className='flex flex-1 flex-col'>
        <div className='w-full bg-[#4285F4]/90 py-4'>
          <p className='text-center text-sm font-bold text-white md:text-2xl 3xl:text-4xl'>
            Tạo bài tập rèn luyện
          </p>
        </div>
        <div className='w-full p-4'>
          <div className='h-full w-full rounded-lg bg-white p-4 lg:p-6 3xl:p-8'>
            <main className='flex flex-col gap-y-4'>
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
                  value={name}
                  onChange={onInputName}
                />
              </div>
              <div className='flex flex-row gap-x-8'>
                <div className='flex w-full flex-col gap-y-1'>
                  <p className='flex flex-[2.5] text-base lg:text-lg 3xl:text-xl'>Môn</p>
                  <Select
                    options={SUBJECTS}
                    placeholder='Chọn môn'
                    value={SUBJECTS.find((x) => x.value === subject)}
                    onChange={onSelectSubject}
                  />
                </div>
                <div className='flex w-full flex-col gap-y-1'>
                  <p className='flex flex-[2.5] text-base lg:text-lg 3xl:text-xl'>Chương</p>
                  <Select
                    options={CHAPTERS}
                    placeholder='Chọn chương'
                    className='w-80'
                    value={CHAPTERS.find((x) => x.value === subject)}
                    onChange={onSelectChapter}
                  />
                </div>
                <div className='flex flex-col'>
                  <p className='flex flex-[2.5] text-base lg:text-lg 3xl:text-xl'>
                    Thời gian làm bài (hh:mm:ss)
                  </p>
                  <input
                    className='flex flex-1 rounded-lg border border-[#D9D9D9] p-1 text-center text-xs font-medium lg:p-3 lg:text-sm 3xl:p-5 3xl:text-base'
                    value={duration}
                    onChange={onInputDuration}
                  />
                </div>
                <div className='flex flex-col'>
                  <p className='flex flex-[2.5] text-base lg:text-lg 3xl:text-xl'>Số câu hỏi</p>
                  <input
                    className='flex w-24 flex-1 rounded-lg border border-[#D9D9D9] p-1 text-center text-xs font-medium lg:p-3 lg:text-sm 3xl:p-5 3xl:text-base'
                    value={sampleSize}
                    onChange={onInputSampleSize}
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
                  value={description}
                  onChange={onInputDescription}
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
                  <div className='flex flex-[2] flex-row items-center gap-x-8'>
                    <input
                      id='search_question'
                      placeholder='Tìm câu hỏi'
                      className='flex w-72 flex-1 rounded-lg border border-[#D9D9D9] p-1 text-xs font-medium lg:p-3 lg:text-sm 3xl:p-5 3xl:text-base'
                      value={filterName}
                      onChange={onInputFilterName}
                    />
                    <Select
                      options={SUBJECTS}
                      placeholder='Chọn môn'
                      value={SUBJECTS.find((x) => x.value === filterSubject)}
                      onChange={onSelectFilterSubject}
                    />
                    <Select
                      options={CHAPTERS}
                      placeholder='Chọn chương'
                      value={CHAPTERS.find((x) => x.value === filterChapter)}
                      onChange={onSelectFilterChapter}
                    />
                  </div>
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
                    <p className='flex flex-[1.5] text-base font-semibold text-[#4285F4] lg:text-lg 3xl:text-xl'>
                      Thời gian cập nhật
                    </p>
                    <div className='flex flex-1' />
                  </div>
                  {QUESTIONS.map((question) => (
                    <div
                      key={question.id}
                      className='flex flex-1 flex-shrink-0 flex-row items-center gap-x-4 border-b border-b-[#CCC]/60 
                      px-6 py-2 lg:py-4 lg:px-8 3xl:py-6 3xl:px-10'
                    >
                      <p className='flex flex-[2.5] text-xs font-medium lg:text-sm 3xl:text-base'>
                        {question.name}
                      </p>
                      <p className='flex flex-[2] text-xs font-medium lg:text-sm 3xl:text-base'>
                        {question.subject}
                      </p>
                      <p className='flex flex-[1.2] text-xs font-medium lg:text-sm 3xl:text-base'>
                        {question.chapter}
                      </p>
                      <p className='flex flex-[1.5] text-xs font-medium lg:text-sm 3xl:text-base'>
                        {question.createdAt}
                      </p>
                      <p className='flex flex-[1.5] text-xs font-medium lg:text-sm 3xl:text-base'>
                        {question.lastUpdatedAt}
                      </p>
                      <div className='flex flex-1 flex-wrap items-center justify-end gap-x-4 gap-y-4'>
                        <button className='flex items-center justify-center rounded-full bg-[#DB4437]/90 p-2'>
                          <Icon.Delete
                            fill='white'
                            className='h-4 w-4 lg:h-5 lg:w-5 3xl:h-6 3xl:w-6'
                          />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className='my-5 flex flex-row-reverse gap-x-8'>
                <button className='h-9 w-36 rounded-lg bg-[#4285F4] px-4' onClick={createExercise}>
                  <p className='text-white'>Tạo</p>
                </button>
              </div>
            </main>
          </div>
        </div>
      </Wrapper>
    </Page>
  );
};

export default CreateExercisePage;
