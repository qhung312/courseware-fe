import _ from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { Icon, Select } from '../../../components';
import { Page, Wrapper } from '../../../layout';

const exams = [
  {
    id: 1,
    name: 'Đề thi giữa kì 1 - Mã đề 2213',
    subject: 'Giải tích 1',
    type: 'midterm',
    semester: '221',
    createdAt: '20/10/2021, 18:00',
    updatedAt: '3 giờ trước',
  },
  {
    id: 2,
    name: 'Đề thi cuối kì 2 - Mã đề 2022',
    subject: 'Giải tích 1',
    type: 'final',
    semester: '202',
    createdAt: '20/10/2021, 18:00',
    updatedAt: '3 giờ trước',
  },
  {
    id: 3,
    name: 'Đề thi cuối kì 1 - Mã đề 1913',
    subject: 'Giải tích 1',
    type: 'final',
    semester: '191',
    createdAt: '20/10/2021, 18:00',
    updatedAt: '3 giờ trước',
  },
  {
    id: 4,
    name: 'Đề thi cuối kì 1 - Mã đề 2211',
    subject: 'Giải tích 1',
    type: 'final',
    semester: '221',
    createdAt: '20/10/2021, 18:00',
    updatedAt: '3 giờ trước',
  },
  {
    id: 5,
    name: 'Đề thi cuối kì 1 - Mã đề 2212',
    subject: 'Giải tích 1',
    type: 'final',
    semester: '221',
    createdAt: '20/10/2021, 18:00',
    updatedAt: '3 giờ trước',
  },
  {
    id: 6,
    name: 'Đề thi giữa kì 1 - Mã đề 2133',
    subject: 'Giải tích 1',
    type: 'midterm',
    semester: '213',
    createdAt: '20/10/2021, 18:00',
    updatedAt: '3 giờ trước',
  },
];

type SearchFormValue = {
  name: string;
  type: string;
  subject: string;
  semester: string;
};

