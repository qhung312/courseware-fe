import _ from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Link, useParams } from 'react-router-dom';
import { SingleValue } from 'react-select';
import { ToastContainer, toast } from 'react-toastify';

import { Icon, Select } from '../../../components';
import { Option } from '../../../components/Select';
// import { useDebounce } from '../../../hooks';
import { useDebounce } from '../../../hooks';
import { Page, Wrapper } from '../../../layout';
// import ChapterService from '../../../service/chapter.service';
// import QuestionTemplateService from '../../../service/questionTemplate.service';
// import SubjectService from '../../../service/subject.service';
import ChapterService from '../../../service/chapter.service';
import QuestionService from '../../../service/question.service';
import QuizService from '../../../service/quiz.service';
import SubjectService from '../../../service/subject.service';
import { Question, Quiz } from '../../../types';

type OptionWithQuestion = Option & { question: Question };

interface CountDown {
  hour: number;
  minute: number;
  second: number;
}

const EditExercisePage = () => {
  const params = useParams();
  const id = params?.exerciseid ?? '';
  const [exercise, setExercise] = useState<Quiz>();
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [chapter, setChapter] = useState('');

  const [duration, setDuration] = useState<CountDown>({
    hour: 0,
    minute: 0,
    second: 0,
  });
  const [sampleSize, setSampleSize] = useState(0);
  const [description, setDescription] = useState('');
  const [potentialQuestions, setPotentialQuestions] = useState<Question[]>([]);

  const [filterSubject, setFilterSubject] = useState('');
  const [filterChapter, setFilterChapter] = useState('');

  const [subjectOptions, setSubjectOptions] = useState<Option[]>([]);
  const [chapterOptions, setChapterOptions] = useState<Option[]>([]);
  const [questionOptions, setQuestionOptions] = useState<Question[]>([]);
  const [filterChapterOptions, setFilterChapterOptions] = useState<Option[]>([]);

  const [loading, setLoading] = useState(false);
  const [canSave, setCanSave] = useState(false);

  const getCountDown = (time: number): CountDown => {
    time = Math.ceil(time / 1000);
    const second = time % 3600;
    const minute = Math.floor(time / 60) % 60;
    const hour = Math.floor(time / 3600);
    return { second, minute, hour };
  };

  const getTime = (countDown: CountDown): number => {
    const { hour, minute, second } = countDown;
    return 1000 * (hour * 3600 + minute * 60 + second);
  };

  const fetchQuestions = useDebounce(() => {
    setLoading(true);
    QuestionService.getAll(
      {
        subject: filterSubject === '' ? undefined : filterSubject,
        chapter: filterChapter === '' ? undefined : filterChapter,
      },
      true
    )
      .then((res) => {
        const { result: allQuestions } = res.data.payload;
        setQuestionOptions(allQuestions);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setLoading(false));
  });

  const fetchData = useCallback(() => {
    setLoading(true);
    QuizService.getById(id, true)
      .then((res) => {
        setExercise(res.data.payload);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleOnSetSave = useDebounce(() => {
    if (exercise) {
      const data1 = {
        name,
        subject,
        chapter,
        duration: getTime(duration),
        sampleSize,
        potentialQuestions: potentialQuestions,
        description,
      };
      const data2 = {
        name: exercise.name,
        subject: exercise?.subject?._id ?? '',
        chapter: exercise?.chapter?._id ?? '',
        duration: exercise.duration,
        sampleSize: exercise.sampleSize,
        potentialQuestions: exercise.potentialQuestions,
        description: exercise.description,
      };
      setCanSave(!_.isEqual(data1, data2));
    }
  });

  const handleOnSave = useDebounce(() => {
    const data = {
      name,
      subject,
      chapter,
      duration: getTime(duration),
      sampleSize,
      potentialQuestions: potentialQuestions.map((question) => question._id),
      description,
    };

    QuizService.edit(id, data)
      .then(() => toast.success('Chỉnh sửa thành công'))
      .catch((err) => toast.error(err.response.data.message))
      .finally(() => fetchData);
  });

  useEffect(() => {
    fetchQuestions();
  }, [filterSubject, filterChapter, fetchQuestions]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect((): void => {
    handleOnSetSave();
  }, [
    name,
    subject,
    chapter,
    duration,
    sampleSize,
    potentialQuestions,
    description,
    exercise,
    handleOnSetSave,
  ]);

  useEffect(() => {
    if (exercise) {
      setName(exercise.name);
      setChapter(exercise.chapter._id);
      setSubject(exercise.subject._id);
      setDescription(exercise.description);
      setDuration(getCountDown(exercise.duration));
      setSampleSize(exercise?.sampleSize ?? 0);
      setPotentialQuestions(exercise?.potentialQuestions ?? []);
    }
  }, [exercise]);

  useEffect(() => {
    SubjectService.getAll({})
      .then((res) => {
        const { result: allSubjects } = res.data.payload;
        setSubjectOptions(
          allSubjects.map((sub) => {
            return {
              value: sub._id,
              label: sub.name,
            };
          })
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    // update options for chapter when the selected subject changes
    if (subject === '') {
      setChapterOptions([]);
      setChapter('');
      return;
    }

    ChapterService.getAll({ subject: subject })
      .then((res) => {
        const { result: chapters } = res.data.payload;
        setChapterOptions(
          chapters.map((chap) => ({
            value: chap._id,
            label: chap.name,
          }))
        );
        setChapter('');
      })
      .catch((err) => {
        console.error(err);
      });
  }, [subject]);

  useEffect(() => {
    // update options for filter chapter when filter subject changes
    if (filterSubject === '') {
      setFilterChapterOptions([]);
      setFilterChapter('');
      return;
    }

    ChapterService.getAll({ subject: filterSubject })
      .then((res) => {
        const { result: allFilterChapters } = res.data.payload;
        setFilterChapterOptions(
          allFilterChapters.map((chap) => ({
            value: chap._id,
            label: chap.name,
          }))
        );
        setFilterChapter('');
      })
      .catch((err) => {
        console.error(err);
      });
  }, [filterSubject]);

  const onSelectAddQuestion = (value: SingleValue<Option>) => {
    if (value !== null) {
      const duplicate = potentialQuestions.find(
        (x) => x._id === (value as OptionWithQuestion).question._id
      );
      if (!duplicate) {
        setPotentialQuestions([...potentialQuestions, (value as OptionWithQuestion).question]);
      } else {
        toast.error('Câu hỏi đã được thêm');
      }
    }
  };

  return (
    <Page>
      <Wrapper className='flex flex-1 flex-col'>
        <div className='w-full bg-[#4285F4]/90 py-4'>
          <p className='text-center text-sm font-bold text-white md:text-2xl 3xl:text-4xl'>
            Chỉnh sửa bài tập rèn luyện
          </p>
        </div>
        <div className='w-full p-4'>
          <div className='h-full w-full rounded-lg bg-white p-4 lg:p-6 3xl:p-8'>
            <main className='flex flex-col gap-y-4'>
              <Link
                to='/admin/exercises/manage'
                className='text-semibold mb-3 flex h-fit w-fit gap-x-2 rounded-xl bg-[#4285f4]/[.6] px-2 py-1 text-white hover:bg-[#4285f4]/[.8] lg:text-[18px] 3xl:text-2xl'
              >
                <Icon.ChevronLeft fill='white' className='w-2 3xl:w-3' />
                Quay lại
              </Link>
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
                      placeholder={'Nhập tên bài tập'}
                      onChange={({ target }) => setName(target.value)}
                    />
                  </div>
                  <div className='flex flex-row gap-x-8'>
                    <div className='flex w-full flex-col gap-y-1'>
                      <p className='flex flex-[2.5] text-base lg:text-lg 3xl:text-xl'>Môn</p>
                      <Select
                        options={subjectOptions}
                        placeholder='Chọn môn'
                        value={subjectOptions.find((x) => x.value === subject) ?? null}
                        onChange={(v) => {
                          if (v !== null) {
                            setSubject(v.value);
                          }
                        }}
                      />
                    </div>
                    <div className='flex w-full flex-col gap-y-1'>
                      <p className='flex flex-[2.5] text-base lg:text-lg 3xl:text-xl'>Chương</p>
                      <Select
                        options={chapterOptions}
                        placeholder='Chọn chương'
                        className='w-80'
                        value={chapterOptions.find((x) => x.value === chapter) ?? null}
                        onChange={(v) => {
                          if (v !== null) {
                            setChapter(v.value);
                          }
                        }}
                      />
                    </div>
                    <div className='flex flex-col'>
                      <p className='flex flex-[2.5] text-base lg:text-lg 3xl:text-xl'>
                        Thời gian làm bài (hh:mm:ss)
                      </p>
                      <div className='flex justify-around'>
                        <input
                          className='flex w-[30%] rounded-lg border border-[#D9D9D9] p-1 text-center text-xs font-medium lg:p-3 lg:text-sm 3xl:p-5 3xl:text-base'
                          value={duration.hour}
                          type='number'
                          onChange={({ target }) => {
                            const time = parseInt(target.value);
                            setDuration({
                              ...duration,
                              hour: time === 24 ? 0 : time === -1 ? 23 : time,
                            });
                          }}
                        />
                        <input
                          className='flex w-[30%] rounded-lg border border-[#D9D9D9] p-1 text-center text-xs font-medium lg:p-3 lg:text-sm 3xl:p-5 3xl:text-base'
                          value={duration.minute}
                          type='number'
                          onChange={({ target }) => {
                            const time = parseInt(target.value);
                            setDuration({
                              ...duration,
                              minute: time === 60 ? 0 : time === -1 ? 59 : time,
                            });
                          }}
                        />
                        <input
                          className='flex w-[30%] rounded-lg border border-[#D9D9D9] p-1 text-center text-xs font-medium lg:p-3 lg:text-sm 3xl:p-5 3xl:text-base'
                          value={duration.second}
                          type='number'
                          onChange={({ target }) => {
                            const time = parseInt(target.value);
                            setDuration({
                              ...duration,
                              second: time === 60 ? 0 : time === -1 ? 59 : time,
                            });
                          }}
                        />
                      </div>
                    </div>
                    <div className='flex flex-col'>
                      <p className='flex flex-[2.5] text-base lg:text-lg 3xl:text-xl'>Số câu hỏi</p>
                      <input
                        className='flex w-24 flex-1 rounded-lg border border-[#D9D9D9] p-1 text-center text-xs font-medium lg:p-3 lg:text-sm 3xl:p-5 3xl:text-base'
                        value={sampleSize}
                        placeholder={'Chọn số câu hỏi'}
                        onChange={({ target }) => setSampleSize(parseInt(target.value))}
                      />
                    </div>
                  </div>
                  <div className='flex flex-col gap-y-1'>
                    <label
                      className='flex flex-[2.5] text-base lg:text-lg 3xl:text-xl'
                      htmlFor='description'
                    >
                      Chú thích
                    </label>
                    <textarea
                      id='description'
                      rows={10}
                      className='flex w-full flex-1 rounded-lg border border-[#D9D9D9] p-1 text-xs font-medium lg:p-3 lg:text-sm 3xl:p-5 3xl:text-base'
                      value={description}
                      placeholder={'Nhập chú thích cho bài tập'}
                      onChange={({ target }) => setDescription(target.value)}
                    />
                  </div>
                  <div className='flex flex-col gap-y-8'>
                    <div className='flex flex-row items-center gap-x-8'>
                      <label
                        className='flex text-base lg:text-lg 3xl:text-xl'
                        htmlFor='search_question'
                      >
                        Các câu hỏi có thể ra
                      </label>
                      <div className='flex flex-[2] flex-row items-center gap-x-8'>
                        <Select
                          options={questionOptions.map((question) => {
                            return {
                              value: question._id,
                              label: question.name,
                              question: question,
                            } as OptionWithQuestion;
                          })}
                          placeholder='Chọn câu hỏi'
                          value={null}
                          onChange={onSelectAddQuestion}
                        />
                        <Select
                          options={subjectOptions}
                          placeholder='Chọn môn'
                          value={subjectOptions.find((x) => x.value === filterSubject) ?? null}
                          onChange={(v) => {
                            if (v !== null) {
                              setFilterSubject(v.value);
                            }
                          }}
                        />
                        <Select
                          options={filterChapterOptions}
                          placeholder='Chọn chương'
                          value={
                            filterChapterOptions.find((x) => x.value === filterChapter) ?? null
                          }
                          onChange={(v) => {
                            if (v !== null) {
                              setFilterChapter(v.value);
                            }
                          }}
                        />
                        <button
                          className={`flex flex-[0.5] ${
                            filterSubject !== '' || filterChapter !== '' ? 'opacity-1' : 'opacity-0'
                          }`}
                          disabled={filterSubject !== '' && filterChapter !== ''}
                          onClick={() => {
                            setFilterSubject('');
                            setFilterChapter('');
                          }}
                        >
                          <p className='text-xs lg:text-sm 3xl:text-base'>Xoá bộ lọc</p>
                        </button>
                      </div>
                    </div>
                    <div>
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
                        <div className='flex flex-1' />
                      </div>
                      {potentialQuestions.map((question, index) => (
                        <div
                          key={question._id}
                          className='flex flex-1 flex-shrink-0 flex-row items-center gap-x-4 border-b border-b-[#CCC]/60
                      px-6 py-2 lg:py-4 lg:px-8 3xl:py-6 3xl:px-10'
                        >
                          <p className='flex flex-[2.5] text-xs font-medium lg:text-sm 3xl:text-base'>
                            {question.name}
                          </p>
                          <p className='flex flex-[2] text-xs font-medium lg:text-sm 3xl:text-base'>
                            {question?.subject?.name}
                          </p>
                          <p className='flex flex-[1.2] text-xs font-medium lg:text-sm 3xl:text-base'>
                            {question?.chapter?.name}
                          </p>
                          <p className='flex flex-[1.5] text-xs font-medium lg:text-sm 3xl:text-base'>
                            {new Date(question.createdAt).toLocaleString()}
                          </p>
                          <div className='flex flex-1 flex-wrap items-center justify-end gap-x-4 gap-y-4'>
                            <button
                              className='flex items-center justify-center rounded-full bg-[#DB4437]/90 p-2'
                              onClick={() => {
                                const newPotentialQuestions = JSON.parse(
                                  JSON.stringify(potentialQuestions)
                                ) as Question[];
                                newPotentialQuestions.splice(index, 1);
                                setPotentialQuestions(newPotentialQuestions);
                              }}
                            >
                              <Icon.Delete
                                fill='white'
                                className='h-4 w-4 lg:h-5 lg:w-5 3xl:h-6 3xl:w-6'
                              />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className='my-5 flex flex-row-reverse gap-x-8'>
                    <button
                      className={`flex items-center rounded-lg px-6 py-1
                      transition-all duration-200 lg:px-7 lg:py-2 3xl:px-8 3xl:py-3 ${
                        canSave ? 'bg-[#4285F4]/80 hover:bg-[#4285F4]' : 'bg-gray-400/80'
                      }`}
                      disabled={!canSave}
                      onClick={() => handleOnSave()}
                    >
                      <p className='text-white'>Lưu thay đổi</p>
                    </button>
                  </div>
                </>
              )}
            </main>
          </div>
        </div>
        <ToastContainer position='bottom-right' />
      </Wrapper>
    </Page>
  );
};

export default EditExercisePage;
