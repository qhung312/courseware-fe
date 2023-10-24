import { ChangeEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Icon } from '../../../components';
import { useDebounce } from '../../../hooks';
import { Page, Wrapper } from '../../../layout';
import SubjectService from '../../../service/subject.service';
import { Subject } from '../../../types';

const ITEMS_PER_PAGE = 10;

const SubjectList = () => {
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [filterName, setFilterName] = useState('');
  const [subjects, setSubjects] = useState<Subject[]>([]);

  const onInputFilterName = (event: ChangeEvent<HTMLInputElement>) => {
    setFilterName(event.target.value);
    setPage(1);
  };

  const fetchSubjects = useDebounce(() => {
    SubjectService.getAllPaginated({
      name: filterName,
      pageNumber: page,
      pageSize: ITEMS_PER_PAGE,
    })
      .then((res) => {
        const { pageCount, result: allSubjects } = res.data.payload;
        setSubjects(allSubjects);
        setMaxPage(pageCount);
      })
      .catch((err) => {
        console.error(err);
      });
  });

  useEffect(() => {
    fetchSubjects();
  }, [fetchSubjects, filterName, page]);

  return (
    <Page>
      <Wrapper className='flex flex-1 flex-col'>
        <div className='w-full bg-[#4285F4]/90 py-4'>
          <p className='text-center text-sm font-bold text-white md:text-2xl 3xl:text-4xl'>
            Danh sách môn
          </p>
        </div>
        <div className='w-full p-4'>
          <Link className='mb-2 flex items-center hover:underline md:hidden' to='/admin'>
            <Icon.Chevron className='h-5 -rotate-90 fill-black' />
            <p className='text-sm text-[#5B5B5B]'>Quay lại</p>
          </Link>
          <div className='h-full w-full rounded-lg bg-white p-4 lg:p-6 3xl:p-8'>
            <main className='flex flex-col'>
              <div className='mb-8 flex flex-1 flex-col items-center justify-between gap-x-4 gap-y-4 px-6 md:flex-row lg:px-8 3xl:px-10'>
                <div className='relative flex w-full flex-1 items-center'>
                  <input
                    className='flex flex-1 rounded-lg border border-[#CCC] p-1 text-xs font-medium
                    lg:p-3 lg:text-sm 3xl:p-5 3xl:text-base'
                    value={filterName}
                    onChange={onInputFilterName}
                    placeholder='Tìm môn'
                  />
                </div>
              </div>
              <div className='mb-5 flex flex-1 flex-shrink-0 flex-row gap-x-4 px-6 lg:px-8 3xl:px-10'>
                <p className='flex flex-[2.5] text-base font-semibold text-[#4285f4] lg:text-lg 3xl:text-xl'>
                  Tên
                </p>
                <p className='flex flex-[1.5] text-base font-semibold text-[#4285F4] lg:text-lg 3xl:text-xl'>
                  Thời gian tạo
                </p>
                <p className='flex flex-[1.5] text-base font-semibold text-[#4285F4] lg:text-lg 3xl:text-xl'>
                  Thời gian cập nhật
                </p>
                <div className='flex flex-1' />
              </div>
              {subjects.map((subject, index) => (
                <div
                  key={index}
                  className='flex flex-1 flex-shrink-0 flex-row items-center gap-x-4 border-b border-b-[#CCC]/60
                  px-6 py-2 lg:py-4 lg:px-8 3xl:py-6 3xl:px-10'
                >
                  <p className='flex flex-[2.5] text-xs font-medium lg:text-sm 3xl:text-base'>
                    {subject.name}
                  </p>
                  <p className='flex flex-[1.5] text-xs font-medium lg:text-sm 3xl:text-base'>
                    {new Date(subject.createdAt).toLocaleString()}
                  </p>
                  <p className='flex flex-[1.5] text-xs font-medium lg:text-sm 3xl:text-base'>
                    {subject.lastUpdatedAt === undefined
                      ? undefined
                      : new Date(subject.lastUpdatedAt).toLocaleString()}
                  </p>
                  <div className='flex flex-1 flex-wrap items-center justify-end gap-x-4 gap-y-4'>
                    <button className='flex items-center justify-center rounded-full bg-[#4285F4]/90 p-2'>
                      <Icon.Edit fill='white' className='h-4 w-4 lg:h-5 lg:w-5 3xl:h-6 3xl:w-6' />
                    </button>
                    <button className='flex items-center justify-center rounded-full bg-[#DB4437]/90 p-2'>
                      <Icon.Delete fill='white' className='h-4 w-4 lg:h-5 lg:w-5 3xl:h-6 3xl:w-6' />
                    </button>
                  </div>
                </div>
              ))}
              <div className='mt-4 flex flex-1 flex-row items-center justify-center gap-x-4 pt-4'>
                <button
                  className={`rounded-full p-2 ${page === 1 ? '' : 'hover:bg-black/20'}`}
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                >
                  <Icon.Chevron fill='#5B5B5B' className='-rotate-90' />
                </button>
                {Array.from({ length: maxPage }, (_e, index) => index + 1).map((index) => (
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
                  className={`rounded-full p-2 ${page === maxPage ? '' : 'hover:bg-black/20'}`}
                  disabled={page === maxPage}
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

export default SubjectList;
