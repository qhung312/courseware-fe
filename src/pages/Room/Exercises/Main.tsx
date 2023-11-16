import { useMutation, useQueries, useQuery, useQueryClient } from '@tanstack/react-query';
import { isEmpty } from 'lodash';
import Skeleton from 'react-loading-skeleton';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { ReactComponent as NoData } from '../../../assets/svgs/NoData.svg';
import { ReactComponent as Tab } from '../../../assets/svgs/Tab.svg';
import { Icon } from '../../../components';
import { Page } from '../../../layout';
import Wrapper from '../../../layout/Wrapper';
import QuizService from '../../../service/quiz.service';
import QuizSessionService from '../../../service/quizSession.service';
import useBoundStore from '../../../store';
import { parseDuration } from '../../../utils/helper';
import RoomAside from '../RoomAside';

const Main: React.FC = () => {
  const subjects = useBoundStore.use.subjects();
  const params = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: quizzes, isLoading: isLoadingQuizzes } = useQuery({
    enabled: !!params?.subjectId,
    queryKey: ['quizzes', params.subjectId as string],
    queryFn: async ({ queryKey }) => {
      const [, subjectId] = queryKey;
      const { data } = await QuizService.getAll({ subject: subjectId });
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

  if (!params?.subjectId) {
    return (
      <Page title='Phòng thi'>
        <RoomAside
          title='Bài tập rèn luyện'
          subTitle='Bài tập các môn học'
          baseRoute='/room/exercises'
        />

        {/* Add space */}
        <Wrapper className='flex flex-1 flex-col'>
          <div className='hidden w-full bg-[#4285F4] px-6 py-2 text-white md:flex md:flex-col md:justify-between lg:px-7 lg:py-3 3xl:px-8 3xl:py-4'>
            <h1 className='text-xl font-bold lg:text-2xl 3xl:text-3xl'>Bài tập rèn luyện</h1>
          </div>
          <div className='mb-6 flex-1 space-y-4 px-6 pt-4 lg:space-y-6 lg:px-7 lg:pt-5 3xl:space-y-8 3xl:px-8 3xl:pt-6'>
            <div className='z-10 rounded-lg bg-white px-4 py-3 lg:p-5 3xl:p-7'>
              <Tab className='mx-auto w-[200px] p-7 xl:w-[300px]' />
              <p className='w-full text-center'>Chọn một môn học</p>
            </div>
          </div>
        </Wrapper>
      </Page>
    );
  }

  return (
    <Page title={`Bài tập rèn luyện ${subject?.name}`}>
      <RoomAside title='Phòng thi' subTitle='Bài tập rèn luyện' baseRoute='/room/exercises' />

      <Wrapper className='flex flex-1 flex-col'>
        {/* Banner */}
        <div className='hidden w-full bg-[#4285F4] px-6 py-2 text-white md:flex md:flex-col md:justify-between lg:px-7 lg:py-3 3xl:px-8 3xl:py-4'>
          <h1 className='text-xl font-bold lg:text-2xl 3xl:text-3xl'>Bài tập rèn luyện</h1>
        </div>

        <div className='mb-6 flex-1 space-y-4 p-5 lg:space-y-3 lg:p-3 3xl:space-y-4 3xl:p-4'>
          <Link
            to='/room/exercises'
            className='flex items-center space-x-2 hover:underline md:hidden'
          >
            <Icon.ChevronLeft className='max-w-2 min-w-2 min-h-3 max-h-3 fill-black' />
            <p className='w-[100px]'>Quay lại</p>
          </Link>

          {/* Introduction */}
          <div className='mt-0 md:hidden'>
            <h3 className='mb-1 max-w-xs text-2xl font-semibold'>Bài tập rèn luyện</h3>
            <p className='mb-2 text-xl'>
              Môn học: {subject?.name || <Skeleton baseColor='#9DCCFF' />}
            </p>
            <p className='text-[#666]'>{subject?.description ? subject.description : undefined}</p>
          </div>

          {/* Chapters */}
          <div className='space-y-2 md:space-y-4 lg:space-y-5 xl:space-y-6 2xl:space-y-7'>
            {isLoadingQuizzes ? (
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
                  className='flex flex-col rounded-lg bg-white p-3 md:p-4 lg:p-6 3xl:p-8'
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
                          {sessionQueriesResult[index]?.isLoading ? (
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
                        {sessionQueriesResult[index]?.isLoading ? (
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
      </Wrapper>
    </Page>
  );
};

export default Main;
