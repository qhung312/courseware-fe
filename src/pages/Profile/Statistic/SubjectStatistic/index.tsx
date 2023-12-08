import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

// import DemoLineChart from '../../../../assets/images/DemoLineChart.png';
import { ReactComponent as NoChartData } from '../../../../assets/svgs/NoChart.svg';
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
  const [queryPeriod, setQueryPeriod] = useState(getEpochTimestamps());
  const [subjectName, setSubjectName] = useState<string>('');

  function haveSameDate(timestamp: number) {
    const date1 = new Date(timestamp);
    const date2 = new Date();

    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

  const epochToDateString = (epochTime: number, fullDisplay: boolean): string => {
    const date = new Date(epochTime);

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    const hour = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    if (fullDisplay) {
      return `${hour}:${minutes}, ${day}/${month}/${year}`;
    }
    return `${day}/${month}`;
  };

  function getEpochTimestamps() {
    // Get the current date
    const currentDate = new Date();

    // Calculate the date of a week ago
    const weekAgoDate = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);
    weekAgoDate.setHours(0, 0, 0, 0);

    // Convert dates to epoch timestamps (milliseconds since January 1, 1970)
    const currentEpochTimestamp = currentDate.getTime();
    const weekAgoEpochTimestamp = weekAgoDate.getTime();

    return {
      currentEpochTimestamp,
      weekAgoEpochTimestamp,
    };
  }

  const getEpochTimestampsForQuery = (period: number, forward: boolean) => {
    const currentDate = new Date(period);
    const timeChange1 = forward ? 8 * 24 * 60 * 60 * 1000 : -24 * 60 * 60 * 1000;
    const timeChange2 = forward ? 24 * 60 * 60 * 1000 : -8 * 24 * 60 * 60 * 1000;
    const newCurrentDate = new Date(currentDate.getTime() + timeChange1);
    // Calculate the date of a week ago
    const weekAgoDate = new Date(currentDate.getTime() + timeChange2);
    weekAgoDate.setHours(0, 0, 0, 0);
    newCurrentDate.setHours(23, 59, 59, 999);

    // Convert dates to epoch timestamps (milliseconds since January 1, 1970)
    const currentEpochTimestamp = newCurrentDate.getTime();
    const weekAgoEpochTimestamp = weekAgoDate.getTime();

    setQueryPeriod({
      currentEpochTimestamp,
      weekAgoEpochTimestamp,
    });
  };

  useEffect(() => {
    const queryProps: GetAllQuizHistoryProps = {
      subjectId: params.subjectId || '',
      startAt: queryPeriod.weekAgoEpochTimestamp.toString(),
      endAt: queryPeriod.currentEpochTimestamp.toString(),
    };
    UserService.getAllSubjectQuizHistory(queryProps)
      .then((res) => {
        const { result } = res.data.payload;
        setQuizHistory(result);
        if (result.length !== 0) setSubjectName(result[0]?.fromQuiz?.subject?.name);
        const newResult: SubjectQuizHistoryReturnTypeWithDate[] = result.map((item) => {
          return {
            ...item,
            dateString: epochToDateString(item.endedAt, false),
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
            Điểm: Math.round((item.Điểm / item.count) * 100) / 100,
          };
        });
        setLineChartData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [params.subjectId, queryPeriod]);

  return (
    <Page title='Thông tin người dùng - Thống kê điểm số'>
      <main className='with-nav-height w-full overflow-y-auto'>
        {/* Banner */}
        <ProfileOption option={3} editAvatar={false} setAvatar={() => {}} updatedName='' />
        <div className='relative bg-white px-5 pt-4 pb-[64px] md:flex md:flex-col md:pt-10 lg:px-[60px]'>
          <Link
            to='/profile/statistic'
            className='text-semibold mb-3 flex h-fit w-fit gap-x-2 rounded-lg bg-[#4285f4]/[.8] px-2 py-1 text-white hover:bg-[#4285f4] lg:py-1 2xl:text-[20px]'
          >
            <Icon.ChevronLeft fill='white' className='w-2 3xl:w-3' />
            Quay lại
          </Link>
          <h1 className='mb-3 text-2xl font-semibold text-[#2252641] md:text-center lg:text-[28px] 3xl:text-[36px]'>
            Thống kê môn <span className='md:text-[#4285f4]'>{subjectName || 'học'}</span>
          </h1>
          <div className='mb-6 flex h-[fit-content] w-full flex-col rounded-[20px] border-[1px] border-[#49BBBD]/[.3] bg-white px-[20px] py-[16px] md:border-0'>
            <div className='flex flex-row items-center justify-start gap-x-2'>
              <Icon.EqualizerIcon fill='#4285F4' className='lg:h-7 lg:w-7 3xl:h-9 3xl:w-9' />
              <p className='text-xl font-medium text-[#4285F4] lg:text-2xl 3xl:text-[32px]'>
                Thống kê điểm số
              </p>
            </div>
            <div className='mt-4 h-[1px] w-full bg-[#D9D9D9] md:hidden' />
            <div className='mt-9 flex flex-1 flex-row items-center justify-center gap-x-4'>
              <button
                className='group rounded-full p-2 hover:bg-[#4285F4]/[.8]'
                // disabled={quizHistory.length === 0}
                onClick={() => getEpochTimestampsForQuery(queryPeriod.weekAgoEpochTimestamp, false)}
              >
                <Icon.Chevron fill='#4285f4' className='-rotate-90 group-hover:fill-white' />
              </button>
              <p>
                Từ {epochToDateString(queryPeriod.weekAgoEpochTimestamp, false)} đến{' '}
                {epochToDateString(queryPeriod.currentEpochTimestamp, false)}
              </p>
              <button
                className={`rounded-full p-2 ${
                  haveSameDate(queryPeriod.currentEpochTimestamp)
                    ? ''
                    : 'group hover:bg-[#4285F4]/[.8]'
                }`}
                disabled={haveSameDate(queryPeriod.currentEpochTimestamp)}
                onClick={() => getEpochTimestampsForQuery(queryPeriod.currentEpochTimestamp, true)}
              >
                <Icon.Chevron
                  fill={`${
                    haveSameDate(queryPeriod.currentEpochTimestamp) ? '#5b5b5b' : '#4285f4'
                  }`}
                  className='rotate-90 group-hover:fill-white'
                />
              </button>
            </div>
            <div className='mt-5 h-[200px] sm:h-[320px] md:h-[360px] md:w-[70vw] md:self-center lg:h-[400px] lg:w-[60vw] xl:w-[50vw]'>
              {/* <p className='text-semibold text-sm text-[#696969] md:text-base lg:text-xl 3xl:text-[28px]'>
                Điểm
              </p> */}
              {/* <img src={DemoLineChart} alt='Demo Line Chart' className='h-fit w-full md:w-[70vw]' /> */}
              {quizHistory.length === 0 ? (
                <div className='lg:mt-[-16px]'>
                  <div className='z-10 rounded-[20px] bg-white px-4 py-3 md:p-5 xl:p-6 2xl:p-7'>
                    <NoChartData
                      width={200}
                      className='mx-auto h-[200px] w-[200px] p-7 xl:h-[300px] xl:w-[300px]'
                    />
                    <p className='w-full text-center lg:text-[18px] xl:text-xl'>
                      Hiện không có thống kê điểm số trong thời gian này
                    </p>
                  </div>
                </div>
              ) : (
                <RenderLineChart data={lineChartData} />
              )}
            </div>
          </div>
          <div className='show-scrollbar mb-6 flex h-[fit-content] w-full flex-col rounded-[20px] border-[1px] border-[#49BBBD]/[.3] bg-white px-[20px] py-[16px] md:max-h-[50vh] md:overflow-y-scroll md:border-0 md:shadow-[0px_19px_47px_0px_rgba(47,50,125,0.1)]'>
            <div className='flex flex-row items-center justify-start gap-x-2'>
              <Icon.ClipboardIcon className='fill-[#49BBBD] md:fill-[#4285F4] lg:h-7 lg:w-7 3xl:h-9 3xl:w-9' />
              <p className='text-xl font-medium text-[#49BBBD] md:text-[#4285F4] lg:text-2xl 3xl:text-[32px]'>
                Lịch sử làm bài
              </p>
            </div>
            <p className='mt-1 text-[#5b5b5b] 2xl:text-[18px]'>
              - Từ {epochToDateString(queryPeriod.weekAgoEpochTimestamp, false)} đến{' '}
              {epochToDateString(queryPeriod.currentEpochTimestamp, false)}
            </p>
            <div className='mt-6 flex items-center md:w-[80%]'>
              <div className='flex items-center gap-x-2 md:flex-[6]'>
                <div className='h-4 w-4 rounded-full bg-[#49BBBD] md:bg-[#4285F4] 3xl:h-5 3xl:w-5' />
                <p className='font-medium text-[#49BBBD] md:text-[18px] md:text-[#4285F4] lg:text-xl 3xl:text-[28px]'>
                  Danh sách các bài kiểm tra
                </p>
              </div>
              <p className='hidden md:block md:flex-[3] md:text-[18px] md:text-[#4285F4] lg:text-xl 3xl:text-[28px]'>
                Ngày hoàn thành
              </p>
              <p className='hidden md:block md:flex-[1] md:text-[18px] md:text-[#4285F4] lg:text-xl 3xl:text-[28px]'>
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
                      {test.endedAt ? epochToDateString(test?.endedAt, true) : 'Chưa cập nhật'}
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
                        {test.endedAt ? epochToDateString(test.endedAt, true) : 'Chưa cập nhật'}
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
