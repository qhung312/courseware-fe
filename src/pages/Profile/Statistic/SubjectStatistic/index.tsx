import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { useState } from 'react';
import { Link } from 'react-router-dom';

import DemoLineChart from '../../../../assets/images/DemoLineChart.png';
import { Footer } from '../../../../components';
import Icon from '../../../../components/Icon';
import ProfileOption from '../../../../components/ProfileOption';
import { Page } from '../../../../layout';

interface SubjectStatisticProps {
  name: string;
  grade: number;
  link: string;
}
const SubjectStatisticData: SubjectStatisticProps[] = [
  {
    name: 'Bài tập rèn luyện chương 1',
    grade: 10,
    link: '/statistic',
  },
  {
    name: 'Bài tập rèn luyện chương 2',
    grade: 0,
    link: '/statistic',
  },
  {
    name: 'Bài tập rèn luyện chương 3',
    grade: 5,
    link: '/statistic',
  },
  {
    name: 'Bài tập rèn luyện chương 4',
    grade: 6.25,
    link: '/statistic',
  },
  {
    name: 'Bài tập rèn luyện chương 5',
    grade: 7.5,
    link: '/statistic',
  },
];

const SubjectStatistic = () => {
  const [currentOption, setCurrentOption] = useState(3);

  return (
    <Page title='Thông tin người dùng - Thống kê điểm số'>
      <main className='w-full'>
        {/* Banner */}
        <ProfileOption option={currentOption} setOption={(opt) => setCurrentOption(opt)} />
        <div className='relative bg-white px-5 pt-4 pb-[64px] md:flex md:gap-x-[2%] md:pt-10 lg:px-[60px]'>
          <Link
            to='/profile/statistic'
            className='text-semibold mb-3 flex h-fit w-fit gap-x-2 rounded-xl bg-[#4285f4]/[.6] px-2 py-1 text-white'
          >
            <Icon.ChevronLeft fill='white' className='w-2' />
            Quay lại
          </Link>
          <h1 className='mb-3 text-2xl font-semibold text-[#2252641] md:hidden md:text-xl'>
            Thống kê môn Giải tích 1
          </h1>
          <div className='mb-6 flex h-[fit-content] w-full flex-col rounded-[20px] border-[1px] border-[#49BBBD]/[.3] bg-white px-[20px] py-[16px]'>
            <div className='flex flex-row items-center justify-start gap-x-2'>
              <Icon.EqualizerIcon fill='#49BBBD' />
              <p className='text-xl font-medium text-[#49BBBD]'>Thống kê điểm số</p>
            </div>
            <div className='mt-4 h-[1px] w-full bg-[#D9D9D9]' />
            <div className='mt-5'>
              <p className='text-semibold text-sm text-[#696969]'>Điểm</p>
              <img src={DemoLineChart} alt='Demo Line Chart' className='h-fit w-full' />
            </div>
          </div>
          <div className='mb-6 flex h-[fit-content] w-full flex-col rounded-[20px] border-[1px] border-[#49BBBD]/[.3] bg-white px-[20px] py-[16px]'>
            <div className='flex flex-row items-center justify-start gap-x-2'>
              <Icon.ClipboardIcon fill='#49BBBD' />
              <p className='text-xl font-medium text-[#49BBBD]'>Lịch sử làm bài</p>
            </div>
            <div className='mt-6 flex items-center gap-x-2'>
              <div className='h-4 w-4 rounded-full bg-[#49BBBD]' />
              <p className='font-medium text-[#49BBBD]'>Danh sách các bài kiểm tra</p>
            </div>
            <div className='mt-3 w-full'>
              {SubjectStatisticData.map((test, index) => (
                <div className='flex flex-col border-t-[1px] border-t-[#D9D9D9] pt-3' key={index}>
                  <div className='flex justify-between'>
                    <p className='font-medium text-[#252641]'>{test.name}</p>
                    <Link to={test.link} className='font-semibold text-[#252641] underline'>
                      Xem lại
                    </Link>
                  </div>
                  <p className='text-[14px] font-medium text-[#252641]'>
                    Điểm: {test.grade < 10 && 0}
                    {test.grade.toFixed(2)}
                  </p>
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
