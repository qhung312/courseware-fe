import React, { ChangeEvent, useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Link } from 'react-router-dom';
import { SingleValue } from 'react-select';

import { Icon, Pagination, Select } from '../../../components';
import { Option } from '../../../components/Select';
import { useDebounce } from '../../../hooks';
import { Page, Wrapper } from '../../../layout';
import ChapterService from '../../../service/chapter.service';
import SubjectService from '../../../service/subject.service';
import { Chapter } from '../../../types';

const ITEMS_PER_PAGE = 10;

const ChapterListPage = () => {
  const [loading, setLoading] = useState(false);

  const [filterName, setFilterName] = useState('');
  const [filterSubject, setFilterSubject] = useState('');
  const [filterSubjectOptions, setFilterSubjectOptions] = useState<Option[]>([]);

  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [totalCount, setTotalCount] = useState(1);
  const [page, setPage] = useState(1);

  const tableRef = React.useRef<HTMLDivElement>(null);

  const onInputFilterName = (event: ChangeEvent<HTMLInputElement>) => {
    setFilterName(event.target.value);
    setPage(1);
  };

  const onSelectFilterSubject = (event: SingleValue<Option>) => {
    if (event !== null) {
      setFilterSubject(event.value);
      setPage(1);
    }
  };

  const fetchChapters = useDebounce(() => {
    setLoading(true);
    ChapterService.getAllPaginated({
      name: filterName,
      pageNumber: page,
      pageSize: ITEMS_PER_PAGE,
      subject: filterSubject === '' ? undefined : filterSubject,
    })
      .then((res) => {
        const { total, result: allChapters } = res.data.payload;
        setChapters(allChapters);
        setTotalCount(total);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  });

  useEffect(() => {
    fetchChapters();
  }, [page, filterName, filterSubject, fetchChapters]);

  useEffect(() => {
    SubjectService.getAll({})
      .then((res) => {
        const { result: allSubjects } = res.data.payload;
        setFilterSubjectOptions(
          allSubjects.map((subject) => {
            return {
              value: subject._id,
              label: subject.name,
            };
          })
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <Page>
      <Wrapper className='flex flex-1 flex-col'>
        <div className='w-full bg-[#4285F4]/90 py-4'>
          <p className='text-center text-sm font-bold text-white md:text-2xl 3xl:text-4xl'>
            Danh sách chương
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
                    options={filterSubjectOptions}
                    value={filterSubjectOptions.find((x) => x.value === filterSubject) ?? null}
                    onChange={onSelectFilterSubject}
                    placeholder='Chọn môn'
                  />
                </div>
                <button
                  className={`flex flex-[0.5] ${
                    filterName !== '' || filterSubject !== '' ? 'opacity-1' : 'opacity-0'
                  }`}
                  disabled={filterName === '' && filterSubject === ''}
                  onClick={() => {
                    setFilterName('');
                    setFilterSubject('');
                    setPage(1);
                  }}
                >
                  <p className='text-xs lg:text-sm 3xl:text-base'>Xoá bộ lọc</p>
                </button>
              </div>

              {loading ? (
                <>
                  <p className='mb-5 w-full px-6 lg:px-8 3xl:px-10'>
                    <Skeleton width={'100%'} baseColor='#9DCCFF' height={56} />
                  </p>
                  <p className='w-full px-6 lg:px-8 3xl:px-10'>
                    {
                      <Skeleton
                        count={10}
                        className='my-2 box-content lg:my-4 3xl:my-6'
                        width={'100%'}
                        height={40}
                        baseColor='#9DCCFF'
                      />
                    }
                  </p>
                </>
              ) : (
                <>
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
                        {chapters.map((chapter) => (
                          <tr
                            key={`material-${chapter._id}`}
                            className='flex w-full flex-1 items-center justify-start gap-x-4 border-b border-b-[#CCC] p-2 px-6 lg:p-4 lg:px-8 3xl:p-6 3xl:px-10'
                          >
                            <td className='flex flex-[3] items-center justify-start text-xs font-medium lg:text-sm 3xl:text-base'>
                              {chapter.name}
                            </td>
                            <td className='flex flex-[1.5] items-center justify-start text-xs font-medium lg:text-sm 3xl:text-base'>
                              {chapter.subject.name}
                            </td>
                            <td className='flex flex-[2.5] items-center justify-start text-xs font-medium lg:text-sm 3xl:text-base'>
                              {new Date(chapter.createdAt).toLocaleString()}
                            </td>
                            <td className='flex flex-[2.5] items-center justify-start text-xs font-medium lg:text-sm 3xl:text-base'>
                              {chapter.lastUpdatedAt !== undefined
                                ? new Date(chapter.lastUpdatedAt).toLocaleString()
                                : undefined}
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
                </>
              )}

              <Pagination
                currentPage={page}
                totalCount={totalCount}
                pageSize={ITEMS_PER_PAGE}
                onPageChange={setPage}
              />
            </main>
          </div>
        </div>
      </Wrapper>
    </Page>
  );
};

export default ChapterListPage;
