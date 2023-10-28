import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Link, useParams } from 'react-router-dom';

// import DemoLineChart from '../../../../assets/images/DemoLineChart.png';
import { Footer } from '../../../../components';
import Icon from '../../../../components/Icon';
import ProfileOption from '../../../../components/ProfileOption';
import { Page } from '../../../../layout';

import RenderLineChart from './LineChart';

interface SubjectStatisticProps {
  name: string;
  grade: number;
  finishDate: string;
  link: string;
}
const SubjectIdMapping: string[] = [
  'Giải tích 1',
  'Vật lý 1',
  'Đại số tuyến tính',
  'Xác suất thống kê',
  'Giải tích 2',
  'Vật lý 2',
];
const SubjectStatisticData: SubjectStatisticProps[] = [
  {
    name: 'Bài tập rèn luyện chương 1',
    grade: 10,
    finishDate: '01/07/2023',
    link: '/statistic',
  },
  {
    name: 'Bài tập rèn luyện chương 2',
    grade: 0,
    finishDate: '02/07/2023',
    link: '/statistic',
  },
  {
    name: 'Bài tập rèn luyện chương 3',
    grade: 5,
    finishDate: '11/07/2023',
    link: '/statistic',
  },
  {
    name: 'Bài tập rèn luyện chương 4',
    grade: 6.25,
    finishDate: '14/07/2023',
    link: '/statistic',
  },
  {
    name: 'Bài tập rèn luyện chương 5',
    grade: 7.5,
    finishDate: '03/07/2023',
    link: '/statistic',
  },
  {
    name: 'Bài tập rèn luyện chương 6',
    grade: 7.5,
    finishDate: '05/07/2023',
    link: '/statistic',
  },
];

const SubjectStatistic = () => {
  const params = useParams();
  const subject = params ? SubjectIdMapping[Number(params.subjectId) - 1] : null;

  return (
    <Page title='Thông tin người dùng - Thống kê điểm số'>
      <main className='with-nav-height w-full overflow-y-auto'>
        {/* Banner */}
        <ProfileOption option={3} />
        <div className='relative bg-white px-5 pt-4 pb-[64px] md:flex md:flex-col md:pt-10 lg:px-[60px]'>
          <Link
            to='/profile/statistic'
            className='text-semibold mb-3 flex h-fit w-fit gap-x-2 rounded-xl bg-[#4285f4]/[.6] px-2 py-1 text-white hover:bg-[#4285f4]/[.8] lg:text-[18px] 3xl:text-2xl'
          >
            <Icon.ChevronLeft fill='white' className='w-2 3xl:w-3' />
            Quay lại
          </Link>
          <h1 className='mb-3 text-2xl font-semibold text-[#2252641] md:text-center lg:text-[28px] 3xl:text-[36px]'>
            Thống kê môn <span className='md:text-[#4285f4]'>{subject}</span>
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
              <RenderLineChart />
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
              {SubjectStatisticData.map((test, index) => (
                <div className='flex flex-col border-t-[1px] border-t-[#D9D9D9] pt-3' key={index}>
                  <div className='flex justify-between'>
                    <p className='font-medium text-[#252641]'>{test.name}</p>
                    <Link
                      to={test.link}
                      className='font-semibold text-[#252641] underline hover:text-[#4285f4]'
                    >
                      Xem lại
                    </Link>
                  </div>
                  <div className='flex gap-x-2'>
                    <p className='w-[148px] text-[14px] font-medium text-[#252641]'>
                      <span className='text-[#0f9d58]'>Hoàn thành:</span> {test.finishDate}
                    </p>
                    <p className='text-[14px] font-medium text-[#252641]'>
                      <span className='text-[#0f9d58]'>Điểm:</span> {test.grade < 10 && 0}
                      {test.grade.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className='mt-3 hidden w-full md:block'>
              {SubjectStatisticData.map((test, index) => (
                <div
                  className='flex flex-col border-t-[1px] border-t-[#D9D9D9] pt-3 pb-3'
                  key={index}
                >
                  <div className='flex justify-between'>
                    <div className='flex w-[80%] items-center justify-between'>
                      <p className='flex-[6] pl-5 font-medium text-[#252641] lg:text-[18px] 3xl:text-2xl'>
                        {test.name}
                      </p>
                      <p className='flex-[3] font-medium text-[#252641] lg:text-[18px] 3xl:text-2xl'>
                        {test.finishDate}
                      </p>
                      <p className='flex-[1] font-medium text-[#252641] lg:text-[18px] 3xl:text-2xl'>
                        {test.grade < 10 && 0}
                        {test.grade.toFixed(2)}
                      </p>
                    </div>
                    <Link
                      to={test.link}
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
      </main>
      <Footer />
    </Page>
  );
};

export default SubjectStatistic;
