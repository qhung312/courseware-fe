import './index.css';

import { useQueries } from '@tanstack/react-query';
import { useCallback, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Footer, Icon, LazyLoadImage, Select } from '../../../../components';
import { Page } from '../../../../layout';
import ExamService from '../../../../service/exam.service';
import useBoundStore from '../../../../store';
import { Exam, SEMESTER_OPTIONS } from '../../../../types';
import { getCurrentSemester } from '../../../../utils/helper';

const Main = () => {
  const [semester, setSemester] = useState(getCurrentSemester());

  const navigate = useNavigate();

  const user = useBoundStore.use.user();

  const isValidEmail = user.email.endsWith('@hcmut.edu.vn');

  const results = useQueries({
    queries: [
      {
        queryKey: ['midterm exam', semester],
        queryFn: async () => {
          const { data } = await ExamService.getAll({ type: 'midterm', semester: semester });

          return data.payload;
        },
        refetchOnWindowFocus: false,
        refetchInterval: 60000,
      },
      {
        queryKey: ['final exam', semester],
        queryFn: async () => {
          const { data } = await ExamService.getAll({ type: 'final', semester: semester });

          return data.payload;
        },
        refetchOnWindowFocus: false,
        staleTime: 60000,
      },
    ],
  });

  const getTimeRange = (exams: Exam[]) => {
    if (exams.length === 0) {
      return [0, 0];
    }
    const start = exams.reduce((acc, cur) => {
      if (cur.registrationStartedAt < acc) {
        return cur.registrationStartedAt;
      }

      return acc;
    }, Infinity);
    const end = exams.reduce((acc, cur) => {
      if (cur.slots.slice(-1)[0]?.endedAt > acc) {
        return cur.slots.slice(-1)[0]?.endedAt;
      }

      return acc;
    }, 0);

    return [start, end];
  };

  const isMidtermExamOpen = useCallback(() => {
    if (!results[0].data) {
      return false;
    }

    const timeRange = getTimeRange(results[0].data.result);
    return results[0].data.total && Date.now() >= timeRange[0] && Date.now() <= timeRange[1];
  }, [results]);

  const isFinalExamOpen = useCallback(() => {
    if (!results[1].data) {
      return false;
    }

    const timeRange = getTimeRange(results[1].data.result);
    return results[1].data.total && Date.now() >= timeRange[0] && Date.now() <= timeRange[1];
  }, [results]);

  return (
    <>
      <Page title='Thi thử'>
        <main className='flex flex-col gap-y-5 overflow-y-auto text-[16px] md:text-[14px] lg:gap-y-12 lg:text-[18px] xl:text-[20px] 2xl:gap-y-16 3xl:gap-y-20'>
          <div className='w-full'>
            <LazyLoadImage
              className='header z-[1] block aspect-[52/25] md:aspect-[4/1]'
              src={require('../../../../assets/images/MockTest_1.jpg')}
              placeHolderSrc={require('../../../../assets/images/MockTest_1-placeholder.jpg')}
              alt='tstt_alt'
              objectFit='cover'
            />
          </div>
          <div className='mb-6 flex w-full flex-col gap-y-7 px-5 md:gap-y-12 md:px-12 lg:mb-8 lg:gap-y-20 lg:px-24 2xl:mb-10 2xl:gap-y-24 2xl:px-32 3xl:mb-12 3xl:gap-y-28 3xl:px-40'>
            <div className='flex w-full flex-col items-center justify-center gap-y-2'>
              <div className='flex w-full items-start'>
                <h1 className='text-start text-[28px] font-bold text-[#2F327D] md:text-[24px] md:text-2xl md:text-[#2F327D] lg:text-3xl xl:text-4xl 2xl:text-5xl'>
                  Thi thử
                </h1>
              </div>
              <div className='flex w-full flex-col justify-between gap-y-5 md:flex-row-reverse md:gap-x-12 lg:gap-x-20 2xl:gap-x-24 3xl:gap-x-28'>
                <div className='flex w-full flex-col items-start gap-y-2 md:gap-y-3 lg:gap-y-4 2xl:gap-y-5'>
                  <h2 className='text-start text-2xl font-semibold text-black lg:text-3xl 2xl:text-4xl'>
                    Giới thiệu
                  </h2>
                  <p className='text-start text-[16px] leading-7 text-[#696984] lg:text-[20px] lg:leading-8 2xl:text-[24px] 2xl:leading-10'>
                    Đối với hoạt động thi thử, các bạn sẽ tham gia vào một bài kiểm tra để đánh giá
                    kiến thức và kỹ năng của bản thân. Trên môi trường trực tuyến, các bạn sinh viên
                    sẽ trả lời các câu hỏi hoặc hoàn thành các bài tập được thiết kế để phản ánh nội
                    dung học tập trên trường. Hoạt động này sẽ giúp bạn tự đánh giá mức độ hiểu
                    biết, chuẩn bị tốt nhất cho kỳ thi chính thức, và cũng có thể cung cấp phản hồi
                    quan trọng về sự tiến bộ của bạn trong quá trình học tập.
                  </p>
                </div>
                <div className='grid w-full grid-cols-1 gap-y-5 gap-x-10 lg:grid-cols-2 lg:gap-x-8 lg:py-4 2xl:gap-x-10 2xl:py-8'>
                  <div className='flex flex-row items-center gap-x-2 rounded-[20px] p-4 shadow-[0px_20px_50px_0px_rgba(47,50,125,0.1)] md:h-auto md:gap-x-3 lg:gap-x-4 2xl:gap-x-5 2xl:p-6'>
                    <div className='flex aspect-square h-[60px] items-center justify-center rounded bg-[#49BBBD]/30 lg:h-[72px] 2xl:h-20 3xl:h-[90px]'>
                      <Icon.UpRightArrowIcon className='h-6 w-auto fill-[#49BBBD] 3xl:h-[30px]' />
                    </div>
                    <p className='flex w-full justify-center whitespace-nowrap text-center text-[18px] leading-7 text-[#696984] md:flex-wrap md:whitespace-normal lg:text-[20px] lg:leading-8 2xl:text-[24px] 2xl:leading-10'>
                      Cải thiện kĩ năng làm bài
                    </p>
                  </div>
                  <div className='flex flex-row items-center gap-x-2 rounded-[20px] p-4 shadow-[0px_20px_50px_0px_rgba(47,50,125,0.1)] md:h-auto md:gap-x-3 lg:gap-x-4 2xl:gap-x-5 2xl:p-6'>
                    <div className='flex aspect-square h-[60px] items-center justify-center rounded bg-[#9DCCFF]/30 lg:h-[72px] 2xl:h-20 3xl:h-[90px]'>
                      <Icon.Pen className='h-6 w-auto fill-[#9DCCFF] 3xl:h-[30px]' />
                    </div>
                    <p className='flex w-full justify-center whitespace-nowrap text-center text-[18px] leading-7 text-[#696984] md:flex-wrap md:whitespace-normal lg:text-[20px] lg:leading-8 2xl:text-[24px] 2xl:leading-10'>
                      Làm quen với môi trường thi cử
                    </p>
                  </div>
                  <div className='flex flex-row items-center gap-x-2 rounded-[20px] p-4 shadow-[0px_20px_50px_0px_rgba(47,50,125,0.1)] md:h-auto md:gap-x-3 lg:gap-x-4 2xl:gap-x-5 2xl:p-6'>
                    <div className='flex aspect-square h-[60px] items-center justify-center rounded bg-[#9DCCFF]/30 lg:h-[72px] 2xl:h-20 3xl:h-[90px]'>
                      <Icon.FiveWingStarIcon className='h-6 w-auto fill-[#9DCCFF] 3xl:h-[30px]' />
                    </div>
                    <p className='flex w-full justify-center whitespace-nowrap text-center text-[18px] leading-7 text-[#696984] md:flex-wrap md:whitespace-normal lg:text-[20px] lg:leading-8 2xl:text-[24px] 2xl:leading-10'>
                      Nâng cao điểm thi thật
                    </p>
                  </div>
                  <div className='flex flex-row items-center gap-x-2 rounded-[20px] p-4 shadow-[0px_20px_50px_0px_rgba(47,50,125,0.1)] md:h-auto md:gap-x-3 lg:gap-x-4 2xl:gap-x-5 2xl:p-6'>
                    <div className='flex aspect-square h-[60px] items-center justify-center rounded bg-[#49BBBD]/30 lg:h-[72px] 2xl:h-20 3xl:h-[90px]'>
                      <Icon.DocumentPageIcon className='h-6 w-auto fill-[#49BBBD] 3xl:h-[30px]' />
                    </div>
                    <p className='flex w-full justify-center whitespace-nowrap text-center text-[18px] leading-7 text-[#696984] md:flex-wrap md:whitespace-normal lg:text-[20px] lg:leading-8 2xl:text-[24px] 2xl:leading-10'>
                      Ôn tập kiến thức đại cương
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='flex w-full flex-col items-start gap-y-5 bg-[#9DCCFF]/20 px-5 pt-10 pb-16 md:gap-y-6 md:px-12 lg:gap-y-8 lg:px-24 lg:pt-12 lg:pb-20 2xl:gap-y-10 2xl:px-32 2xl:pt-16 2xl:pb-24 3xl:px-40 3xl:pt-20 3xl:pb-28'>
            <div
              id='mock-test'
              className='flex w-full flex-1 flex-row items-center justify-between gap-x-5 md:gap-x-20'
            >
              <h2 className='text-start text-2xl font-semibold text-black lg:text-3xl 2xl:text-4xl'>
                Các đợt thi thử
              </h2>
              <Select
                options={SEMESTER_OPTIONS}
                onChange={(v) => {
                  if (v !== null) {
                    setSemester(v.label.slice(-3));
                  }
                }}
                value={SEMESTER_OPTIONS.find((x) => x.label.includes(semester)) ?? null}
                placeholder='Chọn học kì'
              />
            </div>

            <div className='grid w-full grid-cols-1 justify-between gap-y-5 md:grid-cols-2 md:gap-x-12 lg:gap-x-16 2xl:gap-x-20'>
              <div className='flex flex-col gap-y-7 rounded-[20px] bg-white p-4 shadow-[0px_20px_50px_0px_rgba(47,50,125,0.1)] md:gap-y-6 lg:gap-y-8 lg:p-6 2xl:gap-y-12 2xl:p-8'>
                <LazyLoadImage
                  className='header z-[1] block aspect-[2/1] h-auto rounded-[20px]'
                  src={require('../../../../assets/images/MockTest_2.jpg')}
                  placeHolderSrc={require('../../../../assets/images/MockTest_2-placeholder.jpg')}
                  containerClassName='h-auto aspect-[2/1]'
                  alt='tstt_alt'
                  objectFit='cover'
                />

                <div className='flex w-full flex-1 flex-col items-start gap-y-4 md:gap-y-3 lg:gap-y-4 2xl:gap-y-5'>
                  <h3 className='text-start text-xl font-medium text-[#2F327D] lg:text-[28px] 2xl:text-[32px]'>
                    Thi thử Giữa Kì
                  </h3>
                  {results[0].isLoading ? (
                    <Skeleton
                      baseColor='#9DCCFF'
                      containerClassName='w-full py-1 2xl:py-1.5'
                      width='100%'
                      className='h-5 lg:h-8 2xl:h-9'
                      style={{
                        lineHeight: 'unset',
                      }}
                    />
                  ) : isMidtermExamOpen() ? (
                    <div className='flex flex-row items-center gap-x-4 rounded-full bg-[#7BCFA9] py-1 pl-2 pr-4 2xl:py-[6px] 2xl:pr-6'>
                      <div className='aspect-square w-5 rounded-full bg-[#33B679] lg:w-7 2xl:w-8 3xl:w-9' />
                      <p className='text-start text-[16px] font-semibold leading-5 text-white lg:text-[20px] lg:leading-8 2xl:text-[24px] 2xl:leading-9'>
                        Đang diễn ra
                      </p>
                    </div>
                  ) : (
                    <div className='flex flex-row items-center gap-x-4 rounded-full bg-[#F2F2F2] py-1 pl-2 pr-4 2xl:py-[6px] 2xl:pr-6'>
                      <div className='aspect-square w-5 rounded-full bg-[#CCCCCC] lg:w-7 2xl:w-8 3xl:w-9' />
                      <p className='text-start text-[16px] font-semibold leading-5 text-[#252641] lg:text-[20px] lg:leading-8 2xl:text-[24px] 2xl:leading-9'>
                        Chưa mở
                      </p>
                    </div>
                  )}

                  <p
                    className='flex flex-1 items-start text-start text-[16px] font-normal leading-7 text-[#696984] 
                lg:text-[18px] lg:leading-8 2xl:text-[22px] 2xl:leading-10'
                  >
                    Đăng ký thi thử giữa kỳ online là cơ hội để đánh giá kiến thức và kỹ năng của
                    mình qua những câu hỏi ôn tập bám sát thực tế.
                  </p>
                </div>
                {isMidtermExamOpen() ? (
                  <div className='flex w-full flex-row items-center justify-between'>
                    <button
                      onClick={() => {
                        if (isValidEmail) {
                          navigate(`/room/tests/midterm/${semester}`);
                        } else {
                          toast.error(
                            'Vui lòng sử dụng email đuôi @hcmut.edu.vn để tham gia thi thử'
                          );
                        }
                      }}
                      className='flex cursor-pointer'
                    >
                      <p className='text-start text-[16px] font-normal leading-7 text-[#696984] underline lg:text-[20px] lg:leading-8 2xl:text-[24px] 2xl:leading-9'>
                        Chi tiết
                      </p>
                    </button>
                  </div>
                ) : results[0].data?.result[0] &&
                  Date.now() < getTimeRange(results[0].data?.result)[0] ? (
                  <p>
                    Mở đăng ký vào{' '}
                    {new Date(results[0].data?.result?.[0].registrationStartedAt)
                      .toLocaleString('vi-VN', {
                        hour: '2-digit',
                        minute: '2-digit',
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',

                        hourCycle: 'h23',
                        hour12: false,
                      })
                      .replace(' ', ', ')}
                  </p>
                ) : null}
              </div>
              <div className='flex flex-col gap-y-7 rounded-[20px] bg-white p-4 shadow-[0px_20px_50px_0px_rgba(47,50,125,0.1)] md:gap-y-6 lg:gap-y-8 lg:p-6 2xl:gap-y-12 2xl:p-8'>
                <LazyLoadImage
                  className='header z-[1] block aspect-[2/1] h-auto rounded-[20px]'
                  src={require('../../../../assets/images/MockTest_3.jpg')}
                  placeHolderSrc={require('../../../../assets/images/MockTest_3-placeholder.jpg')}
                  alt='tstt_alt'
                  containerClassName='h-auto aspect-[2/1]'
                  objectFit='cover'
                />
                <div className='flex w-full flex-col items-start gap-y-4 md:gap-y-3 lg:gap-y-4 2xl:gap-y-5'>
                  <h3 className='text-start text-xl font-medium text-[#2F327D] lg:text-[28px] 2xl:text-[32px]'>
                    Thi thử Cuối Kì
                  </h3>

                  {results[1].isLoading ? (
                    <Skeleton
                      baseColor='#9DCCFF'
                      containerClassName='w-full py-1 2xl:py-1.5'
                      width='100%'
                      className='h-5 lg:h-8 2xl:h-9'
                      style={{
                        lineHeight: 'unset',
                      }}
                    />
                  ) : isFinalExamOpen() ? (
                    <div className='flex flex-row items-center gap-x-4 rounded-full bg-[#7BCFA9] py-1 pl-2 pr-4 2xl:py-[6px] 2xl:pr-6'>
                      <div className='aspect-square w-5 rounded-full bg-[#33B679] lg:w-7 2xl:w-8 3xl:w-9' />
                      <p className='text-start text-[16px] font-semibold leading-5 text-white lg:text-[20px] lg:leading-8 2xl:text-[24px] 2xl:leading-9'>
                        Đang diễn ra
                      </p>
                    </div>
                  ) : (
                    <div className='flex flex-row items-center gap-x-4 rounded-full bg-[#F2F2F2] py-1 pl-2 pr-4 2xl:py-[6px] 2xl:pr-6'>
                      <div className='aspect-square w-5 rounded-full bg-[#CCCCCC] lg:w-7 2xl:w-8 3xl:w-9' />
                      <p className='text-start text-[16px] font-semibold leading-5 text-[#252641] lg:text-[20px] lg:leading-8 2xl:text-[24px] 2xl:leading-9'>
                        Chưa mở
                      </p>
                    </div>
                  )}

                  <p className='flex-1 text-start text-[16px] font-normal leading-7 text-[#696984] lg:text-[18px] lg:leading-8 2xl:text-[22px] 2xl:leading-10'>
                    Tham gia thi thử cuối kì để có sự chuẩn bị tốt nhất cho kỳ thi sắp tới qua những
                    câu hỏi, bài tập nhằm kiểm tra kiến thức của bản thân.
                  </p>
                </div>
                {isFinalExamOpen() ? (
                  <div className='flex w-full flex-row items-center justify-between'>
                    <button
                      onClick={() => {
                        if (isValidEmail) {
                          navigate(`/room/tests/final/${semester}`);
                        } else {
                          toast.error(
                            'Vui lòng sử dụng email đuôi @hcmut.edu.vn để tham gia thi thử'
                          );
                        }
                      }}
                      className='flex cursor-pointer'
                    >
                      <p className='text-start text-[16px] font-normal leading-7 text-[#696984] underline lg:text-[20px] lg:leading-8 2xl:text-[24px] 2xl:leading-9'>
                        Chi tiết
                      </p>
                    </button>
                  </div>
                ) : results[1].data?.result[0] &&
                  Date.now() < getTimeRange(results[1].data?.result)[0] ? (
                  <p>
                    Mở đăng ký vào{' '}
                    {new Date(results[1].data?.result?.[0].registrationStartedAt)
                      .toLocaleString('vi-VN', {
                        hour: '2-digit',
                        minute: '2-digit',
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',

                        hourCycle: 'h23',
                        hour12: false,
                      })
                      .replace(' ', ', ')}
                  </p>
                ) : null}
              </div>
            </div>
          </div>
          <Footer />
        </main>
      </Page>
    </>
  );
};

export default Main;
