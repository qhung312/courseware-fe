import _ from 'lodash';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import './index.css';
import { Icon, Select } from '../../../components';
import { Page, Wrapper } from '../../../layout';

const materials = [
  {
    id: 1,
    subject: 'Giải tích 1',
    chapter: '1',
    name: 'Giới hạn dãy số - hàm số',
    createdAt: '20/10/2021, 18:00',
    updatedAt: '3 giờ trước',
  },
  {
    id: 2,
    subject: 'Giải tích 1',
    chapter: '2',
    name: 'Đạo hàm - ứng dụng',
    createdAt: '20/10/2021, 18:00',
    updatedAt: '20/02/2023, 18:00',
  },
  {
    id: 3,
    subject: 'Giải tích 1',
    chapter: '3',
    name: 'Tích phân - ứng dụng',
    createdAt: '20/10/2021, 18:00',
    updatedAt: '20/02/2023, 18:00',
  },
  {
    id: 4,
    subject: 'Giải tích 1',
    chapter: '4',
    name: 'Phương trình vi phân',
    createdAt: '20/10/2021, 18:00',
    updatedAt: '20/02/2023, 18:00',
  },
  {
    id: 5,
    subject: 'Giải tích 2',
    chapter: '1',
    name: 'Giới hạn dãy số - hàm số',
    createdAt: '20/10/2021, 18:00',
    updatedAt: '20/02/2023, 18:00',
  },
  {
    id: 6,
    subject: 'Giải tích 2',
    chapter: '1',
    name: 'Giới hạn dãy số - hàm số',
    createdAt: '20/10/2021, 18:00',
    updatedAt: '20/02/2023, 18:00',
  },
];

type SearchFormValue = {
  name: string;
  subject: string;
  chapter: string;
};

const MaterialList = () => {
  const [page, setPage] = useState(1);
  const [chunks, setChunks] = useState(_.chunk(materials, 10));
  const [value, setValue] = useState<SearchFormValue>({
    name: '',
    subject: '',
    chapter: '',
  });

  useEffect(() => {
    const newMaterials = materials.filter((material) => {
      let result = true;
      if (value.name !== '' && !material.name.toLowerCase().includes(value.name.toLowerCase())) {
        result = false;
      }
      if (
        value.subject !== '' &&
        !material.subject.toLowerCase().includes(value.subject.toLowerCase())
      ) {
        result = false;
      }
      if (
        value.chapter !== '' &&
        !material.chapter.toLowerCase().includes(value.chapter.toLowerCase())
      ) {
        result = false;
      }

      return result;
    });

    setChunks(_.chunk(newMaterials, 10));
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
          <div className='h-full w-full rounded-lg bg-white p-4 lg:p-6 3xl:p-8'>
            <main className='flex flex-col'>
              <div className='mb-8 flex flex-1 flex-col items-center justify-between gap-x-4 gap-y-4 px-6 md:flex-row lg:px-8 3xl:px-10'>
                <div className='relative flex w-full flex-1 items-center'>
                  <input
                    className='flex flex-1 rounded-lg border border-[#CCC] p-1 text-xs font-medium 
                    lg:p-3 lg:text-sm 3xl:p-5 3xl:text-base'
                    value={value.name || ''}
                    onChange={({ target }) => setValue({ ...value, name: target.value })}
                    placeholder='Tìm tên tài liệu'
                  />
                </div>
                <div className='flex w-full flex-1 flex-row gap-x-4'>
                  <Select
                    options={[
                      { label: 'Giải tích 1', value: 'Giải tích 1' },
                      { label: 'Giải tích 2', value: 'Giải tích 2' },
                      { label: 'Vật lý đại cương A1', value: 'Vật lý đại cương A1' },
                      { label: 'Hoá đại cương', value: 'Hoá đại cương' },
                    ]}
                    value={
                      value.subject === '' ? null : { label: value.subject, value: value.subject }
                    }
                    onChange={(v) => setValue({ ...value, subject: v?.value || '' })}
                    placeholder='Chọn môn'
                  />
                  <Select
                    options={[
                      { label: 'Chương 1', value: '1' },
                      { label: 'Chương 2', value: '2' },
                      { label: 'Chương 3', value: '3' },
                    ]}
                    onChange={(v) => setValue({ ...value, chapter: v?.value || '' })}
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
              <div className='mb-5 flex flex-1 flex-shrink-0 flex-row gap-x-4 px-6 lg:px-8 3xl:px-10'>
                <p className='flex flex-[2.5] text-base font-semibold text-[#4285f4] lg:text-lg 3xl:text-xl'>
                  Tên
                </p>
                <p className='flex flex-[2] text-base font-semibold text-[#4285F4] lg:text-lg 3xl:text-xl'>
                  Môn
                </p>
                <p className='flex flex-[1.2] text-base font-semibold text-[#4285F4] lg:text-lg 3xl:text-xl'>
                  Chương
                </p>
                <p className='flex flex-[1.5] text-base font-semibold text-[#4285F4] lg:text-lg 3xl:text-xl'>
                  Thời gian tạo
                </p>
                <p className='flex flex-[1.5] text-base font-semibold text-[#4285F4] lg:text-lg 3xl:text-xl'>
                  Thời gian cập nhật
                </p>
                <div className='flex flex-1' />
              </div>
              {chunks[page - 1]?.map((material) => (
                <div
                  key={material.id}
                  className='flex flex-1 flex-shrink-0 flex-row items-center gap-x-4 border-b border-b-[#CCC]/60 
                  px-6 py-2 lg:py-4 lg:px-8 3xl:py-6 3xl:px-10'
                >
                  <p className='flex flex-[2.5] text-xs font-medium lg:text-sm 3xl:text-base'>
                    {material.name}
                  </p>
                  <p className='flex flex-[2] text-xs font-medium lg:text-sm 3xl:text-base'>
                    {material.subject}
                  </p>
                  <p className='flex flex-[1.2] text-xs font-medium lg:text-sm 3xl:text-base'>
                    Chương {material.chapter}
                  </p>
                  <p className='flex flex-[1.5] text-xs font-medium lg:text-sm 3xl:text-base'>
                    {material.createdAt}
                  </p>
                  <p className='flex flex-[1.5] text-xs font-medium lg:text-sm 3xl:text-base'>
                    {material.updatedAt}
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
              <Select
                options={[
                  { label: 'Chương 1', value: '1' },
                  { label: 'Chương 2', value: '2' },
                  { label: 'Chương 3', value: '3' },
                ]}
                onChange={(v) => setValue({ ...value, chapter: v?.value || '' })}
                placeholder='Chọn chương'
              />
            </main>
          </div>
        </div>
      </Wrapper>
    </Page>
  );
};

export default MaterialList;
