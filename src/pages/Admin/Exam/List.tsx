import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { Icon, Select } from '../../../components';
import { Option } from '../../../components/Select';
import { useDebounce } from '../../../hooks';
import { Page, Wrapper } from '../../../layout';
import ExamArchiveService from '../../../service/examArchive.service';
import SubjectService from '../../../service/subject.service';
import { ExamArchive } from '../../../types';
import { EXAM_TYPE_OPTIONS, SEMESTER_OPTIONS } from '../../../types/examArchive';

const ITEMS_PER_PAGE = 10;

const ExamList = () => {
  const [filterName, setFilterName] = useState('');
  const [filterSubject, setFilterSubject] = useState('');
  const [filterSemester, setFilterSemester] = useState('');
  const [filterExamType, setFilterExamType] = useState('');

  const [filterSubjectOptions, setFilterSubjectOptions] = useState<Option[]>([]);
  const [examArchives, setExamArchives] = useState<ExamArchive[]>([]);
  const [maxPage, setMaxPage] = useState(1);
  const [page, setPage] = useState(1);

  const tableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleWheeling = (e: WheelEvent) => {
      if (tableRef.current) {
        if (tableRef.current.scrollWidth > tableRef.current.clientWidth) {
          e.preventDefault();
          tableRef.current?.scrollBy(e.deltaY, 0);
        }
      }
    };
    const tableElement = tableRef.current;
    tableElement?.addEventListener('wheel', handleWheeling);

    return () => {
      tableElement?.removeEventListener('wheel', handleWheeling);
    };
  }, []);

  const fetchExamArchive = useDebounce(() => {
    ExamArchiveService.getAllPaginated({
      name: filterName,
      subject: filterSubject === '' ? undefined : filterSubject,
      semester: filterSemester === '' ? undefined : filterSemester,
      type: filterExamType === '' ? undefined : filterExamType,
      pageNumber: page,
      pageSize: ITEMS_PER_PAGE,
    })
      .then((res) => {
        const { pageCount, result: allExamArchives } = res.data.payload;
        setExamArchives(allExamArchives);
        setMaxPage(pageCount);
      })
      .catch((err) => {
        console.error(err);
      });
  });

  useEffect(() => {
    fetchExamArchive();
  }, [page, filterName, filterSubject, filterSemester, filterExamType, fetchExamArchive]);

  useEffect(() => {
    // fetch all subjects on first load
    SubjectService.getAll({})
      .then((res) => {
        const { result: allSubjects } = res.data.payload;
        setFilterSubjectOptions(
          allSubjects.map((subject) => ({
            value: subject._id,
            label: subject.name,
          }))
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
                    value={filterName}
                    onChange={({ target }) => {
                      setFilterName(target.value);
                      setPage(1);
                    }}
                    placeholder='Tìm tên đề thi'
                  />
                </div>
                <div className='flex w-full flex-[3] flex-col gap-y-4 md:flex-row md:gap-x-4'>
                  <Select
                    options={filterSubjectOptions}
                    value={filterSubjectOptions.find((x) => x.value === filterSubject) ?? null}
                    onChange={(v) => {
                      if (v !== null) {
                        setFilterSubject(v.value);
                        setPage(1);
                      }
                    }}
                    placeholder='Chọn môn'
                  />
                  <Select
                    options={SEMESTER_OPTIONS}
                    onChange={(v) => {
                      if (v !== null) {
                        setFilterSemester(v.value);
                        setPage(1);
                      }
                    }}
                    value={SEMESTER_OPTIONS.find((x) => x.value === filterSemester) ?? null}
                    placeholder='Chọn học kì'
                  />
                  <Select
                    options={EXAM_TYPE_OPTIONS}
                    onChange={(v) => {
                      if (v !== null) {
                        setFilterExamType(v.value);
                        setPage(1);
                      }
                    }}
                    value={EXAM_TYPE_OPTIONS.find((x) => x.value === filterExamType) ?? null}
                    placeholder='Chọn loại đề thi'
                  />
                </div>
                <button
                  className={`flex flex-[0.5] ${
                    filterName !== '' ||
                    filterSubject !== '' ||
                    filterSemester !== '' ||
                    filterExamType !== ''
                      ? 'opacity-1'
                      : 'opacity-0'
                  }`}
                  disabled={
                    filterName === '' &&
                    filterSubject === '' &&
                    filterSemester === '' &&
                    filterExamType === ''
                  }
                  onClick={() => {
                    setFilterName('');
                    setFilterSubject('');
                    setFilterSemester('');
                    setFilterExamType('');
                    setPage(1);
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
                        Học kì
                      </th>
                      <th className='flex flex-1 items-center justify-start text-base font-semibold text-[#4285f4] lg:text-lg 3xl:text-xl'>
                        Kì thi
                      </th>
                      <th className='flex flex-1 items-center justify-start text-base font-semibold text-[#4285f4] lg:text-lg 3xl:text-xl'>
                        {''}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {examArchives.map((exam) => (
                      <tr
                        key={`exam-${exam._id}`}
                        className='flex w-full flex-1 items-center justify-start gap-x-4 border-b border-b-[#CCC] p-2 px-6 lg:p-4 lg:px-8 3xl:p-6 3xl:px-10'
                      >
                        <td className='flex flex-[1.5] items-center justify-start text-xs font-medium lg:text-sm 3xl:text-base'>
                          {exam.name}
                        </td>
                        <td className='flex flex-[1.5] items-center justify-start text-xs font-medium lg:text-sm 3xl:text-base'>
                          {exam?.subject?.name}
                        </td>
                        <td className='flex flex-1 items-center justify-start text-xs font-medium lg:text-sm 3xl:text-base'>
                          {SEMESTER_OPTIONS.find((x) => x.value === exam.semester)?.label}
                        </td>
                        <td className='flex flex-1 items-center justify-start text-xs font-medium lg:text-sm 3xl:text-base'>
                          {EXAM_TYPE_OPTIONS.find((x) => x.value === exam.type)?.label}
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

export default ExamList;
