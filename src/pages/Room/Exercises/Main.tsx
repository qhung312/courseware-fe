import { useMutation, useQueries, useQuery, useQueryClient } from '@tanstack/react-query';
import { isEmpty } from 'lodash';
import { useEffect, useRef, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { ReactComponent as NoData } from '../../../assets/svgs/NoData.svg';
import { ReactComponent as Tab } from '../../../assets/svgs/Tab.svg';
import { Icon } from '../../../components';
import { useWindowDimensions } from '../../../hooks';
import { Page } from '../../../layout';
import Wrapper from '../../../layout/Wrapper';
import ChapterService from '../../../service/chapter.service';
import QuizService from '../../../service/quiz.service';
import QuizSessionService from '../../../service/quizSession.service';
import useBoundStore from '../../../store';
import { parseDuration } from '../../../utils/helper';
import RoomAside from '../RoomAside';
import './index.css';

type Option = {
  label: string;
  value: string;
  isChoosing: boolean;
  index: number;
};

const Main: React.FC = () => {
  const subjects = useBoundStore.use.subjects();
  const params = useParams();
  const { width } = useWindowDimensions();
  const id = params?.subjectId ?? '';
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [chapterOption, setChapterOption] = useState<Option[]>([]);
  const [isOpenChapter, setIsOpenChapter] = useState(false);
  const [chapterFilterList, setChapterFilterList] = useState<Option[]>([]);
  const chapterFilterRef = useRef<HTMLDivElement>(null);

  const onCheckChapter = (index: number) => {
    let chapterList = chapterOption;
    chapterList[index].isChoosing = !chapterList[index].isChoosing;
    console.log(chapterList);
    setChapterOption(chapterList);
    setChapterFilterList(chapterOption.filter((chapter) => chapter.isChoosing));
  };

  const onDeleteChapter = () => {
    setChapterFilterList([]);
    let chapterList = chapterOption.map((chapter) => ({
      label: chapter.label,
      value: chapter.value,
      isChoosing: false,
      index: chapter.index,
    }));
    console.log(chapterList);
    setChapterOption(chapterList);
  };

  const { data: quizzes, isFetching: isFetchingQuizzes } = useQuery({
    enabled: !!params?.subjectId,
    queryKey: ['quizzes', params.subjectId as string, chapterFilterList],
    queryFn: async ({ queryKey }) => {
      const [, subjectId, chapterList] = queryKey;
      const { data } = await QuizService.getAll({
        subject: subjectId as string,
        chapter: encodeURIComponent(
          (chapterList as Option[]).map((chapter) => chapter.value).join(',')
        ),
      });
      return data.payload.result;
    },
    refetchOnWindowFocus: true,
  });

  const sessionQueriesResult = useQueries({
    queries: quizzes
      ? quizzes.map((quiz) => ({
          queryKey: ['session', quiz._id],
          queryFn: async ({ queryKey }: { queryKey: string[] }) => {
            const [, quizId] = queryKey;
            const { data } = await QuizSessionService.getByQuizId(quizId);
            return data.payload;
          },
        }))
      : [],
  });

  const sessionMutation = useMutation({
    mutationFn: QuizSessionService.create,
    onSuccess: (_data, variables) => {
      toast.success('Bắt đầu làm bài');
      queryClient.invalidateQueries({ queryKey: ['session', variables] });
    },
    onError: () => {
      toast.error('Không thể bắt đầu làm bài');
    },
  });

  const subject = params?.subjectId
    ? subjects.find((subj) => subj._id === params.subjectId)
    : undefined;

  useEffect(() => {
    // update options for chapter when the selected subject changes
    if (id === '') {
      setChapterOption([]);
      return;
    }

    ChapterService.getAll({ subject: id }, true)
      .then((res) => {
        const { result: chapters } = res.data.payload;
        setChapterOption(
          chapters.map((chap, index) => ({
            value: chap._id,
            label: chap.name,
            isChoosing: false,
            index,
          }))
        );
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  }, [id]);

  useEffect(() => {
    const closeOutline = (event: MouseEvent) => {
      if (chapterFilterRef.current && !chapterFilterRef.current.contains(event.target as Node)) {
        setIsOpenChapter(false);
      }
    };
    if (isOpenChapter) {
      setTimeout(() => {
        window.addEventListener('click', closeOutline);
      }, 0);
      return () => window.removeEventListener('click', closeOutline);
    }
  }, [isOpenChapter]);

  if (!params?.subjectId) {
    return (
      <Page title='Phòng thi'>
        <RoomAside title='Bài tập rèn luyện' baseRoute='/room/exercises' />

        {/* Add space */}
        <Wrapper className='flex flex-1 flex-col'>
          <div className='flex flex-col px-5 py-4 md:px-8 md:py-6 lg:px-10 lg:py-8 xl:px-12 2xl:px-14 2xl:py-10'>
            <div className='flex w-full justify-start'>
              <h1 className='text-2xl font-bold text-[#4285F4] md:text-[#2F327D] lg:text-2xl 2xl:text-3xl'>
                Bài tập rèn luyện
              </h1>
            </div>
            <div className='mb-6 flex-1 space-y-4 px-6 pt-4 lg:space-y-6 lg:px-7 lg:pt-5 3xl:space-y-8 3xl:px-8 3xl:pt-6'>
              <div className='z-10 rounded-lg bg-white px-4 py-3 lg:p-5 3xl:p-7'>
                <Tab className='mx-auto w-[200px] p-7 xl:w-[300px]' />
                <p className='w-full text-center'>Chọn một môn học</p>
              </div>
            </div>
          </div>
        </Wrapper>
      </Page>
    );
  }

  return (
    <Page title={`Bài tập rèn luyện ${subject?.name}`}>
      <RoomAside title='Phòng thi' subTitle='Bài tập rèn luyện' baseRoute='/room/exercises' />

      <Wrapper className='with-nav-height flex flex-1 flex-col'>
        <div className='flex flex-col gap-y-4 px-5 py-5 md:gap-y-6 md:px-8 md:py-7 lg:gap-y-7 lg:px-10 lg:py-8 xl:gap-y-8 xl:px-12 xl:py-9 2xl:gap-y-9 2xl:px-14 2xl:py-10'>
          <div className='flex w-full items-start md:hidden'>
            <Link
              to='/room/exercises'
              className='flex items-center space-x-2 rounded-lg bg-[#4285F4] px-2 py-1 text-white hover:bg-[#2571eb] hover:underline'
            >
              <Icon.ChevronLeft className='aspect-square w-2 fill-white md:w-3' />
              <p className='whitespace-nowrap text-[16px] text-inherit md:text-sm lg:text-[16px] 2xl:text-[18px]'>
                Quay lại
              </p>
            </Link>
          </div>
          {/* Banner */}
          <div className='flex w-full flex-col items-start justify-start'>
            <h1 className='text-2xl font-bold text-[#4285F4] md:text-[#2F327D] lg:text-2xl 2xl:text-3xl'>
              Bài tập rèn luyện
            </h1>
            <h2 className='block text-xl font-normal text-[#252641] md:hidden'>
              Môn học: {subject?.name}
            </h2>
          </div>
          <div className='flex w-full flex-col items-start justify-center gap-y-5'>
            <div
              className={`relative flex w-full flex-col rounded-lg border-[1px] border-[#4285F4]/30 transition-all duration-300 ease-out md:w-fit md:border-[#4285F4] ${
                isOpenChapter
                  ? 'bg-transparent text-[#4285F4] md:rounded-b-none md:border-b-0 md:bg-[#4285F4] md:text-white'
                  : 'border-[#4285F4]/30 bg-transparent text-[#252641]'
              }' `}
            >
              <button
                onClick={() => setIsOpenChapter(!isOpenChapter)}
                className={`flex flex-row items-center justify-between px-4 py-4 text-inherit md:justify-center md:gap-x-12 md:py-2 lg:gap-x-16 xl:gap-x-20 2xl:gap-x-24`}
              >
                <div className='flex flex-row items-center justify-center gap-x-5 text-inherit md:gap-x-3 xl:gap-x-4'>
                  {width > 768 || isOpenChapter ? (
                    <Icon.OriginIcon
                      className={`fill-[#4285F4]/87 md:fill-[#252641]/87 z-[1] aspect-square w-5 md:w-4 2xl:w-5 ${
                        isOpenChapter ? 'fill-[#4285F4] md:fill-white' : 'fill-[#252641]'
                      }`}
                    />
                  ) : (
                    <Icon.FilterIcon
                      className={`fill-[#4285F4]/87 md:fill-[#252641]/87 z-[1] aspect-square w-5 md:w-4 2xl:w-5 ${
                        isOpenChapter ? 'fill-[#4285F4] md:fill-white' : 'fill-[#252641]'
                      }`}
                    />
                  )}
                  <p
                    className={`text-xl text-inherit md:text-sm lg:text-[16px] 2xl:text-[18px] ${
                      isOpenChapter ? 'md:text-white' : ''
                    }
                  }`}
                  >
                    Theo chương
                  </p>
                </div>
                <Icon.ChevronUp
                  className={`aspect-[1/2] h-4 transition-all duration-300 ${
                    isOpenChapter ? 'fill-[#4285F4] md:fill-white' : 'rotate-180 fill-[#252641]'
                  }`}
                />
              </button>
              <div className={`h-fit w-full px-4 ${isOpenChapter ? 'block md:hidden' : 'hidden'}`}>
                <div className='h-[1px] w-full bg-[#4285F4]/30' />
              </div>
              <div
                ref={chapterFilterRef}
                className={`relative z-[11] w-full flex-col items-start gap-y-1 rounded-b-lg border-0 border-[#4285F4] bg-white py-3 px-4 text-[#252641] shadow-lg transition-all duration-700 ease-out md:absolute md:top-[100%] md:left-[-1px] md:w-[calc(100%+2px)] md:border-x-[1px] md:border-b-[1px] md:px-6 ${
                  isOpenChapter && chapterOption.length > 0 ? 'flex' : 'hidden'
                }`}
              >
                {chapterOption.map((chapter, index) => (
                  <button
                    className='flex w-full flex-row items-center justify-start gap-x-2 md:gap-x-3'
                    key={chapter.value}
                    onClick={() => onCheckChapter(index)}
                  >
                    <input
                      type='checkbox'
                      className='allow-checked'
                      checked={chapter.isChoosing}
                      readOnly
                    />
                    <p className='text-start text-[18px] text-inherit md:text-[16px] lg:text-[18px]'>
                      {chapter.label}
                    </p>
                  </button>
                ))}
              </div>
            </div>
            <div className='hidden gap-4 md:flex md:flex-row'>
              <h3 className='text-xl md:text-lg lg:text-xl 2xl:text-[22px]'>
                {quizzes?.length ?? 0} Kết quả
              </h3>
              {chapterFilterList.length > 0 && (
                <div className='flex flex-col gap-4 md:flex-row'>
                  <div className='flex flex-wrap gap-2'>
                    {chapterFilterList.map((chapter) => (
                      <div
                        className='flex flex-row items-center justify-center gap-x-1 rounded-lg border-[1px] border-[#252641]/50 p-1'
                        key={chapter.value}
                      >
                        <p className='text-xs lg:text-sm 3xl:text-base'>{chapter.label}</p>
                        <button
                          onClick={() => onCheckChapter(chapter.index)}
                          className='flex items-center justify-center'
                        >
                          <Icon.CloseIcon className='aspect-square h-4 fill-[#DB4437]/90' />
                        </button>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={onDeleteChapter}
                    className='text-xl text-[#252641] underline md:text-sm lg:text-[16px] 2xl:text-[18px]'
                  >
                    Xóa tất cả
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className='mb-6 flex-1 space-y-4 py-5 lg:space-y-3 lg:py-3 3xl:space-y-4 3xl:py-4'>
            {/* Chapters */}
            <div className='space-y-2 md:space-y-4 lg:space-y-5 xl:space-y-6 2xl:space-y-7'>
              {isFetchingQuizzes ? (
                <Skeleton
                  count={4}
                  baseColor='#9DCCFF'
                  height={200}
                  className='mb-2 md:mb-4 lg:mb-5 xl:mb-6 2xl:mb-7'
                />
              ) : quizzes?.length === 0 ? (
                <div className='z-10 rounded-[20px] bg-white px-4 py-3 md:p-5 xl:p-6 2xl:p-7'>
                  <NoData width={200} className='mx-auto w-[200px] p-7 xl:w-[300px]' />
                  <p className='w-full text-center'>Không tìm thấy bài tập</p>
                </div>
              ) : (
                quizzes?.map((quiz, index) => (
                  <div
                    key={`${quiz.name}-${index}`}
                    className='flex flex-col rounded-lg border-[1px] border-[#dadce0] bg-white p-3 md:p-4 lg:p-6 3xl:p-8'
                  >
                    <h4 className='mb-4 text-lg font-semibold md:font-normal lg:text-xl 3xl:text-2xl'>
                      {quiz.name}
                    </h4>
                    <div className='flex flex-col gap-y-4 md:flex-col-reverse'>
                      <div className='flex flex-row items-center justify-between'>
                        <div className='flex h-fit flex-1 flex-row flex-wrap items-center justify-start gap-x-2 gap-y-2 md:w-fit md:flex-none lg:gap-x-4 3xl:gap-x-6'>
                          <div className='hidden flex-1 flex-row items-center gap-x-1 md:flex'>
                            <Icon.Exercise className='h-4 w-auto lg:h-5 3xl:h-6' fill='#666' />
                            <p className='whitespace-nowrap text-xs text-[#666] lg:text-sm 3xl:text-base'>
                              {quiz.chapter.name}
                            </p>
                          </div>
                          <span className='mx-1 hidden h-6 w-0 border-l-2 md:block' />
                          <div className='flex flex-1 flex-row items-center gap-x-1'>
                            <Icon.Clock className='h-4 w-auto lg:h-5 3xl:h-6' fill='#666' />
                            <p className='whitespace-nowrap text-xs text-[#666] lg:text-sm 3xl:text-base'>
                              {parseDuration(quiz.duration)}
                            </p>
                          </div>
                          <div className='flex flex-1 flex-row items-center gap-x-1'>
                            <Icon.List className='h-4 w-auto lg:h-5 3xl:h-6' fill='#666' />
                            <p className='whitespace-nowrap text-xs text-[#666] lg:text-sm 3xl:text-base'>
                              {`${quiz.sampleSize} câu`}
                            </p>
                          </div>
                        </div>
                        <button
                          className='hidden rounded-lg bg-[#4285F4]/80 px-7 py-2 hover:bg-[#4285F4] md:flex'
                          disabled={sessionMutation.isLoading}
                          onClick={() => {
                            sessionQueriesResult[index]?.data === null
                              ? sessionMutation.mutate(quiz._id, {
                                  onSuccess: ({ data }, variables) => {
                                    navigate(
                                      `/room/exercises/${subject?._id}/quiz/${variables}/session/${data.payload._id}`
                                    );
                                    localStorage.removeItem(`quiz-${variables}-starList`);
                                  },
                                })
                              : navigate(
                                  `/room/exercises/${subject?._id}/quiz/${quiz._id}/session/${sessionQueriesResult[index]?.data?._id}`
                                );
                          }}
                        >
                          <p className='text-xs text-white lg:text-sm 3xl:text-base'>
                            {sessionQueriesResult[index]?.isFetching ? (
                              <Skeleton baseColor='#' />
                            ) : sessionQueriesResult[index]?.data !== null ? (
                              'Tiếp tục làm bài'
                            ) : (
                              'Làm bài'
                            )}
                          </p>
                        </button>
                      </div>
                      <div className='w-full rounded-lg bg-[#9DCCFF]/20 p-2 lg:p-4 3xl:p-6'>
                        <p className='text-justify text-[#666]'>
                          {isEmpty(quiz.description) ? 'Không có chú thích' : quiz.description}
                        </p>
                      </div>
                      <button
                        className='flex w-fit rounded-lg bg-[#4285F4]/80 px-7 py-2 hover:bg-[#4285F4] md:hidden'
                        disabled={sessionMutation.isLoading}
                        onClick={() => {
                          sessionQueriesResult[index]?.data === null
                            ? sessionMutation.mutate(quiz._id, {
                                onSuccess: ({ data }, variables) => {
                                  navigate(
                                    `/room/exercises/${subject?._id}/quiz/${variables}/session/${data.payload._id}`
                                  );
                                  localStorage.removeItem(`quiz-${variables}-starList`);
                                },
                              })
                            : navigate(
                                `/room/exercises/${subject?._id}/quiz/${quiz._id}/session/${sessionQueriesResult[index]?.data?._id}`
                              );
                        }}
                      >
                        <p className='text-xs text-white lg:text-sm 3xl:text-base'>
                          {sessionQueriesResult[index]?.isFetching ? (
                            <Skeleton baseColor='#' />
                          ) : sessionQueriesResult[index]?.data !== null ? (
                            'Tiếp tục làm bài'
                          ) : (
                            'Làm bài'
                          )}
                        </p>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </Wrapper>
    </Page>
  );
};

export default Main;
