import React, { ChangeEvent, useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { SingleValue } from 'react-select';
import { ToastContainer, toast } from 'react-toastify';

import { Icon, Markdown, QuestionCard, Select } from '../../../components';
import { Option } from '../../../components/Select';
import { Page, Wrapper } from '../../../layout';
import ChapterService from '../../../service/chapter.service';
// eslint-disable-next-line import/order
import QuestionService from '../../../service/question.service';
// eslint-disable-next-line import/order
import SubjectService from '../../../service/subject.service';

import './index.css';
import { ConcreteQuestion, QuestionType, QuizStatus } from '../../../types';
import { MULTIPLE_CHOICE_LABELS } from '../../../utils/helper';

const CreateQuestionPage = () => {
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [chapter, setChapter] = useState('');
  const [description, setDescription] = useState('');
  const [code, setCode] = useState('');
  const [options, setOptions] = useState(['']);
  const [answerKey, setAnswerKey] = useState(0);
  const [shuffleOptions, setShuffleOptions] = useState(false);
  const [explanation, setExplanation] = useState('');
  const [loading, setLoading] = useState(false);

  const [subjectOptions, setSubjectOptions] = useState<Option[]>([]);
  const [chapterOptions, setChapterOptions] = useState<Option[]>([]);

  const [preview, setPreview] = useState<ConcreteQuestion | null>(null);

  const createDisabled = name.trim().length === 0 || subject === '' || chapter === '';

  useEffect(() => {
    // update options for chapter when the selected subject changes
    if (subject === '') {
      setChapterOptions([]);
      setChapter('');
      return;
    }

    ChapterService.getAll({ subject: subject }, true)
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
        toast.error(err.response.data.message);
      });
  }, [subject]);

  useEffect(() => {
    // fetch subjects on first load
    SubjectService.getAll({}, true)
      .then((res) => {
        const { result: allSubjects } = res.data.payload;
        setSubjectOptions(
          allSubjects.map((sub) => ({
            value: sub._id,
            label: sub.name,
          }))
        );
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  }, []);

  const onInputName = (event: ChangeEvent<HTMLInputElement>) => setName(event.target.value);

  const onSelectSubject = (event: SingleValue<Option>) => {
    if (event !== null) {
      setSubject(event.value);
    }
  };

  const onSelectChapter = (event: SingleValue<Option>) => {
    if (event !== null) {
      setChapter(event.value);
    }
  };

  const onInputDescription = (event: ChangeEvent<HTMLTextAreaElement>) =>
    setDescription(event.target.value);

  const onInputCode = (event: ChangeEvent<HTMLTextAreaElement>) => setCode(event.target.value);

  const onAddOption = (_: React.MouseEvent<HTMLButtonElement>) => {
    const newOptions = JSON.parse(JSON.stringify(options)) as string[];
    newOptions.push('');
    setOptions(newOptions);
  };

  const onSelectAnswerKey = (event: SingleValue<Option>) => {
    if (event !== null) {
      setAnswerKey(parseInt(event.value));
    }
  };

  const onInputExplanation = (event: ChangeEvent<HTMLTextAreaElement>) =>
    setExplanation(event.target.value);

  const toggleShuffleOptions = (_: ChangeEvent<HTMLInputElement>) =>
    setShuffleOptions(!shuffleOptions);

  const previewQuestion = (_: React.MouseEvent<HTMLButtonElement>) => {
    QuestionService.preview({
      code,
      type: QuestionType.MULTIPLE_CHOICE_SINGLE_ANSWER,
      description,

      options: options,
      answerKeys: [answerKey],
      shuffleOptions,
      explanation,
    })
      .then((res) => {
        const question = res.data.payload;
        question.isCorrect = true;
        setPreview(question);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const createQuestion = (_event: React.MouseEvent<HTMLButtonElement>) => {
    setLoading(true);
    QuestionService.create({
      name,
      code,
      subject,
      chapter,
      type: QuestionType.MULTIPLE_CHOICE_SINGLE_ANSWER,

      description: description,
      options: options,
      answerKeys: [answerKey],
      shuffleOptions,

      explanation,
    })
      .then((_res) => {
        toast.success('Tạo câu hỏi thành công');
        setName('');
        setSubject('');
        setChapter('');
        setDescription('');
        setCode('');
        setOptions(['']);
        setAnswerKey(0);
        setShuffleOptions(false);
        setExplanation('');
        setPreview(null);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      })
      .finally(() => setLoading(false));
  };

  return (
    <Page>
      <Wrapper className='flex flex-1 flex-col'>
        <div className='w-full bg-[#4285F4]/90 py-4'>
          <p className='text-center text-sm font-bold text-white md:text-2xl 3xl:text-4xl'>
            Tạo câu hỏi mới
          </p>
        </div>
        <div className='w-full p-4'>
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
            <div className='w-full rounded-lg bg-white p-4 pb-8 lg:p-6 3xl:p-8'>
              <main className='flex flex-col gap-y-4'>
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
                    onChange={onInputName}
                  />
                </div>
                <div className='flex flex-row gap-x-8'>
                  <div className='flex w-full flex-col gap-y-1'>
                    <p className='flex flex-[2.5] text-base lg:text-lg 3xl:text-xl'>Môn</p>
                    <Select
                      options={subjectOptions}
                      placeholder='Chọn môn'
                      value={subjectOptions.find((x) => x.value === subject) ?? null}
                      onChange={onSelectSubject}
                    />
                  </div>
                  <div className='flex w-full flex-col'>
                    <p className='flex flex-[2.5] text-base lg:text-lg 3xl:text-xl'>Chương</p>
                    <Select
                      options={chapterOptions}
                      placeholder='Chọn chương'
                      value={chapterOptions.find((x) => x.value === chapter) ?? null}
                      onChange={onSelectChapter}
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
                    onChange={onInputDescription}
                  />
                </div>
                <div className='flex flex-col gap-y-1'>
                  <div className='flex flex-row items-center gap-x-4'>
                    <label className='flex text-base lg:text-lg 3xl:text-xl' htmlFor='code'>
                      Biểu thức
                    </label>
                    <a
                      href='https://link.gdsc.app/CTCTQuestionWritingGuide'
                      target='_blank'
                      rel='noreferrer'
                    >
                      <Icon.LiveHelpIcon
                        fill='#666666'
                        className='h-4 w-4 lg:h-5 lg:w-5 3xl:h-6 3xl:w-6'
                      />
                    </a>
                  </div>
                  <textarea
                    id='code'
                    rows={10}
                    className='flex w-full flex-1 rounded-lg border border-[#D9D9D9] p-1 text-xs font-medium lg:p-3 lg:text-sm 3xl:p-5 3xl:text-base'
                    value={code}
                    onChange={onInputCode}
                  />
                </div>
                <div className='flex flex-col gap-y-8'>
                  <div className='flex flex-row items-center gap-x-8'>
                    <p className='flex text-base lg:text-lg 3xl:text-xl'>Lựa chọn</p>
                    <button
                      className='h-9 w-36 rounded-lg bg-[#4285F4]/80 px-4 hover:bg-[#4285F4]'
                      onClick={onAddOption}
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
                              className='flex items-center justify-center rounded-full bg-[#DB4437]/90 p-2 hover:bg-[#DB4437]'
                              onClick={() => {
                                const newOptions = JSON.parse(JSON.stringify(options)) as string[];
                                newOptions.splice(index, 1);
                                setOptions(newOptions);
                                setAnswerKey(Math.min(newOptions.length - 1, answerKey));
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
                  <div className='flex w-full flex-row flex-wrap items-center gap-x-8 gap-y-4'>
                    <div className='flex w-full min-w-[200px] flex-1 flex-row items-center gap-x-4'>
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
                        onChange={onSelectAnswerKey}
                      />
                    </div>
                    <div className='flex w-full flex-[5] flex-row items-center gap-x-4'>
                      <p className='flex text-base lg:text-lg 3xl:text-xl'>Xáo trộn lựa chọn:</p>
                      <input
                        type='checkbox'
                        className='allow-checked h-8 w-8'
                        checked={shuffleOptions}
                        onChange={toggleShuffleOptions}
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
                    onChange={onInputExplanation}
                  />
                </div>
                {preview !== null && (
                  <div className='flex flex-col gap-y-1'>
                    <p className='flex flex-[2.5] text-base lg:text-lg 3xl:text-xl'>
                      Xem trước câu hỏi
                    </p>
                    <div className='flex flex-col gap-y-4'>
                      <QuestionCard
                        question={preview}
                        status={QuizStatus.ENDED}
                        questionNumber={1}
                        showInfo={false}
                      />
                      <div className='flex h-full w-full flex-row gap-x-4'>
                        <div className='flex h-full flex-1 flex-col rounded-lg border border-[#49CCCF] bg-white p-4'>
                          <h3 className='mb-2 text-xl font-semibold'>Đáp án</h3>
                          <div className='flex flex-col items-start justify-center gap-y-1'>
                            <div className='flex flex-row items-center gap-x-2'>
                              <Icon.Answer className='h-5 w-auto' fill='#49BBBD' />
                              <p className='text-base font-semibold text-[#666]'>
                                Đáp án đúng:{' '}
                                {MULTIPLE_CHOICE_LABELS.at(
                                  preview.options?.findIndex(
                                    (option) => option.key === (preview.answerKeys?.at(0) ?? 0)
                                  ) || 0
                                )}
                              </p>
                            </div>
                          </div>
                          <span className='my-4 border-t border-[#666]' />
                          <h3 className='mb-2 text-xl font-semibold'>Giải thích</h3>
                          <Markdown>{preview.explanation}</Markdown>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div className='mt-4 flex flex-row-reverse gap-x-8'>
                  <button
                    className={`items-center rounded-lg transition-all duration-200 ${
                      createDisabled ? 'bg-gray-400/80' : 'bg-[#4285F4]/80 hover:bg-[#4285F4]'
                    } px-6 py-1 lg:px-7 lg:py-2 3xl:px-8 3xl:py-3`}
                    disabled={createDisabled}
                    onClick={createQuestion}
                  >
                    <p className='text-white'>Tạo</p>
                  </button>
                  <button
                    className={`items-center rounded-lg bg-[#4285F4]/80 px-6 py-1 transition-all duration-200 hover:bg-[#4285F4] lg:px-7 lg:py-2 3xl:px-8 3xl:py-3`}
                    onClick={previewQuestion}
                  >
                    <p className='text-white'>Xem trước</p>
                  </button>
                </div>
              </main>
            </div>
          )}
        </div>
        <ToastContainer position='bottom-right' />
      </Wrapper>
    </Page>
  );
};

export default CreateQuestionPage;
