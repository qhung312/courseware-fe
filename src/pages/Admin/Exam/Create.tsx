import _ from 'lodash';
import { useRef, useState } from 'react';
import { FilePond } from 'react-filepond';
import { Link } from 'react-router-dom';

import './index.css';
import { Icon, Select } from '../../../components';
import { Page, Wrapper } from '../../../layout';

type FormValue = {
  name: string;
  subject: string;
  type: string;
  semester: string;
  description: string;
  files: File[];
};

const ExamCreate = () => {
  const [value, setValue] = useState<FormValue>({
    name: '',
    subject: '',
    type: '',
    semester: '',
    description: '',
    files: [],
  });
  const fileUploaderRef = useRef<FilePond>(null);
  const submitDisabled = _.some(value, (v) => _.isEmpty(v));

  return (
    <Page>
      <Wrapper className='flex flex-1 flex-col'>
        <div className='w-full bg-[#4285F4]/90 py-4'>
          <p className='text-center text-sm font-bold text-white md:text-2xl 3xl:text-4xl'>
            Tạo đề thi
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
                <label className='mb-2 w-full' htmlFor='exam-name'>
                  <p className='w-full text-sm font-semibold lg:text-base 3xl:text-xl'>
                    Tên đề thi
                  </p>
                </label>
                <input
                  id='exam-name'
                  className='flex w-full rounded-lg border border-[#CCC] p-1 text-xs font-medium 
                  lg:p-3 lg:text-sm 3xl:p-5 3xl:text-base'
                  value={value.name}
                  placeholder='Nhập tên đề thi'
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
                    value={
                      value.subject === '' ? null : { label: value.subject, value: value.subject }
                    }
                    onChange={(v) => setValue({ ...value, subject: v?.value || '' })}
                    placeholder='Chọn môn'
                  />
                </div>
                <div className='flex w-full flex-1 flex-col'>
                  <p className='w-full text-sm font-semibold lg:text-base 3xl:text-xl'>Kì thi</p>
                  <Select
                    options={[
                      { label: 'Giữa kì', value: 'midterm' },
                      { label: 'Cuối kì', value: 'final' },
                    ]}
                    value={
                      value.type === ''
                        ? null
                        : {
                            label: value.type === 'midterm' ? 'Giữa kì' : 'Cuối kì',
                            value: value.type,
                          }
                    }
                    onChange={(v) => setValue({ ...value, type: v?.value || '' })}
                    placeholder='Chọn kì thi'
                  />
                </div>
                <div className='flex w-full flex-1 flex-col'>
                  <p className='w-full text-sm font-semibold lg:text-base 3xl:text-xl'>Học kì</p>
                  <Select
                    options={[
                      { label: '233', value: '233' },
                      { label: '232', value: '232' },
                      { label: '231', value: '231' },
                      { label: '223', value: '223' },
                      { label: '222', value: '222' },
                      { label: '221', value: '221' },
                      { label: '213', value: '213' },
                      { label: '212', value: '212' },
                      { label: '211', value: '211' },
                      { label: '203', value: '203' },
                      { label: '202', value: '202' },
                      { label: '201', value: '201' },
                    ]}
                    value={
                      value.type === ''
                        ? null
                        : {
                            label: value.semester,
                            value: value.semester,
                          }
                    }
                    onChange={(v) => setValue({ ...value, semester: v?.value || '' })}
                    placeholder='Chọn học kì'
                  />
                </div>
              </div>
              <div className='flex w-full flex-col items-start justify-center'>
                <label className='mb-2 w-full' htmlFor='exam-description'>
                  <p className='w-full text-sm font-semibold lg:text-base 3xl:text-xl'>Chú thích</p>
                </label>
                <textarea
                  id='exam-description'
                  className='flex w-full rounded-lg border border-[#CCC] p-1 text-xs
                  font-medium lg:p-3 lg:text-sm 3xl:p-5 3xl:text-base '
                  value={value.description}
                  placeholder='Nhập chú thích đề thi'
                  rows={5}
                  onChange={({ target }) => setValue({ ...value, description: target.value })}
                />
              </div>

              <div className='flex w-full flex-col'>
                <p className='mb-2 w-full text-sm font-semibold lg:text-base 3xl:text-xl'>
                  Đăng tải đề thi
                </p>
                <FilePond
                  ref={fileUploaderRef}
                  onupdatefiles={(files) => {
                    setValue((prevValue) => ({
                      ...prevValue,
                      files: files[0] ? [files[0].file as File] : [],
                    }));
                  }}
                  allowMultiple={false}
                  labelIdle='Kéo & Thả hoặc <span class="filepond--label-action">Chọn đề thi</span>'
                />
              </div>
              <div className='flex w-full flex-row items-center justify-center gap-x-4'>
                <button
                  type='submit'
                  disabled={submitDisabled}
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                  className={`flex items-center rounded-lg px-6 py-1
                  transition-all duration-200 lg:px-7 lg:py-2 3xl:px-8 3xl:py-3 ${
                    submitDisabled ? 'bg-gray-400/80' : 'bg-[#4285F4]/80 hover:bg-[#4285F4]'
                  }`}
                >
                  <p className='font-medium text-white'>Lưu</p>
                </button>
                <button
                  type='button'
                  className='flex items-center rounded-lg px-6 py-1 text-[#DB4437] 
                  transition-all duration-200 hover:bg-[#DB4437] hover:text-white 
                  focus:outline-none lg:px-7 lg:py-2 3xl:px-8 3xl:py-3'
                  onClick={() => {
                    setValue({
                      name: '',
                      subject: '',
                      type: '',
                      semester: '',
                      description: '',
                      files: [],
                    });
                    fileUploaderRef.current?.removeFiles();
                  }}
                >
                  <p className='font-medium text-inherit'>Huỷ</p>
                </button>
              </div>
            </form>
          </div>
        </div>
      </Wrapper>
    </Page>
  );
};

export default ExamCreate;
