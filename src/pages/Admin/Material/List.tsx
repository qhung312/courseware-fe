import _ from 'lodash';
import { useEffect, useRef, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Link } from 'react-router-dom';

import { Icon, Pagination, Select } from '../../../components';
import { Page, Wrapper } from '../../../layout';
import MaterialService from '../../../service/material.service';
import useBoundStore from '../../../store';
import { formatTime } from '../../../utils/helper';

import type { Material } from '../../../types/material';

type SearchFormValue = {
  name: string;
  subject: string;
  chapter: string;
};

const MaterialList = () => {
  const pageSize = 10;
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [filteredMaterials, setFilteredMaterials] = useState<Material[]>([]);
  const [value, setValue] = useState<SearchFormValue>({
    name: '',
    subject: '',
    chapter: '',
  });
  const tableRef = useRef<HTMLDivElement>(null);
  const subjects = useBoundStore.use.subjects();
  useEffect(() => {
    (async () => {
      try {
        const { data } = await MaterialService.getAll();
        setLoading(false);
        const payload = data.payload.result.sort((a, b) => {
          const aTime = a.lastUpdatedAt ? a.lastUpdatedAt : a.createdAt;
          const bTime = b.lastUpdatedAt ? b.lastUpdatedAt : b.createdAt;
          return bTime - aTime;
        });
        setMaterials(payload);
        setFilteredMaterials(payload);
      } catch (err) {
        setLoading(true);
        console.log('Error in fetching all materials', err);
      }
    })();
  }, []);

  useEffect(() => {
    setFilteredMaterials(
      materials.filter((material) => {
        let result = true;
        if (value.name !== '' && !material.name.toLowerCase().includes(value.name.toLowerCase())) {
          result = false;
        }
        if (
          value.subject !== '' &&
          !material.subject.name.toLowerCase().includes(value.subject.toLowerCase())
        ) {
          result = false;
        }
        if (
          value.chapter !== '' &&
          !material.chapter.name.toLowerCase().includes(value.chapter.toLowerCase())
        ) {
          result = false;
        }

        return result;
      })
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

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
                    value={value.name}
                    onChange={({ target }) => setValue({ ...value, name: target.value })}
                    placeholder='Tìm tên tài liệu'
                  />
                </div>
                <div className='flex w-full flex-[2] flex-row gap-x-4'>
                  <Select
                    options={subjects.map((subject) => ({
                      label: subject.name,
                      value: subject._id,
                    }))}
                    value={
                      value.subject === ''
                        ? null
                        : {
                            label: subjects.find((subject) => subject._id === value.subject)
                              ?.name as string,
                            value: value.subject,
                          }
                    }
                    onChange={(v) => setValue({ ...value, subject: v?.value || '' })}
                    placeholder='Chọn môn'
                  />
                  <Select
                    options={_.uniqBy(materials, 'chapter').map((material) => ({
                      label: `Chương ${material.chapter?.name}`,
                      value: material.chapter?.name,
                    }))}
                    onChange={(v) => setValue({ ...value, chapter: v?.value || '' })}
                    value={
                      value.chapter === ''
                        ? null
                        : { label: `Chương ${value.chapter}`, value: value.chapter }
                    }
                    placeholder='Chọn chương'
                  />
                </div>
                <button
                  className={`flex flex-[0.5] ${
                    value.name !== '' || value.subject !== '' || value.chapter !== ''
                      ? 'opacity-1'
                      : 'opacity-0'
                  }`}
                  disabled={value.name === '' && value.subject === '' && value.chapter === ''}
                  onClick={() => {
                    setValue({ name: '', subject: '', chapter: '' });
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
                          <th className='flex flex-[2.5] items-center justify-start text-base font-semibold text-[#4285f4] lg:text-lg 3xl:text-xl'>
                            Thời gian tạo
                          </th>
                          <th className='flex flex-[2.5] items-center justify-start text-base font-semibold text-[#4285f4] lg:text-lg 3xl:text-xl'>
                            Thời gian cập nhật
                          </th>
                          <th className='flex flex-[2] items-center justify-start text-base font-semibold text-[#4285f4] lg:text-lg 3xl:text-xl'>
                            {''}
                          </th>
                        </tr>
                      </thead>
                      <tbody className='w-full'>
                        {filteredMaterials
                          .slice((page - 1) * pageSize, page * pageSize)
                          .map((material) => (
                            <tr
                              key={`material-${material._id}`}
                              className='flex w-full flex-1 items-center justify-start gap-x-4 border-b border-b-[#CCC] p-2 px-6 lg:p-4 lg:px-8 3xl:p-6 3xl:px-10'
                            >
                              <td className='flex flex-[3] items-center justify-start text-xs font-medium lg:text-sm 3xl:text-base'>
                                {material.name}
                              </td>
                              <td className='flex flex-[1.5] items-center justify-start text-xs font-medium lg:text-sm 3xl:text-base'>
                                {material.subject.name}
                              </td>
                              <td className='flex flex-[2.5] items-center justify-center text-xs font-medium lg:text-sm 3xl:text-base'>
                                {material.chapter?.name}
                              </td>
                              <td className='flex flex-[2.5] items-center justify-start text-xs font-medium lg:text-sm 3xl:text-base'>
                                {formatTime(material.createdAt)}
                              </td>
                              <td className='flex flex-[2.5] items-center justify-start text-xs font-medium lg:text-sm 3xl:text-base'>
                                {formatTime(
                                  material.lastUpdatedAt
                                    ? material.lastUpdatedAt
                                    : material.createdAt
                                )}
                              </td>
                              <td className='flex flex-[2] flex-wrap items-center justify-end gap-x-4 gap-y-2'>
                                <button className='flex items-center justify-center rounded-full bg-[#4285F4]/90 p-2'>
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
                totalCount={filteredMaterials.length}
                pageSize={pageSize}
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
