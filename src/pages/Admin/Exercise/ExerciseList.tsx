import _ from 'lodash';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SingleValue } from 'react-select';

import { Icon, Select } from '../../../components';
import { Option } from '../../../components/Select';
import { Page, Wrapper } from '../../../layout';

const EXERCISES = [
  {
    name: 'bài tập rèn luyện 1',
    subject: 'giai tich 1',
    chapter: 'chuong 1: dao ham ham so',
    createdAt: '28/07/2023, 18:03',
    lastUpdatedAt: '28/07/2023, 18:03',
  },
  {
    name: 'bài tập rèn luyện 2',
    subject: 'giai tich 1',
    chapter: 'chuong 1: dao ham ham so',
    createdAt: '28/07/2023, 18:03',
    lastUpdatedAt: '28/07/2023, 18:03',
  },
  {
    name: 'bài tập rèn luyện 3',
    subject: 'giai tich 1',
    chapter: 'chuong 1: dao ham ham so',
    createdAt: '28/07/2023, 18:03',
    lastUpdatedAt: '28/07/2023, 18:03',
  },
  {
    name: 'bài tập rèn luyện 4',
    subject: 'giai tich 1',
    chapter: 'chuong 1: dao ham ham so',
    createdAt: '28/07/2023, 18:03',
    lastUpdatedAt: '28/07/2023, 18:03',
  },
];

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

const CHAPTERS = [
  {
    value: '1',
    label: 'Chương 1',
  },
  {
    value: '2',
    label: 'Chương 2',
  },
  {
    value: '3',
    label: 'Chương 3',
  },
];

const ITEMS_PER_PAGE = 10;