const ExamList = () => {
  const [page, setPage] = useState(1);
  const [chunks, setChunks] = useState(_.chunk(exams, 10));
  const [value, setValue] = useState<SearchFormValue>({
    name: '',
    type: '',
    subject: '',
    semester: '',
  });
  const tableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const newExams = exams.filter((exam) => {
      let result = true;
      if (value.name !== '' && !exam.name.toLowerCase().includes(value.name.toLowerCase())) {
        result = false;
      }
      if (value.type !== '' && !exam.type.toLowerCase().includes(value.type.toLowerCase())) {
        result = false;
      }
      if (
        value.subject !== '' &&
        !exam.subject.toLowerCase().includes(value.subject.toLowerCase())
      ) {
        result = false;
      }
      if (
        value.semester !== '' &&
        !exam.semester.toLowerCase().includes(value.semester.toLowerCase())
      ) {
        result = false;
      }

      return result;
    });

    setChunks(_.chunk(newExams, 10));
  }, [value]);

  return (
    <Page>
      <Wrapper className='flex flex-1 flex-col'>
        <div className='w-full bg-[#4285F4]/90 py-4'>
          <p className='text-center text-sm font-bold text-white md:text-2xl 3xl:text-4xl'>
            Danh sách đề thi
          </p>
        </div>
        <div className='w-full p-4'>
          <Link className='mb-2 flex items-center hover:underline md:hidden' to='/admin'>
            <Icon.Chevron className='h-5 -rotate-90 fill-black' />
            <p className='text-sm text-[#5B5B5B]'>Quay lại</p>
          </Link>
          <div className='h-full rounded-lg bg-white p-4 lg:p-6 3xl:p-8'>
            <main className='flex w-full flex-col'>
              <div className='mb-8 flex flex-1 flex-col items-center justify-between gap-x-4 gap-y-4 px-6 md:flex-row lg:px-8 3xl:px-10'>
                <div className='relative flex w-full flex-[2] items-center'>
                  <input
                    className='flex flex-1 rounded-lg border border-[#CCC] p-1 text-xs font-medium 
                    lg:p-3 lg:text-sm 3xl:p-5 3xl:text-base'
                    value={value.name}
                    onChange={({ target }) => setValue({ ...value, name: target.value })}
                    placeholder='Tìm tên đề thi'
                  />
                </div>
                <div className='flex w-full flex-[3] flex-col gap-y-4 md:flex-row md:gap-x-4'>
                  <Select
                    options={_.uniqBy(exams, 'subject').map((exam) => ({
                      label: exam.subject,
                      value: exam.subject,
                    }))}
                    value={
                      value.subject === '' ? null : { label: value.subject, value: value.subject }
                    }
                    onChange={(v) => setValue({ ...value, subject: v?.value || '' })}
                    placeholder='Chọn môn'
                  />
                  <Select
                    options={[
                      {
                        label: 'Giữa kì',
                        value: 'midterm',
                      },
                      {
                        label: 'Cuối kì',
                        value: 'final',
                      },
                    ]}
                    onChange={(v) => setValue({ ...value, type: v?.value || '' })}
                    value={
                      value.type === ''
                        ? null
                        : {
                            label: value.type === 'midterm' ? 'Giữa kì' : 'Cuối kì',
                            value: value.type,
                          }
                    }
                    placeholder='Chọn kì thi'
                  />
                  <Select
                    options={_.uniqBy(exams, 'semester')
                      .sort((a, b) => Number(b.semester) - Number(a.semester))
                      .map((exam) => ({
                        label: exam.semester,
                        value: exam.semester,
                      }))}
                    onChange={(v) => setValue({ ...value, semester: v?.value || '' })}
                    value={
                      value.semester === ''
                        ? null
                        : { label: value.semester, value: value.semester }
                    }
                    placeholder='Chọn học kì'
                  />
                </div>
                <button
                  className={`flex flex-[0.5] ${
                    _.some(value, (v) => !_.isEmpty(v)) ? 'opacity-1' : 'opacity-0'
                  }`}
                  disabled={_.every(value, (v) => _.isEmpty(v))}
                  onClick={() => {
                    setValue({ name: '', subject: '', type: '', semester: '' });
                  }}
                >
                  <p className='text-xs lg:text-sm 3xl:text-base'>Xoá bộ lọc</p>
                </button>
              </div>
              <div ref={tableRef} className='w-full overflow-x-auto overscroll-auto'>
                <table className='flex w-full min-w-[900px] table-fixed flex-col gap-y-3 overflow-auto'>
                  <thead>
                    <tr className='flex w-full flex-1 items-center justify-start gap-x-4 px-6 lg:px-8 3xl:px-10'>
                      <th className='flex flex-[1.5] items-center justify-start text-base font-semibold text-[#4285f4] lg:text-lg 3xl:text-xl'>
                        Tên đề thi
                      </th>
                      <th className='flex flex-[1.5] items-center justify-start text-base font-semibold text-[#4285f4] lg:text-lg 3xl:text-xl'>
                        Môn
                      </th>
                      <th className='flex flex-1 items-center justify-start text-base font-semibold text-[#4285f4] lg:text-lg 3xl:text-xl'>
                        Kì thi
                      </th>
                      <th className='flex flex-1 items-center justify-start text-base font-semibold text-[#4285f4] lg:text-lg 3xl:text-xl'>
                        Học kì
                      </th>
                      <th className='flex flex-[2] items-center justify-start text-base font-semibold text-[#4285f4] lg:text-lg 3xl:text-xl'>
                        Thời gian tạo
                      </th>
                      <th className='flex flex-[2] items-center justify-start text-base font-semibold text-[#4285f4] lg:text-lg 3xl:text-xl'>
                        Thời gian cập nhật
                      </th>
                      <th className='flex flex-1 items-center justify-start text-base font-semibold text-[#4285f4] lg:text-lg 3xl:text-xl'>
                        {''}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {chunks[page - 1]?.map((exam) => (
                      <tr
                        key={`exam-${exam.id}`}
                        className='flex w-full flex-1 items-center justify-start gap-x-4 border-b border-b-[#CCC] p-2 px-6 lg:p-4 lg:px-8 3xl:p-6 3xl:px-10'
                      >
                        <td className='flex flex-[1.5] items-center justify-start text-xs font-medium lg:text-sm 3xl:text-base'>
                          {exam.name}
                        </td>
                        <td className='flex flex-[1.5] items-center justify-start text-xs font-medium lg:text-sm 3xl:text-base'>
                          {exam.subject}
                        </td>
                        <td className='flex flex-1 items-center justify-start text-xs font-medium lg:text-sm 3xl:text-base'>
                          {exam.type === 'midterm' ? 'Giữa kì' : 'Cuối kì'}
                        </td>
                        <td className='flex flex-1 items-center justify-start text-xs font-medium lg:text-sm 3xl:text-base'>
                          {exam.semester}
                        </td>
                        <td className='flex flex-[2] items-center justify-start text-xs font-medium lg:text-sm 3xl:text-base'>
                          {exam.createdAt}
                        </td>
                        <td className='flex flex-[2] items-center justify-start text-xs font-medium lg:text-sm 3xl:text-base'>
                          {exam.updatedAt}
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
            </main>
          </div>
        </div>
      </Wrapper>
    </Page>
  );
};

export default ExamList;
