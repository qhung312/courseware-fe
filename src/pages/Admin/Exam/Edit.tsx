import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import './index.css';
import { Icon, Select } from '../../../components';
import { Option } from '../../../components/Select';
import { useDebounce } from '../../../hooks';
import { Page, Wrapper } from '../../../layout';
import SubjectService from '../../../service/subject.service';
import { EXAM_TYPE_OPTIONS, SEMESTER_OPTIONS } from '../../../types/examArchive';

const ExamEdit = () => {
  const navigate = useNavigate();
  const params = useParams();
  const currentName = params.id || '';
  const currentSubject = '6443b456e19766de19fbc588';
  const currentType = 'MIDTERM_EXAM';
  const currentSemester = 'SEMESTER_221';
  const currentDescription = 'Không có chú thích nào cả';

  const [name, setName] = useState(currentName);
  const [subject, setSubject] = useState(currentSubject);
  const [type, setType] = useState(currentType);
  const [semester, setSemester] = useState(currentSemester);
  const [description, setDescription] = useState(currentDescription);

  const [subjectOptions, setSubjectOptions] = useState<Option[]>([]);

  const [canSave, setCanSave] = useState(false);

  const setSave = useDebounce(() => {
    setCanSave(
      name === currentName &&
        subject === currentSubject &&
        type === currentType &&
        semester === currentSemester &&
        _.trim(description) === currentDescription
    );
  });

  useEffect(() => {
    setSave();
  }, [name, subject, type, semester, description, setSave]);

  useEffect(() => {
    // fetch subject on first load
    SubjectService.getAll({})
      .then((res) => {
        const { result: allSubjects } = res.data.payload;
        const formattedData = allSubjects.map((sub) => {
          return {
            value: sub._id,
            label: sub.name,
          };
        });
        console.log('>>> formattedData, ', formattedData[0]);
        setSubjectOptions(formattedData);
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
            Chỉnh sửa đề thi
          </p>
        </div>
        <div className='w-full p-4'>
          <button
            type='button'
            onClick={() => navigate(-1)}
            className='mb-2 flex items-center hover:underline'
          >
            <Icon.Chevron className='h-5 -rotate-90 fill-black' />
            <p className='text-sm text-[#5B5B5B]'>Quay lại</p>
          </button>
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
                  value={name}
                  placeholder='Nhập tên đề thi'
                  onChange={({ target }) => setName(target.value)}
                />
              </div>
              <div className='flex w-full flex-1 flex-row items-center justify-start gap-x-4'>
                <div className='flex w-full flex-1 flex-col'>
                  <p className='w-full text-sm font-semibold lg:text-base 3xl:text-xl'>Môn</p>
                  <Select
                    options={subjectOptions}
                    value={subjectOptions.find((x) => x.value === subject) ?? null}
                    onChange={(v) => {
                      if (v !== null) {
                        console.log('subject', v);
                        setSubject(v.value);
                      }
                    }}
                    placeholder='Chọn môn'
                  />
                </div>
                <div className='flex w-full flex-1 flex-col'>
                  <p className='w-full text-sm font-semibold lg:text-base 3xl:text-xl'>Kì thi</p>
                  <Select
                    options={EXAM_TYPE_OPTIONS}
                    value={EXAM_TYPE_OPTIONS.find((x) => x.value === type) ?? null}
                    onChange={(v) => {
                      if (v !== null) {
                        console.log(v.value);
                        setType(v.value);
                      }
                    }}
                    placeholder='Chọn kì thi'
                  />
                </div>
                <div className='flex w-full flex-1 flex-col'>
                  <p className='w-full text-sm font-semibold lg:text-base 3xl:text-xl'>Học kì</p>
                  <Select
                    options={SEMESTER_OPTIONS}
                    value={SEMESTER_OPTIONS.find((x) => x.value === semester) ?? null}
                    onChange={(v) => {
                      if (v !== null) {
                        console.log(v.value);
                        setSemester(v.value);
                      }
                    }}
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
                  value={description}
                  placeholder='Nhập chú thích đề thi'
                  rows={5}
                  onChange={({ target }) => {
                    setDescription(target.value);
                  }}
                />
              </div>
              <div className='flex w-full flex-row items-center justify-center gap-x-4'>
                <button
                  type='submit'
                  disabled={canSave}
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                  className={`flex items-center rounded-lg px-6 py-1
                  transition-all duration-200 lg:px-7 lg:py-2 3xl:px-8 3xl:py-3 ${
                    canSave ? 'bg-gray-400/80' : 'bg-[#4285F4]/80 hover:bg-[#4285F4]'
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
                    setName(currentName);
                    setSubject(currentSubject);
                    setType(currentType);
                    setSemester(currentSemester);
                    setDescription(currentDescription);
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

export default ExamEdit;