const ExerciseListPage = () => {
  const [page, setPage] = useState(1);
  const [chunks, setChunks] = useState(_.chunk(EXERCISES, ITEMS_PER_PAGE));
  const [filterName, setFilterName] = useState('');
  const [filterSubject, setFilterSubject] = useState('');
  const [filterChapter, setFilterChapter] = useState('');

  const tableRef = React.useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const newExercises = EXERCISES.filter((exercise) =>
      exercise.name.toLowerCase().includes(filterName.toLowerCase())
    );
    setChunks(_.chunk(newExercises, ITEMS_PER_PAGE));
    setPage(1);
  }, [filterName]);

  return (
    <Page>
      <Wrapper className='flex flex-1 flex-col'>
        <div className='w-full bg-[#4285F4]/90 py-4'>
          <p className='text-center text-sm font-bold text-white md:text-2xl 3xl:text-4xl'>
            Danh sách bài tập rèn luyện
          </p>
        </div>
        <div className='w-full p-4'>
          <Link className='mb-2 flex items-center hover:underline md:hidden' to='/admin'>
            <Icon.Chevron className='h-5 -rotate-90 fill-black' />
            <p className='text-sm text-[#5B5B5B]'>Quay lại</p>
          </Link>
          <div className='h-full w-full rounded-lg bg-white p-4 lg:p-6 3xl:p-8'>
            <main className='flex flex-col'>
              <div className='mb-8 flex flex-1 flex-col items-center gap-x-4 gap-y-4 px-6 md:flex-row lg:px-8 3xl:px-10'>
                <div className='relative flex w-full flex-1 items-center'>
                  <input
                    className='flex flex-1 rounded-lg border border-[#CCC] p-1 text-xs font-medium 
                    lg:p-3 lg:text-sm 3xl:p-5 3xl:text-base'
                    value={filterName}
                    onChange={onInputFilterName}
                    placeholder='Tìm câu hỏi'
                  />
                </div>
                <div className='flex w-full flex-[2] flex-row gap-x-4'>
                  <Select
                    options={SUBJECTS}
                    value={SUBJECTS.find((x) => x.value === filterSubject) ?? null}
                    onChange={onSelectFilterSubject}
                    placeholder='Chọn môn'
                  />
                  <Select
                    options={CHAPTERS}
                    onChange={onSelectFilterChapter}
                    value={CHAPTERS.find((x) => x.value === filterChapter ?? null)}
                    placeholder='Chọn chương'
                  />
                </div>
                <button
                  className={`flex flex-[0.5] ${
                    filterName !== '' || filterSubject !== '' || filterChapter !== ''
                      ? 'opacity-1'
                      : 'opacity-0'
                  }`}
                  disabled={filterName === '' && filterSubject === '' && filterChapter === ''}
                  onClick={() => {
                    setFilterName('');
                    setFilterSubject('');
                    setFilterChapter('');
                  }}
                >
                  <p className='text-xs lg:text-sm 3xl:text-base'>Xoá bộ lọc</p>
                </button>
              </div>

              <div ref={tableRef} className='w-full overflow-auto'>
                <table className='flex w-full min-w-[720px] table-fixed flex-col gap-y-3 overflow-auto'>
                  <thead>
                    <tr className='flex w-full flex-1 items-center justify-start gap-x-4 px-6 lg:px-8 3xl:px-10'>
                      <th className='flex flex-[3] items-center justify-start text-base font-semibold text-[#4285f4] lg:text-lg 3xl:text-xl'>
                        Tên
                      </th>
                      <th className='flex flex-[1.5] items-center justify-start text-base font-semibold text-[#4285f4] lg:text-lg 3xl:text-xl'>
                        Môn
                      </th>
                      <th className='flex flex-1 items-center justify-start text-base font-semibold text-[#4285f4] lg:text-lg 3xl:text-xl'>
                        Chương
                      </th>
                      <th className='flex flex-[2.5] items-center justify-start text-base font-semibold text-[#4285f4] lg:text-lg 3xl:text-xl'>
                        Thời gian tạo
                      </th>
                      <th className='flex flex-[2.5] items-center justify-start text-base font-semibold text-[#4285f4] lg:text-lg 3xl:text-xl'>
                        Thời gian cập nhật
                      </th>
                      <th className='flex flex-1 items-center justify-start text-base font-semibold text-[#4285f4] lg:text-lg 3xl:text-xl'>
                        {''}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {chunks.length > 0 &&
                      chunks[page - 1]?.map((question, index) => (
                        <tr
                          key={`material-${index}`}
                          className='flex w-full flex-1 items-center justify-start gap-x-4 border-b border-b-[#CCC] p-2 px-6 lg:p-4 lg:px-8 3xl:p-6 3xl:px-10'
                        >
                          <td className='flex flex-[3] items-center justify-start text-xs font-medium lg:text-sm 3xl:text-base'>
                            {question.name}
                          </td>
                          <td className='flex flex-[1.5] items-center justify-start text-xs font-medium lg:text-sm 3xl:text-base'>
                            {question.subject}
                          </td>
                          <td className='flex flex-1 items-center justify-center text-xs font-medium lg:text-sm 3xl:text-base'>
                            {question.chapter}
                          </td>
                          <td className='flex flex-[2.5] items-center justify-start text-xs font-medium lg:text-sm 3xl:text-base'>
                            {question.createdAt}
                          </td>
                          <td className='flex flex-[2.5] items-center justify-start text-xs font-medium lg:text-sm 3xl:text-base'>
                            {question.lastUpdatedAt}
                          </td>
                          <td className='flex flex-1 flex-wrap items-center justify-end gap-x-4 gap-y-2'>
                            <button className='flex items-center justify-center rounded-full bg-[#4285F4]/90 p-2'>
                              <Icon.Edit
                                fill='white'
                                className='h-4 w-4 lg:h-5 lg:w-5 3xl:h-6 3xl:w-6'
                              />
                            </button>
                            <button className='flex items-center justify-center rounded-full bg-[#DB4437]/90 p-2'>
                              <Icon.Delete
                                fill='white'
                                className='h-4 w-4 lg:h-5 lg:w-5 3xl:h-6 3xl:w-6'
                              />
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>

              {chunks.length > 0 && (
                <div className='mt-4 flex flex-1 flex-row items-center justify-center gap-x-4'>
                  <button
                    className={`rounded-full p-2 ${page === 1 ? '' : 'hover:bg-black/20'}`}
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                  >
                    <Icon.Chevron fill='#5B5B5B' className='-rotate-90' />
                  </button>
                  {Array.from({ length: chunks.length }, (_e, index) => index + 1).map((index) => (
                    <button
                      key={`page-${index}`}
                      className={`aspect-square rounded-full p-2 ${
                        index === page ? 'bg-[#4285F4]/90' : 'hover:bg-black/20'
                      }`}
                      onClick={() => setPage(index)}
                    >
                      <p
                        className={`w-7 text-lg ${
                          index === page ? 'font-semibold text-white' : 'font-medium'
                        }`}
                      >
                        {index}
                      </p>
                    </button>
                  ))}
                  <button
                    className={`rounded-full p-2 ${
                      page === chunks.length ? '' : 'hover:bg-black/20'
                    }`}
                    disabled={page === chunks.length}
                    onClick={() => setPage(page + 1)}
                  >
                    <Icon.Chevron fill='#5B5B5B' className='rotate-90' />
                  </button>
                </div>
              )}
            </main>
          </div>
        </div>
      </Wrapper>
    </Page>
  );
};

export default ExerciseListPage;
