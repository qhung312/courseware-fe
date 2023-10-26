import { useEffect, useRef, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Link, useNavigate } from 'react-router-dom';

import { Icon, Pagination, Select } from '../../../components';
import { Option } from '../../../components/Select';
import { useDebounce } from '../../../hooks';
import { Page, Wrapper } from '../../../layout';
import ChapterService from '../../../service/chapter.service';
import MaterialService from '../../../service/material.service';
import SubjectService from '../../../service/subject.service';
import { Material } from '../../../types';

const ITEMS_PER_PAGE = 10;

const MaterialList = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [filterName, setFilterName] = useState('');
  const [filterSubject, setFilterSubject] = useState('');
  const [filterChapter, setFilterChapter] = useState('');

  const [filterChapterOptions, setFilterChapterOptions] = useState<Option[]>([]);
  const [filterSubjectOptions, setFilterSubjectOptions] = useState<Option[]>([]);

  const [materials, setMaterials] = useState<Material[]>([]);
  const [totalCount, setTotalCount] = useState(1);
  const [page, setPage] = useState(1);

  const tableRef = useRef<HTMLDivElement>(null);

  const fetchMaterial = useDebounce(() => {
    setLoading(true);
    MaterialService.getAllPaginated({
      name: filterName,
      subject: filterSubject === '' ? undefined : filterSubject,
      chapter: filterChapter === '' ? undefined : filterChapter,
      pageNumber: page,
      pageSize: ITEMS_PER_PAGE,
    })
      .then((res) => {
        const { total, result: allMaterials } = res.data.payload;
        setMaterials(allMaterials);
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
    fetchMaterial();
  }, [page, filterName, filterSubject, filterChapter, fetchMaterial]);

  useEffect(() => {
    // fetch subjects on first load
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
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    // fetch all chapters when the selected subject changes
    if (filterSubject === '') {
      setFilterChapterOptions([]);
      setFilterChapter('');
      return;
    }

    ChapterService.getAll({ subject: filterSubject })
      .then((res) => {
        const { result: allChapters } = res.data.payload;
        setFilterChapterOptions(
          allChapters.map((chapter) => {
            return {
              value: chapter._id,
              label: chapter.name,
            };
          })
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }, [filterSubject]);

  return (
    <Page>
      <Wrapper className='flex flex-1 flex-col'>
        <div className='w-full bg-[#4285F4]/90 py-4'>
          <p className='text-center text-sm font-bold text-white md:text-2xl 3xl:text-4xl'>
            Danh sách tài liệu
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
                <div className='relative flex w-full flex-1 items-center'>
                  <input
                    className='flex flex-1 rounded-lg border border-[#CCC] p-1 text-xs font-medium
                    lg:p-3 lg:text-sm 3xl:p-5 3xl:text-base'
                    value={filterName}
                    onChange={({ target }) => {
                      setFilterName(target.value);
                      setPage(1);
                    }}
                    placeholder='Tìm tên tài liệu'
                  />
                </div>
                <div className='flex w-full flex-[2] flex-row gap-x-4'>
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
                    options={filterChapterOptions}
                    onChange={(v) => {
                      if (v !== null) {
                        setFilterChapter(v.value);
                        setPage(1);
                      }
                    }}
                    value={filterChapterOptions.find((x) => x.value === filterChapter) ?? null}
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
                    setPage(1);
                  }}
                >
                  <p className='text-xs lg:text-sm 3xl:text-base'>Xoá bộ lọc</p>
                </button>
              </div>
              <div ref={tableRef} className='w-full overflow-auto'>
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
                    <table className='flex w-full min-w-[900px] table-fixed flex-col gap-y-3 overflow-auto'>
                      <thead>
                        <tr className='flex w-full flex-1 items-center justify-start gap-x-4 px-6 lg:px-8 3xl:px-10'>
                          <th className='flex flex-[3] items-center justify-start text-base font-semibold text-[#4285f4] lg:text-lg 3xl:text-xl'>
                            Tên tài liệu
                          </th>
                          <th className='flex flex-[1.5] items-center justify-start text-base font-semibold text-[#4285f4] lg:text-lg 3xl:text-xl'>
                            Môn
                          </th>
                          <th className='flex flex-[2.5] items-center justify-start text-base font-semibold text-[#4285f4] lg:text-lg 3xl:text-xl'>
                            Chương
                          </th>
                          <th className='flex flex-[2] items-center justify-start text-base font-semibold text-[#4285f4] lg:text-lg 3xl:text-xl'>
                            {''}
                          </th>
                        </tr>
                      </thead>
                      <tbody className='w-full'>
                        {materials.map((material) => (
                          <tr
                            key={`material-${material._id}`}
                            className='flex w-full flex-1 items-center justify-start gap-x-4 border-b border-b-[#CCC] p-2 px-6 lg:p-4 lg:px-8 3xl:p-6 3xl:px-10'
                          >
                            <td className='flex flex-[3] items-center justify-start text-xs font-medium lg:text-sm 3xl:text-base'>
                              {material.name}
                            </td>
                            <td className='flex flex-[1.5] items-center justify-start text-xs font-medium lg:text-sm 3xl:text-base'>
                              {material.subject?.name}
                            </td>
                            <td className='flex flex-[2.5] items-center justify-center text-xs font-medium lg:text-sm 3xl:text-base'>
                              {material.chapter?.name}
                            </td>
                            <td className='flex flex-[2] flex-wrap items-center justify-end gap-x-4 gap-y-2'>
                              <button
                                type='button'
                                onClick={() => navigate(`/admin/material/view/${material._id}`)}
                                className='flex items-center justify-center rounded-full bg-[#4285F4]/90 p-2'
                              >
                                <Icon.Edit
                                  fill='white'
                                  className='h-4 w-4 lg:h-5 lg:w-5 3xl:h-6 3xl:w-6'
                                />
                              </button>
                              <button
                                onClick={async () => {
                                  await MaterialService.deleteById(material._id);
                                  setMaterials(materials.filter((m) => m._id !== material._id));
                                }}
                                className='flex items-center justify-center rounded-full bg-[#DB4437]/90 p-2'
                              >
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
                  </>
                )}
              </div>
              <Pagination
                pageSize={ITEMS_PER_PAGE}
                totalCount={totalCount}
                currentPage={page}
                onPageChange={setPage}
              />
            </main>
          </div>
        </div>
      </Wrapper>
    </Page>
  );
};

export default MaterialList;
