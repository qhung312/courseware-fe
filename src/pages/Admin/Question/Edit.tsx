import React, { useCallback, useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Link, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import { Icon, Select } from '../../../components';
import { Option } from '../../../components/Select';
import { useDebounce } from '../../../hooks';
import { Page, Wrapper } from '../../../layout';
import './index.css';
import ChapterService from '../../../service/chapter.service';
import QuestionService from '../../../service/question.service';
import SubjectService from '../../../service/subject.service';
import { Question } from '../../../types';

const EditQuestionPage = () => {
  const params = useParams();
  const id = params?.questionid ?? '';
  const [question, setQuestion] = useState<Question>();
  const [chapterOptions, setChapterOptions] = useState<Option[]>([]);
  const [subjectOptions, setSubjectOptions] = useState<Option[]>([]);

  // Variable use to save edition of user
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [chapter, setChapter] = useState('');
  const [description, setDescription] = useState('');
  const [code, setCode] = useState('');
  const [options, setOptions] = useState<string[]>([]);
  const [answerKey, setAnswerKey] = useState(0);
  const [shuffleOptions, setShuffleOptions] = useState(false);
  const [explanation, setExplanation] = useState('');

  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(() => {
    setLoading(true);
    QuestionService.getById(id, true)
      .then((res) => {
        setQuestion(res.data.payload);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const handleOnSave = useDebounce(() => {
    const data = {
      name,
      chapter,
      subject,
      description,
      code,
      options,
      answerKeys: [answerKey],
      shuffleOptions,
      explanation,
    };
    console.log('Answer key: ', answerKey);
    QuestionService.edit(id, data, true)
      .then(() => {
        toast.success('Chỉnh sửa thành công');
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      })
      .finally(() => fetchData());
  });

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (question) {
      setName(question.name);
      setSubject(question.subject._id);
      setChapter(question.chapter._id);
      setDescription(question.description ?? '');
      setCode(question.code ?? '');
      setOptions(question?.options?.map((option) => option.description) ?? []);
      setAnswerKey(question?.answerKeys?.[0] ?? 0);
      setShuffleOptions(question?.shuffleOptions ?? false);
      setExplanation(question.explanation);
    }
  }, [question]);

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
            Chỉnh sửa câu hỏi
          </p>
        </div>
        <div className='w-full p-4'>
          <div className='w-full rounded-lg bg-white p-4 pb-8 lg:p-6 3xl:p-8'>
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
              <main className='flex flex-col gap-y-4'>
                <Link
                  to='/admin/questions/manage'
                  className='text-semibold mb-3 flex h-fit w-fit gap-x-2 rounded-xl bg-[#4285f4]/[.6] px-2 py-1 text-white hover:bg-[#4285f4]/[.8] lg:text-[18px] 3xl:text-2xl'
                >
                  <Icon.ChevronLeft fill='white' className='w-2 3xl:w-3' />
                  Quay lại
                </Link>
                <div className='flex flex-col gap-y-1'>
                  <label
                    className='flex flex-[2.5] text-base lg:text-lg 3xl:text-xl'
                    htmlFor='question_name'
                  >
                    Tên
                  </label>
                  <input
                    id='question_name'
                    className='flex w-full flex-1 rounded-lg border border-[#D9D9D9] p-1 text-xs font-medium lg:p-3 lg:text-sm 3xl:p-5 3xl:text-base'
                    value={name}
                    placeholder={'Nhập tên câu hỏi'}
                    onChange={({ target }) => setName(target.value)}
                  />
                </div>
                <div className='flex flex-row gap-x-8'>
                  <div className='flex w-full flex-col gap-y-1'>
                    <p className='flex flex-[2.5] text-base lg:text-lg 3xl:text-xl'>Môn</p>
                    <Select
                      options={subjectOptions}
                      placeholder='Chọn môn'
                      value={subjectOptions.find((x) => x.value === subject)}
                      onChange={(v) => {
                        if (v !== null) {
                          setSubject(v?.value);
                        }
                      }}
                    />
                  </div>
                  <div className='flex w-full flex-col'>
                    <p className='flex flex-[2.5] text-base lg:text-lg 3xl:text-xl'>Chương</p>
                    <Select
                      options={chapterOptions}
                      placeholder='Chọn chương'
                      value={chapterOptions.find((x) => x.value === chapter)}
                      onChange={(v) => {
                        if (v !== null) {
                          setChapter(v.value);
                        }
                      }}
                    />
                  </div>
                </div>
                <div className='flex flex-col gap-y-1'>
                  <label
                    className='flex flex-[2.5] text-base lg:text-lg 3xl:text-xl'
                    htmlFor='description'
                  >
                    Đề
                  </label>
                  <textarea
                    id='description'
                    rows={10}
                    className='flex w-full flex-1 rounded-lg border border-[#D9D9D9] p-1 text-xs font-medium lg:p-3 lg:text-sm 3xl:p-5 3xl:text-base'
                    value={description}
                    placeholder={'Nhập đề'}
                    onChange={({ target }) => {
                      setDescription(target.value);
                    }}
                  />
                </div>
                <div className='flex flex-col gap-y-1'>
                  <label
                    className='flex flex-[2.5] text-base lg:text-lg 3xl:text-xl'
                    htmlFor='code'
                  >
                    Biểu thức
                  </label>
                  <textarea
                    id='code'
                    rows={10}
                    className='flex w-full flex-1 rounded-lg border border-[#D9D9D9] p-1 text-xs font-medium lg:p-3 lg:text-sm 3xl:p-5 3xl:text-base'
                    value={code}
                    placeholder={'Nhập biểu thức'}
                    onChange={({ target }) => setCode(target.value)}
                  />
                </div>
                <div className='flex flex-col gap-y-8'>
                  <div className='flex flex-row items-center gap-x-8'>
                    <p className='flex text-base lg:text-lg 3xl:text-xl'>Lựa chọn</p>
                    <button
                      className='h-9 w-36 rounded-lg bg-[#4285F4] px-4'
                      onClick={() => {
                        setOptions([...options, '']);
                      }}
                    >
                      <p className='text-white'>Thêm lựa chọn</p>
                    </button>
                  </div>
                  <div className='flex flex-col gap-y-4'>
                    {options.map((option, index) => {
                      return (
                        <div key={index} className='flex flex-row items-center gap-x-8'>
                          <label className='align-middle' htmlFor={`option_${index}`}>
                            {index + 1}
                          </label>
                          <input
                            id={`option_${index}`}
                            className='flex flex-1 rounded-lg border border-[#D9D9D9] p-1 text-xs font-medium lg:p-3 lg:text-sm 3xl:p-5 3xl:text-base'
                            value={option}
                            onChange={({ target }) => {
                              const newOptions = JSON.parse(JSON.stringify(options)) as string[];
                              newOptions[index] = target.value;
                              setOptions(newOptions);
                            }}
                          />
                          {options.length > 1 && (
                            <button
                              className='flex items-center justify-center rounded-full bg-[#DB4437]/90 p-2'
                              onClick={() => {
                                const newOptions = JSON.parse(JSON.stringify(options)) as string[];
                                newOptions.splice(index, 1);
                                setOptions(newOptions);
                                setAnswerKey(Math.min(answerKey, newOptions.length));
                              }}
                            >
                              <Icon.Delete
                                fill='white'
                                className='h-4 w-4 lg:h-5 lg:w-5 3xl:h-6 3xl:w-6'
                              />
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  <div className='flex flex-row items-center gap-x-8'>
                    <div className='flex flex-row items-center gap-x-4'>
                      <p className='flex text-base lg:text-lg 3xl:text-xl'>Đáp án đúng:</p>
                      <Select
                        options={options.map((_, index) => ({
                          value: index.toString(),
                          label: (index + 1).toString(),
                        }))}
                        value={{
                          value: answerKey.toString(),
                          label: (answerKey + 1).toString(),
                        }}
                        onChange={(v) => {
                          if (v !== null) {
                            setAnswerKey(JSON.parse(v.value));
                          }
                        }}
                      />
                    </div>
                    <div className='flex flex-row items-center gap-x-4'>
                      <p className='flex text-base lg:text-lg 3xl:text-xl'>Xáo trộn lựa chọn:</p>
                      <input
                        type='checkbox'
                        className='allow-checked h-8 w-8'
                        checked={shuffleOptions}
                        onChange={() => setShuffleOptions(!shuffleOptions)}
                      />
                    </div>
                  </div>
                </div>
                <div className='flex flex-col gap-y-1'>
                  <label
                    className='flex flex-[2.5] text-base lg:text-lg 3xl:text-xl'
                    htmlFor='explanation'
                  >
                    Giải thích
                  </label>
                  <textarea
                    id='explanation'
                    rows={10}
                    className='flex w-full flex-1 rounded-lg border border-[#D9D9D9] p-1 text-xs font-medium lg:p-3 lg:text-sm 3xl:p-5 3xl:text-base'
                    value={explanation}
                    placeholder={'Nhập giải thích cho câu hỏi'}
                    onChange={({ target }) => setExplanation(target.value)}
                  />
                </div>
                <div className='mt-4 flex flex-row-reverse gap-x-8'>
                  <button
                    className='h-9 w-36 rounded-lg bg-[#4285F4] px-4'
                    onClick={() => {
                      console.log(`Save`);
                      handleOnSave();
                    }}
                  >
                    <p className='text-white'>Lưu thay đôi</p>
                  </button>
                </div>
              </main>
            )}
          </div>
        </div>
        <ToastContainer position='bottom-right' />
      </Wrapper>
    </Page>
  );
};

export default EditQuestionPage;
