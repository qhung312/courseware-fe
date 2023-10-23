import React, { ChangeEvent, useState } from 'react';
import { SingleValue } from 'react-select';

import { Select } from '../../../components';
import { Option } from '../../../components/Select';
import { Page, Wrapper } from '../../../layout';

const SUBJECTS = [
  {
    value: '1',
    label: 'Giải tích 1',
  },
  {
    value: '2',
    label: 'Giải tích 2',
  },
  {
    value: '3',
    label: 'Giải tích 3',
  },
];

const CreateChapterPage = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [subject, setSubject] = useState('');

  const onInputName = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const onInputDescription = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  const onCreateSubject = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log('hello world', event);
  };
  
  const onSelectSubject = (event: SingleValue<Option>) => {
    if (event !== null) {
      setSubject(event.value);
    }
  };

  return (
    <Page>
      <Wrapper className='flex flex-1 flex-col'>
        <div className='w-full bg-[#4285F4]/90 py-4'>
          <p className='text-center text-sm font-bold text-white md:text-2xl 3xl:text-4xl'>
            Tạo chương mới
          </p>
        </div>
        <div className='w-full p-4'>
          <div className='h-full w-full rounded-lg bg-white p-4 lg:p-6 3xl:p-8'>
            <main className='flex flex-col gap-y-4'>
              {/**
               * Name field
               */}
              <div className='flex flex-col gap-y-1'>
                <label className='flex flex-[2.5] text-base lg:text-lg 3xl:text-xl' htmlFor='name'>
                  Tên
                </label>
                <input
                  id='name'
                  className='flex w-full flex-1 rounded-lg border border-[#D9D9D9] p-1 text-xs font-medium lg:p-3 lg:text-sm 3xl:p-5 3xl:text-base'
                  value={name}
                  onChange={onInputName}
                />
              </div>
              <div className='flex flex-col gap-y-1'>
                <p className='flex flex-[2.5] text-base lg:text-lg 3xl:text-xl'>Tên</p>
                <Select
                  options={SUBJECTS}
                  value={SUBJECTS.find((x) => x.value === subject) ?? null}
                  onChange={onSelectSubject}
                  placeholder='Chọn chương'
                />
              </div>
              {/**
               * Description field
               */}
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
              {/**
               * Create button
               */}
              <div className='my-5 flex flex-row-reverse gap-x-8'>
                <button className='h-9 w-36 rounded-lg bg-[#4285F4] px-4' onClick={onCreateSubject}>
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

export default CreateChapterPage;
