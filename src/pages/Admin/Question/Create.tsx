import React, { ChangeEvent, useState } from 'react';
import { SingleValue } from 'react-select';

import { Icon, Select } from '../../../components';
import { Option } from '../../../components/Select';
import { Page, Wrapper } from '../../../layout';

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

const CreateQuestionPage = () => {
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [chapter, setChapter] = useState('');
  const [description, setDescription] = useState('');
  const [code, setCode] = useState('');
  const [options, setOptions] = useState(['']);
  const [answerKey, setAnswerKey] = useState(0);
  const [shuffleOptions, setShuffleOptions] = useState(false);
  const [explanation, setExplanation] = useState('');

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

  const onInputDescription = (event: ChangeEvent<HTMLTextAreaElement>) =>
    setDescription(event.target.value);

  const onInputCode = (event: ChangeEvent<HTMLTextAreaElement>) => setCode(event.target.value);

  const onAddOption = (_: React.MouseEvent<HTMLButtonElement>) => {
    const newOptions = JSON.parse(JSON.stringify(options)) as string[];
    newOptions.push('');
    setOptions(newOptions);
  };

  const onSelectAnswerKey = (event: SingleValue<Option>) => {
    if (event !== null) {
      setAnswerKey(parseInt(event.value));
    }
  };

  const onInputExplanation = (event: ChangeEvent<HTMLTextAreaElement>) =>
    setExplanation(event.target.value);

  const toggleShuffleOptions = (_: ChangeEvent<HTMLInputElement>) =>
    setShuffleOptions(!shuffleOptions);

  const createQuestion = (_: React.MouseEvent<HTMLButtonElement>) => {
    console.log('creating a question');
  };

  return (
    <Page>
      <Wrapper className='flex flex-1 flex-col'>
        <div className='w-full bg-[#4285F4]/90 py-4'>
          <p className='text-center text-sm font-bold text-white md:text-2xl 3xl:text-4xl'>
            Tạo câu hỏi mới
          </p>
        </div>
        <div className='w-full p-4'>
          <div className='w-full rounded-lg bg-white p-4 pb-8 lg:p-6 3xl:p-8'>
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
                <div className='flex w-full flex-col'>
                  <p className='flex flex-[2.5] text-base lg:text-lg 3xl:text-xl'>Chương</p>
                  <Select
                    options={CHAPTERS}
                    placeholder='Chọn chương'
                    value={CHAPTERS.find((x) => x.value === subject)}
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
                  value={description}
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
                  value={code}
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
                  {options.map((option, index) => {
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
                            const newOptions = JSON.parse(JSON.stringify(options)) as string[];
                            newOptions[index] = target.value;
                            setOptions(newOptions);
                          }}
                        />
                        {options.length > 1 && (
                          <button
                            className='flex items-center justify-center rounded-full bg-[#DB4437]/90 p-2'
                            onClick={() => {
                              const newOptions = JSON.parse(JSON.stringify(options)) as string[];
                              newOptions.splice(index, 1);
                              setOptions(newOptions);
                              setAnswerKey(Math.min(newOptions.length - 1, answerKey));
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
                      options={options.map((_, index) => ({
                        value: index.toString(),
                        label: (index + 1).toString(),
                      }))}
                      value={{
                        value: answerKey.toString(),
                        label: (answerKey + 1).toString(),
                      }}
                      onChange={onSelectAnswerKey}
                    />
                  </div>
                  <div className='flex flex-row items-center gap-x-4'>
                    <p className='flex text-base lg:text-lg 3xl:text-xl'>Xáo trộn lựa chọn:</p>
                    <input
                      type='checkbox'
                      className='h-8 w-8'
                      checked={shuffleOptions}
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
                  value={explanation}
                  onChange={onInputExplanation}
                />
              </div>
              <div className='mt-4 flex flex-row-reverse gap-x-8'>
                <button
                  className='h-9 w-36 rounded-lg bg-[#4285F4] px-4'
                  onClick={() => {
                    console.log(`Create`);
                  }}
                >
                  <p className='text-white'>Tạo</p>
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

export default CreateQuestionPage;
