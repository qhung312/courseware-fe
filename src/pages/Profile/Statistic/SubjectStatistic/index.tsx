import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

// import DemoLineChart from '../../../../assets/images/DemoLineChart.png';
import { Footer } from '../../../../components';
import Icon from '../../../../components/Icon';
import ProfileOption from '../../../../components/ProfileOption';
import { Page } from '../../../../layout';
import UserService, {
  GetAllQuizHistoryProps,
  SubjectQuizHistoryReturnType,
} from '../../../../service/user.service';

import RenderLineChart from './LineChart';

export interface ChartData {
  dateString: string;
  Điểm: number;
  count: number;
}

type SubjectQuizHistoryReturnTypeWithDate = SubjectQuizHistoryReturnType & {
  dateString: string;
};

const SubjectStatistic = () => {
  const params = useParams();
  const [quizHistory, setQuizHistory] = useState<SubjectQuizHistoryReturnType[]>([]);
  const [lineChartData, setLineChartData] = useState<ChartData[]>([]);

  const epochToDateString = (epochTime: number): string => {
    const date = new Date(epochTime);

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    const hour = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${hour}:${minutes}, ${day}/${month}/${year}`;
  };

  const epochToChartDate = (epochTime: number): string => {
    const date = new Date(epochTime);

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');

    return `${day}/${month}`;
  };

  function getEpochTimestamps() {
    // Get the current date
    const currentDate = new Date();

    // Calculate the date of a week ago
    const weekAgoDate = new Date();
    weekAgoDate.setDate(currentDate.getDate() - 7);
    weekAgoDate.setHours(0, 0, 0, 0);

    // Convert dates to epoch timestamps (milliseconds since January 1, 1970)
    const currentEpochTimestamp = currentDate.getTime();
    const weekAgoEpochTimestamp = weekAgoDate.getTime();

    return {
      currentEpochTimestamp,
      weekAgoEpochTimestamp,
    };
  }

  useEffect(() => {
    const timestamps = getEpochTimestamps();
    const queryProps: GetAllQuizHistoryProps = {
      subjectId: params.subjectId || '',
      startAt: timestamps.weekAgoEpochTimestamp.toString(),
      endAt: timestamps.currentEpochTimestamp.toString(),
    };
    UserService.getAllSubjectQuizHistory(queryProps)
      .then((res) => {
        const { result } = res.data.payload;
        setQuizHistory(result);
        const newResult: SubjectQuizHistoryReturnTypeWithDate[] = result.map((item) => {
          return {
            ...item,
            dateString: epochToChartDate(item.endedAt),
          };
        });
        const generatedData: ChartData[] = Object.values(
          newResult.reduce((acc: { [dateString: string]: ChartData }, current) => {
            const { dateString, standardizedScore } = current;

            if (!acc[dateString]) {
              acc[dateString] = { dateString, Điểm: standardizedScore, count: 1 };
            } else {
              acc[dateString].Điểm += standardizedScore;
              acc[dateString].count++;
            }

            return acc;
          }, {})
        );
        const newData = generatedData.map((item) => {
          return {
            ...item,
            Điểm: item.Điểm / item.count,
          };
        });
        setLineChartData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [params.subjectId]);

  return (
    <Page title='Thông tin người dùng - Thống kê điểm số'>
      <main className='with-nav-height w-full overflow-y-auto'>
        {/* Banner */}
        <ProfileOption option={3} editAvatar={false} setAvatar={() => {}} updatedName='' />
        <div className='relative bg-white px-5 pt-4 pb-[64px] md:flex md:flex-col md:pt-10 lg:px-[60px]'>
          <Link
            to='/profile/statistic'
            className='text-semibold mb-3 flex h-fit w-fit gap-x-2 rounded-xl bg-[#4285f4]/[.6] px-2 py-1 text-white hover:bg-[#4285f4]/[.8] lg:py-2 lg:text-[20px] 3xl:text-2xl'
          >
            <Icon.ChevronLeft fill='white' className='w-2 3xl:w-3' />
            Quay lại
          </Link>
          <h1 className='mb-3 text-2xl font-semibold text-[#2252641] md:text-center lg:text-[28px] 3xl:text-[36px]'>
            Thống kê môn{' '}
            <span className='md:text-[#4285f4]'>
              {quizHistory ? quizHistory[0]?.fromQuiz?.subject?.name : 'Môn học'}
            </span>
          </h1>
          <div className='mb-6 flex h-[fit-content] w-full flex-col rounded-[20px] border-[1px] border-[#49BBBD]/[.3] bg-white px-[20px] py-[16px] md:border-0'>
            <div className='flex flex-row items-center justify-start gap-x-2'>
              <Icon.EqualizerIcon fill='#49BBBD' className='lg:h-7 lg:w-7 3xl:h-9 3xl:w-9' />
              <p className='text-xl font-medium text-[#49BBBD] lg:text-2xl 3xl:text-[32px]'>
                Thống kê điểm số
              </p>
            </div>
            <div className='mt-4 h-[1px] w-full bg-[#D9D9D9] md:hidden' />
            <div className='mt-5 h-[200px] sm:h-[320px] md:h-[360px] md:w-[70vw] md:self-center lg:h-[400px] lg:w-[60vw] xl:w-[50vw]'>
              {/* <p className='text-semibold text-sm text-[#696969] md:text-base lg:text-xl 3xl:text-[28px]'>
                Điểm
              </p> */}
              {/* <img src={DemoLineChart} alt='Demo Line Chart' className='h-fit w-full md:w-[70vw]' /> */}
              <RenderLineChart data={lineChartData} />
            </div>
          </div>
          <div className='show-scrollbar mb-6 flex h-[fit-content] w-full flex-col rounded-[20px] border-[1px] border-[#49BBBD]/[.3] bg-white px-[20px] py-[16px] md:max-h-[50vh] md:overflow-y-scroll md:border-0 md:shadow-[0px_19px_47px_0px_rgba(47,50,125,0.1)]'>
            <div className='flex flex-row items-center justify-start gap-x-2'>
              <Icon.ClipboardIcon className='fill-[#49BBBD] md:fill-[#9DCCFF] lg:h-7 lg:w-7 3xl:h-9 3xl:w-9' />
              <p className='text-xl font-medium text-[#49BBBD] md:text-[#9DCCFF] lg:text-2xl 3xl:text-[32px]'>
                Lịch sử làm bài
              </p>
            </div>
            <div className='mt-6 flex items-center md:w-[80%]'>
              <div className='flex items-center gap-x-2 md:flex-[6]'>
                <div className='h-4 w-4 rounded-full bg-[#49BBBD] md:bg-[#9DCCFF] 3xl:h-5 3xl:w-5' />
                <p className='font-medium text-[#49BBBD] md:text-[18px] md:text-[#9DCCFF] lg:text-xl 3xl:text-[28px]'>
                  Danh sách các bài kiểm tra
                </p>
              </div>
              <p className='hidden md:block md:flex-[3] md:text-[18px] md:text-[#9DCCFF] lg:text-xl 3xl:text-[28px]'>
                Ngày hoàn thành
              </p>
              <p className='hidden md:block md:flex-[1] md:text-[18px] md:text-[#9DCCFF] lg:text-xl 3xl:text-[28px]'>
                Điểm
              </p>
            </div>
            <div className='mt-3 w-full md:hidden'>
              {quizHistory.map((test, index) => (
                <div className='flex flex-col border-t-[1px] border-t-[#D9D9D9] pt-3' key={index}>
                  <div className='flex justify-between'>
                    <p className='font-medium text-[#252641]'>{test?.fromQuiz?.name || 'Quiz'}</p>
                    <Link
                      to={`/room/exercises/${test?.fromQuiz?.subject?._id}/quiz/${test?._id}/review/session/${test?._id}`}
                      className='font-semibold text-[#252641] underline hover:text-[#4285f4]'
                    >
                      Xem lại
                    </Link>
                  </div>
                  <div className='flex gap-x-2'>
                    <p className='w-[148px] text-[14px] font-medium text-[#252641]'>
                      <span className='text-[#0f9d58]'>Hoàn thành:</span>{' '}
                      {test.endedAt ? epochToDateString(test?.endedAt) : 'Chưa cập nhật'}
                    </p>
                    <p className='text-[14px] font-medium text-[#252641]'>
                      <span className='text-[#0f9d58]'>Điểm:</span>{' '}
                      {test?.standardizedScore < 10 && 0}
                      {test?.standardizedScore.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className='mt-3 hidden w-full md:block'>
              {quizHistory.map((test, index) => (
                <div
                  className='flex flex-col border-t-[1px] border-t-[#D9D9D9] pt-3 pb-3'
                  key={index}
                >
                  <div className='flex justify-between'>
                    <div className='flex w-[80%] items-center justify-between'>
                      <p className='flex-[6] pl-5 font-medium text-[#252641] lg:text-[18px] 3xl:text-2xl'>
                        {test?.fromQuiz?.name || 'Quiz'}
                      </p>
                      <p className='flex-[3] font-medium text-[#252641] lg:text-[18px] 3xl:text-2xl'>
                        {test.endedAt ? epochToDateString(test.endedAt) : 'Chưa cập nhật'}
                      </p>
                      <p className='flex-[1] font-medium text-[#252641] lg:text-[18px] 3xl:text-2xl'>
                        {test?.standardizedScore < 10 && 0}
                        {test?.standardizedScore.toFixed(2)}
                      </p>
                    </div>
                    <Link
                      to={`/room/exercises/${test?.fromQuiz?.subject?._id}/quiz/${test?._id}/review/session/${test?._id}`}
                      className='font-semibold text-[#252641] underline hover:text-[#4285f4] lg:text-[18px] 3xl:text-2xl'
                    >
                      Xem lại
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </Page>
  );
};

export default SubjectStatistic;
