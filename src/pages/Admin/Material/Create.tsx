import { useState } from 'react';
import { FilePond } from 'react-filepond';
import { Link } from 'react-router-dom';

import './index.css';
import { Icon, Select } from '../../../components';
import { Page, Wrapper } from '../../../layout';

type FormValue = {
  name: string;
  subject: string;
  chapter: string;
  description: string;
  files: File[];
};

const MaterialCreate = () => {
  const [value, setValue] = useState<FormValue>({
    name: '',
    subject: '',
    chapter: '',
    description: '',
    files: [],
  });

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
          <div
            className='h-full w-full rounded-lg bg-white px-8 py-2
            lg:px-10 lg:py-4 3xl:px-12 3xl:py-6'
          >
            <form className='flex flex-col gap-y-6'>
              <div className='flex w-full flex-col items-start justify-center'>
                <label className='mb-2 w-full' htmlFor='material-name'>
                  <p className='w-full text-sm font-semibold lg:text-base 3xl:text-xl'>
                    Tên tài liệu
                  </p>
                </label>
                <input
                  id='material-name'
                  className='flex w-full rounded-lg border border-[#CCC] p-1 text-xs font-medium 
                  lg:p-3 lg:text-sm 3xl:p-5 3xl:text-base'
                  value={value.name}
                  placeholder='Nhập tên tài liệu'
                  onChange={({ target }) => setValue({ ...value, name: target.value })}
                />
              </div>
              <div className='flex w-full flex-1 flex-row items-center justify-start gap-x-4'>
                <div className='flex w-full flex-1 flex-col'>
                  <p className='w-full text-sm font-semibold lg:text-base 3xl:text-xl'>Môn</p>
                  <Select
                    options={[
                      { label: 'Giải tích 1', value: 'Giải tích 1' },
                      { label: 'Giải tích 2', value: 'Giải tích 2' },
                      { label: 'Vật lý đại cương A1', value: 'Vật lý đại cương A1' },
                      { label: 'Hoá đại cương', value: 'Hoá đại cương' },
                    ]}
                    onChange={(v) => setValue({ ...value, subject: v?.value || '' })}
                    placeholder='Chọn môn'
                  />
                </div>
                <div className='flex w-full flex-1 flex-col'>
                  <p className='w-full text-sm font-semibold lg:text-base 3xl:text-xl'>Chương</p>
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
              </div>
              <div className='flex w-full flex-col items-start justify-center'>
                <label className='mb-2 w-full' htmlFor='material-description'>
                  <p className='w-full text-sm font-semibold lg:text-base 3xl:text-xl'>Chú thích</p>
                </label>
                <textarea
                  id='material-description'
                  className='flex w-full rounded-lg border border-[#CCC] p-1 text-xs
                  font-medium lg:p-3 lg:text-sm 3xl:p-5 3xl:text-base '
                  value={value.description}
                  placeholder='Nhập chú thích tài liệu'
                  rows={5}
                  onChange={({ target }) => setValue({ ...value, description: target.value })}
                />
              </div>

              <div className='flex w-full flex-col'>
                <p className='mb-2 w-full text-sm font-semibold lg:text-base 3xl:text-xl'>
                  Đăng tải tài liệu
                </p>
                <FilePond
                  files={value.files}
                  onupdatefiles={(files) => {
                    console.log(files);
                    setValue({ ...value, files: [files[0]?.file as File] });
                  }}
                  allowMultiple={false}
                  labelIdle='Kéo & Thả hoặc <span class="filepond--label-action">Chọn tài liệu</span>'
                />
              </div>
              <div className='flex w-full flex-row items-center justify-center gap-x-4'>
                <button
                  type='submit'
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                  className='flex items-center rounded-lg bg-[#4285F4] px-6 py-1 lg:px-7 lg:py-2 3xl:px-8 3xl:py-3'
                >
                  <p className='font-medium text-white'>Lưu</p>
                </button>
                <button
                  type='button'
                  className='flex items-center rounded-lg px-6 py-1 focus:outline-none 
                  lg:px-7 lg:py-2 3xl:px-8 3xl:py-3'
                  onClick={() => {
                    setValue({
                      name: '',
                      subject: '',
                      chapter: '',
                      description: '',
                      files: [],
                    });
                  }}
                >
                  <p className='font-medium text-[#DB4437]'>Huỷ</p>
                </button>
              </div>
            </form>
          </div>
        </div>
      </Wrapper>
    </Page>
  );
};

export default MaterialCreate;
