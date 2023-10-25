import React, { ChangeEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { SingleValue } from 'react-select';

import { Icon, Select } from '../../../components';
import { Option } from '../../../components/Select';
import { Page, Wrapper } from '../../../layout';
import './index.css';

interface QuestionProps {
  name: string;
  subject: string;
  chapter: string;
  description: string;
  code: string;
  options: string[];
  answerKey: number;
  shuffleOptions: boolean;
  explanation: string;
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

const demoQuestion: QuestionProps = {
  name: 'Bài tập 1',
  subject: '123',
  chapter: '111',
  description: 'Tìm giá trị lớn nhất của hàm số $y = x^2 + 2x + 1$',
  code: '$$ x = {-b \pm \sqrt{b^2-4ac} \over 2a} $$',
  options: [
    'Lorem ipsum dolor sit amet',
    'Lorem ipsum dolor sit amet',
    'Lorem ipsum dolor sit amet',
    'Lorem ipsum dolor sit amet',
  ],
  answerKey: 0,
  shuffleOptions: true,
  explanation:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
};

const EditQuestionPage = () => {
  const [question, setQuestion] = useState(demoQuestion);

  const onInputName = (event: ChangeEvent<HTMLInputElement>) =>
    setQuestion({ ...question, name: event.target.value });

  const onSelectSubject = (event: SingleValue<Option>) => {
    if (event !== null) {
      setQuestion({ ...question, subject: event.value });
    }
  };

  const onSelectChapter = (event: SingleValue<Option>) => {
    if (event !== null) {
      setQuestion({ ...question, chapter: event.value });
    }
  };

  const onInputDescription = (event: ChangeEvent<HTMLTextAreaElement>) =>
    setQuestion({ ...question, description: event.target.value });

  const onInputCode = (event: ChangeEvent<HTMLTextAreaElement>) =>
    setQuestion({ ...question, code: event.target.value });

  const onAddOption = (_: React.MouseEvent<HTMLButtonElement>) => {
    const newOptions = JSON.parse(JSON.stringify(question.options)) as string[];
    newOptions.push('');
    setQuestion({ ...question, options: newOptions });
  };

  const onSelectAnswerKey = (event: SingleValue<Option>) => {
    if (event !== null) {
      setQuestion({ ...question, answerKey: parseInt(event.value) });
    }
  };

  const onInputExplanation = (event: ChangeEvent<HTMLTextAreaElement>) =>
    setQuestion({ ...question, explanation: event.target.value });

  const toggleShuffleOptions = (_: ChangeEvent<HTMLInputElement>) =>
    setQuestion({ ...question, shuffleOptions: !question.shuffleOptions });

  const createQuestion = (_: React.MouseEvent<HTMLButtonElement>) => {
    console.log('creating a question');
  };

  return (
    <Page>
      <Wrapper className='flex flex-1 flex-col'>
        <div className='w-full bg-[#4285F4]/90 py-4'>
          <p className='text-center text-sm font-bold text-white md:text-2xl 3xl:text-4xl'>
            Chỉnh sửa câu hỏi
          </p>
        </div>
        <div className='w-full p-4'>
          <div className='w-full rounded-lg bg-white p-4 pb-8 lg:p-6 3xl:p-8'>
            <main className='flex flex-col gap-y-4'>
              <Link
                to='/admin/questions/manage'
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
                  value={question.name}
                  placeholder={question.name}
                  onChange={onInputName}
                />
              </div>
              <div className='flex flex-row gap-x-8'>
                <div className='flex w-full flex-col gap-y-1'>
                  <p className='flex flex-[2.5] text-base lg:text-lg 3xl:text-xl'>Môn</p>
                  <Select
                    options={SUBJECTS}
                    placeholder='Chọn môn'
                    value={SUBJECTS.find((x) => x.value === question.subject)}
                    onChange={onSelectSubject}
                  />
                </div>
                <div className='flex w-full flex-col'>
                  <p className='flex flex-[2.5] text-base lg:text-lg 3xl:text-xl'>Chương</p>
                  <Select
                    options={CHAPTERS}
                    placeholder='Chọn chương'
                    value={CHAPTERS.find((x) => x.value === question.chapter)}
                    onChange={onSelectChapter}
                  />
                </div>
              </div>
              <div className='flex flex-col gap-y-1'>
                <label
                  className='flex flex-[2.5] text-base lg:text-lg 3xl:text-xl'
                  htmlFor='description'
                >
                  Đề
                </label>
                <textarea
                  id='description'
                  rows={10}
                  className='flex w-full flex-1 rounded-lg border border-[#D9D9D9] p-1 text-xs font-medium lg:p-3 lg:text-sm 3xl:p-5 3xl:text-base'
                  value={question.description}
                  placeholder={question.description}
                  onChange={onInputDescription}
                />
              </div>
              <div className='flex flex-col gap-y-1'>
                <label className='flex flex-[2.5] text-base lg:text-lg 3xl:text-xl' htmlFor='code'>
                  Biểu thức
                </label>
                <textarea
                  id='code'
                  rows={10}
                  className='flex w-full flex-1 rounded-lg border border-[#D9D9D9] p-1 text-xs font-medium lg:p-3 lg:text-sm 3xl:p-5 3xl:text-base'
                  value={question.code}
                  placeholder={question.code}
                  onChange={onInputCode}
                />
              </div>
              <div className='flex flex-col gap-y-8'>
                <div className='flex flex-row items-center gap-x-8'>
                  <p className='flex text-base lg:text-lg 3xl:text-xl'>Lựa chọn</p>
                  <button className='h-9 w-36 rounded-lg bg-[#4285F4] px-4' onClick={onAddOption}>
                    <p className='text-white'>Thêm lựa chọn</p>
                  </button>
                </div>
                <div className='flex flex-col gap-y-4'>
                  {question.options.map((option, index) => {
                    return (
                      <div key={index} className='flex flex-row items-center gap-x-8'>
                        <label className='align-middle' htmlFor={`option_${index}`}>
                          {index + 1}
                        </label>
                        <input
                          id={`option_${index}`}
                          className='flex flex-1 rounded-lg border border-[#D9D9D9] p-1 text-xs font-medium lg:p-3 lg:text-sm 3xl:p-5 3xl:text-base'
                          value={option}
                          onChange={({ target }) => {
                            const newOptions = JSON.parse(
                              JSON.stringify(question.options)
                            ) as string[];
                            newOptions[index] = target.value;
                            setQuestion({ ...question, options: newOptions });
                          }}
                        />
                        {question.options.length > 1 && (
                          <button
                            className='flex items-center justify-center rounded-full bg-[#DB4437]/90 p-2'
                            onClick={() => {
                              const newOptions = JSON.parse(
                                JSON.stringify(question.options)
                              ) as string[];
                              newOptions.splice(index, 1);
                              setQuestion({
                                ...question,
                                options: newOptions,
                                answerKey: Math.min(newOptions.length - 1, question.answerKey),
                              });
                            }}
                          >
                            <Icon.Delete
                              fill='white'
                              className='h-4 w-4 lg:h-5 lg:w-5 3xl:h-6 3xl:w-6'
                            />
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
                <div className='flex flex-row items-center gap-x-8'>
                  <div className='flex flex-row items-center gap-x-4'>
                    <p className='flex text-base lg:text-lg 3xl:text-xl'>Đáp án đúng:</p>
                    <Select
                      options={question.options.map((_, index) => ({
                        value: index.toString(),
                        label: (index + 1).toString(),
                      }))}
                      value={{
                        value: question.answerKey.toString(),
                        label: (question.answerKey + 1).toString(),
                      }}
                      onChange={onSelectAnswerKey}
                    />
                  </div>
                  <div className='flex flex-row items-center gap-x-4'>
                    <p className='flex text-base lg:text-lg 3xl:text-xl'>Xáo trộn lựa chọn:</p>
                    <input
                      type='checkbox'
                      className='allow-checked h-8 w-8'
                      checked={question.shuffleOptions}
                      onChange={toggleShuffleOptions}
                    />
                  </div>
                </div>
              </div>
              <div className='flex flex-col gap-y-1'>
                <label
                  className='flex flex-[2.5] text-base lg:text-lg 3xl:text-xl'
                  htmlFor='explanation'
                >
                  Giải thích
                </label>
                <textarea
                  id='explanation'
                  rows={10}
                  className='flex w-full flex-1 rounded-lg border border-[#D9D9D9] p-1 text-xs font-medium lg:p-3 lg:text-sm 3xl:p-5 3xl:text-base'
                  value={question.explanation}
                  placeholder={question.explanation}
                  onChange={onInputExplanation}
                />
              </div>
              <div className='mt-4 flex flex-row-reverse gap-x-8'>
                <button
                  className='h-9 w-36 rounded-lg bg-[#4285F4] px-4'
                  onClick={() => {
                    console.log(`Save`);
                  }}
                >
                  <p className='text-white'>Lưu thay đôi</p>
                </button>
                <button className='h-9 w-36 rounded-lg bg-[#4285F4] px-4' onClick={createQuestion}>
                  <p className='text-white'>Xem trước</p>
                </button>
              </div>
            </main>
          </div>
        </div>
      </Wrapper>
    </Page>
  );
};

export default EditQuestionPage;
