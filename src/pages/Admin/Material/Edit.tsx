import _ from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './index.css';
import { Icon, Select } from '../../../components';
import { Option } from '../../../components/Select';
import { useDebounce } from '../../../hooks';
import { Page, Wrapper } from '../../../layout';
import ChapterService from '../../../service/chapter.service';
import MaterialService from '../../../service/material.service';
import SubjectService from '../../../service/subject.service';
import { Material } from '../../../types';

const MaterialEdit = () => {
  const navigate = useNavigate();
  const params = useParams();
  const id = params?.id ?? '';

  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [chapter, setChapter] = useState('');
  const [description, setDescription] = useState('');

  const [subjectOptions, setSubjectOptions] = useState<Option[]>([]);
  const [chapterOptions, setChapterOptions] = useState<Option[]>([]);
  const [material, setMaterial] = useState<Material>();

  const [loading, setLoading] = useState(false);
  const [canSave, setCanSave] = useState(false);

  const fetchData = useCallback(() => {
    setLoading(true);
    MaterialService.getById(id, true)
      .then((res) => {
        setMaterial(res.data.payload);
        console.log(res.data.payload);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const setSave = useDebounce(() => {
    if (material) {
      setCanSave(
        name === material.name &&
          subject === material.subject._id &&
          chapter === (material.chapter?._id ?? '') &&
          _.trim(description) === material.description
      );
    }
  });

  const handleOnSave = useDebounce((): void => {
    const queryBody = {
      name,
      description,
      subject,
      chapter,
    };
    MaterialService.edit(name, queryBody, true)
      .then(() => {
        toast.success('Edit successfully');
      })
      .catch((err) => {
        console.error(err);
        console.log('query body: ', queryBody);
        toast.error(err.response.data.message);
      })
      .finally(() => {
        fetchData();
      });
  });

  useEffect(() => {
    setSave();
  }, [name, subject, chapter, description, setSave]);

  useEffect(() => {
    if (material) {
      setName(material.name);
      setDescription(material.description);
      setChapter(material?.chapter?._id ?? '');
      setSubject(material?.subject?._id ?? '');
    }
  }, [material]);

  useEffect(() => {
    // update options for chapter when the selected subject changes
    if (!subject) {
      setChapterOptions([]);
      setChapter('');
      return;
    }

    ChapterService.getAll({ subject })
      .then((res) => {
        const { result: chapters } = res.data.payload;
        const formattedData = chapters.map((chap) => ({
          value: chap._id,
          label: chap.name,
        }));
        console.log('formattedData', formattedData);
        setChapterOptions(formattedData);
        setChapter('');
      })
      .catch((err) => {
        console.error(err);
        toast.error(err.response.data.message);
      });
  }, [subject]);

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
        console.log('>>> formattedData, ', formattedData);
        setSubjectOptions(formattedData);
      })
      .catch((err) => {
        console.error(err);
        toast.error(err.response.data.message);
      });
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
            <div
              className='h-full w-full rounded-lg bg-white px-8 py-2
            lg:px-10 lg:py-4 3xl:px-12 3xl:py-6'
            >
              <form className='flex flex-col gap-y-6'>
                <p className='flex flex-[2.5] text-base lg:text-lg 3xl:text-xl'>
                  ID tài liệu: {id}
                </p>
                <div className='flex w-full flex-col items-start justify-center'>
                  <label className='mb-2 w-full' htmlFor='exam-name'>
                    <p className='w-full text-sm lg:text-base 3xl:text-xl'>Tên đề thi</p>
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
                    <p className='w-full text-sm lg:text-base 3xl:text-xl'>Môn</p>
                    <Select
                      options={subjectOptions}
                      value={subjectOptions.find((x) => x.value === subject) ?? null}
                      onChange={(v) => {
                        if (v !== null) {
                          console.log('subject', v);
                          setSubject(v.value);
                          console.log('subject choosing: ', subject);
                        }
                      }}
                      placeholder='Chọn môn'
                    />
                  </div>
                  <div className='flex w-full flex-1 flex-col'>
                    <p className='w-full text-sm lg:text-base 3xl:text-xl'>Chương</p>
                    <Select
                      options={chapterOptions}
                      value={chapterOptions.find((x) => x.value === chapter) ?? null}
                      onChange={(v) => {
                        if (v !== null) {
                          setChapter(v.value);
                        }
                      }}
                      placeholder='Chọn chương'
                    />
                  </div>
                </div>
                <div className='flex w-full flex-col items-start justify-center'>
                  <label className='mb-2 w-full' htmlFor='exam-description'>
                    <p className='w-full text-sm lg:text-base 3xl:text-xl'>Chú thích</p>
                  </label>
                  <textarea
                    id='exam-description'
                    className='flex w-full rounded-lg border border-[#CCC] p-1 text-xs
                  font-medium lg:p-3 lg:text-sm 3xl:p-5 3xl:text-base '
                    value={description}
                    placeholder='Nhập chú thích đề thi'
                    rows={8}
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
                      handleOnSave();
                    }}
                    className={`flex items-center rounded-lg px-6 py-1
                  transition-all duration-200 lg:px-7 lg:py-2 3xl:px-8 3xl:py-3 ${
                    canSave ? 'bg-gray-400/80' : 'bg-[#4285F4]/80 hover:bg-[#4285F4]'
                  }`}
                  >
                    <p className='font-medium text-white'>Lưu thay đổi</p>
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
        <ToastContainer position='bottom-right' />
      </Wrapper>
    </Page>
  );
};

export default MaterialEdit;
