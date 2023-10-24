import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { Footer } from '../../../components';
import Icon from '../../../components/Icon';
import ProfileOption from '../../../components/ProfileOption';
import ProgressBar from '../../../components/ProgressBar';
import { useThrottle } from '../../../hooks';
import { Page } from '../../../layout';

type SubjectGrade = {
  name: string;
  grade: number;
  link: string;
};

const demoExerciseGrade: SubjectGrade[] = [
  {
    name: 'Giải tích 1',
    grade: 5.41,
    link: '1',
  },
  {
    name: 'Vật lý 1',
    grade: 6.25,
    link: '2',
  },
  {
    name: 'Đại số tuyến tính',
    grade: 7.5,
    link: '3',
  },
  {
    name: 'Xác suất thống kê',
    grade: 10,
    link: '4',
  },
  {
    name: 'Giải tích 2',
    grade: 5.41,
    link: '5',
  },
  {
    name: 'Vật lý 2',
    grade: 6.25,
    link: '6',
  },
];

const Statistic = () => {
  const [isTestGradeOpen, setIsTestGradeOpen] = useState(false);
  const [isExerciseGradeOpen, setIsExerciseGradeOpen] = useState(false);

  const onTestGradeStatisticOpen = () => {
    setIsTestGradeOpen(!isTestGradeOpen);
  };

  const onExerciseGradeStatisticOpen = () => {
    setIsExerciseGradeOpen(!isExerciseGradeOpen);
  };

  const throttledTestGradeClick = useThrottle(onTestGradeStatisticOpen);

  const throttledExerciseGradeClick = useThrottle(onExerciseGradeStatisticOpen);

  return (
    <Page title='Thông tin người dùng - Thống kê điểm số'>
      <main className='w-full'>
        {/* Banner */}
        <ProfileOption option={3} />
        <div className='relative bg-white px-5 pt-4 pb-[64px] md:flex md:gap-x-[2%] md:pt-10 lg:px-[60px]'>
          <div className='absolute bottom-10 right-0 z-0 hidden h-[220px] w-[220px] rounded-[20px] bg-[#33EFA0] md:block lg:right-10' />
          <div className='absolute top-5 left-0 z-0 hidden h-[140px] w-[140px] rounded-[20px] bg-[#23BDEE] md:block lg:left-10' />
          <h1 className='mb-3 text-2xl font-semibold text-[#2252641] md:hidden md:text-xl'>
            Thống kê điểm số
          </h1>
          <div className='mb-5 flex h-fit w-full flex-col rounded-[20px] border-[1px] border-[#49BBBD]/[.3] bg-white md:hidden'>
            <button
              className='z-20 flex w-full flex-row
              items-center justify-between rounded-[20px] bg-white px-[20px] py-[16px]'
              onClick={throttledExerciseGradeClick}
            >
              <div className='flex flex-row items-center justify-start gap-x-[16px]'>
                <Icon.EducationHat fill={isExerciseGradeOpen ? '#49BBBD' : '#4285f4'} />
                <p
                  className={`text-xl font-medium ${
                    isExerciseGradeOpen ? 'text-[#49BBBD]' : 'text-[#252641]'
                  }`}
                >
                  Điểm trung bình bài tập
                </p>
              </div>
              {isExerciseGradeOpen ? (
                <Icon.ChevronUp fill='#49BBBD' fillOpacity={0.87} width={'20px'} />
              ) : (
                <Icon.ChevronDown fill='#252641' fillOpacity={0.87} width={'20px'} />
              )}
            </button>
            <nav
              className={`flex flex-wrap items-center justify-center gap-x-6 gap-y-6 px-[20px] transition-all ease-in-out ${
                isExerciseGradeOpen && 'mb-8'
              }`}
              style={{
                maxHeight: isExerciseGradeOpen ? 'fit-content' : '0px',
                overflow: 'hidden',
                transitionDuration: isExerciseGradeOpen ? '1.2s' : '0.8s',
              }}
            >
              {demoExerciseGrade.map((subject, index) => (
                <div className='flex flex-col items-center' key={index}>
                  <ProgressBar
                    size={160}
                    progress={subject.grade}
                    trackWidth={20}
                    trackColor='rgba(187, 187, 187, 0.50)'
                    indicatorWidth={20}
                    indicatorColor='rgba(73, 187, 189, 0.50)'
                    indicatorCap='square'
                    label='Loadind...'
                    labelColor='#333'
                    spinnerMode={false}
                    spinnerSpeed={1}
                  />
                  <Link
                    to={subject.link}
                    className='h-fit w-[160px] rounded-[12px] bg-[#49BBBD] py-2 px-2 text-center font-bold text-white hover:bg-[#49BBBD]/[.8]'
                  >
                    {subject.name}
                  </Link>
                </div>
              ))}
            </nav>
          </div>
          <div className='mb-6 flex h-[fit-content] w-full flex-col rounded-[20px] border-[1px] border-[#49BBBD]/[.3] bg-white md:hidden'>
            <button
              className='z-20 flex w-full flex-row
              items-center justify-between rounded-[20px] bg-white px-[20px] py-[16px]'
              onClick={throttledTestGradeClick}
            >
              <div className='flex flex-row items-center justify-start gap-x-[16px]'>
                <Icon.DescriptionIcon fill={isTestGradeOpen ? '#49BBBD' : '#4285f4'} />
                <p
                  className={`text-xl font-medium ${
                    isTestGradeOpen ? 'text-[#49BBBD]' : 'text-[#252641]'
                  }`}
                >
                  Điểm trung bình kiểm tra
                </p>
              </div>
              {isTestGradeOpen ? (
                <Icon.ChevronUp fill='#49BBBD' fillOpacity={0.87} width={'20px'} />
              ) : (
                <Icon.ChevronDown fill='#252641' fillOpacity={0.87} width={'20px'} />
              )}
            </button>
            <nav
              className={`flex flex-wrap items-center justify-center gap-x-6 gap-y-6 px-[20px] transition-all ease-in-out ${
                isTestGradeOpen && 'mb-8'
              }`}
              style={{
                maxHeight: isTestGradeOpen ? 'fit-content' : '0px',
                overflow: 'hidden',
                transitionDuration: isTestGradeOpen ? '1.2s' : '0.8s',
              }}
            >
              {demoExerciseGrade.map((subject, index) => (
                <div className='flex flex-col items-center' key={index}>
                  <ProgressBar
                    size={160}
                    progress={subject.grade}
                    trackWidth={20}
                    trackColor='rgba(187, 187, 187, 0.50)'
                    indicatorWidth={20}
                    indicatorColor='rgba(73, 187, 189, 0.50)'
                    indicatorCap='square'
                    label='Loadind...'
                    labelColor='#333'
                    spinnerMode={false}
                    spinnerSpeed={1}
                  />
                  <Link
                    to={subject.link}
                    className='h-fit w-[160px] rounded-[12px] bg-[#49BBBD] py-2 px-2 text-center font-bold text-white hover:bg-[#49BBBD]/[.8]'
                  >
                    {subject.name}
                  </Link>
                </div>
              ))}
            </nav>
          </div>
          <div className='show-scrollbar z-10 hidden h-fit w-[49%] rounded-[20px] bg-white p-4 pb-8 shadow-[0px_19px_47px_0px_rgba(47,50,125,0.1)] md:block md:max-h-[80vh] md:overflow-y-scroll'>
            <h1 className='mb-6 text-center text-2xl font-semibold text-[#2252641] md:text-xl 2xl:text-[26px]'>
              Điểm trung bình bài tập
            </h1>
            <nav
              className='flex flex-wrap items-center justify-center gap-x-10 gap-y-6 px-[20px] transition-all ease-in-out'
              style={{
                maxHeight: 'fit-content',
                overflow: 'hidden',
              }}
            >
              {demoExerciseGrade.map((subject, index) => (
                <div className='flex flex-col items-center' key={index}>
                  <ProgressBar
                    size={160}
                    progress={subject.grade}
                    trackWidth={20}
                    trackColor='rgba(187, 187, 187, 0.50)'
                    indicatorWidth={20}
                    indicatorColor='rgba(73, 187, 189, 0.50)'
                    indicatorCap='square'
                    label='Loadind...'
                    labelColor='#333'
                    spinnerMode={false}
                    spinnerSpeed={1}
                  />
                  <Link
                    to={subject.link}
                    className='h-fit w-[160px] rounded-[12px] bg-[#49BBBD] py-2 px-2 text-center font-bold text-white hover:bg-[#49BBBD]/[.8]'
                  >
                    {subject.name}
                  </Link>
                </div>
              ))}
            </nav>
          </div>
          <div className='show-scrollbar z-10 hidden h-fit w-[49%] rounded-[20px] bg-white p-4 pb-8 shadow-[0px_19px_47px_0px_rgba(47,50,125,0.1)] md:block md:max-h-[80vh] md:overflow-y-scroll'>
            <h1 className='mb-6 text-center text-2xl font-semibold text-[#2252641] md:text-xl 2xl:text-[26px]'>
              Điểm trung bình kiểm tra
            </h1>
            <nav
              className='flex flex-wrap items-center justify-center gap-x-10 gap-y-6 px-[20px] transition-all ease-in-out'
              style={{
                maxHeight: 'fit-content',
                overflow: 'hidden',
              }}
            >
              {demoExerciseGrade.map((subject, index) => (
                <div className='flex flex-col items-center' key={index}>
                  <ProgressBar
                    size={160}
                    progress={subject.grade}
                    trackWidth={20}
                    trackColor='rgba(187, 187, 187, 0.50)'
                    indicatorWidth={20}
                    indicatorColor='rgba(73, 187, 189, 0.50)'
                    indicatorCap='square'
                    label='Loadind...'
                    labelColor='#333'
                    spinnerMode={false}
                    spinnerSpeed={1}
                  />
                  <Link
                    to={subject.link}
                    className='h-fit w-[160px] rounded-[12px] bg-[#49BBBD] py-2 px-2 text-center font-bold text-white hover:bg-[#49BBBD]/[.8]'
                  >
                    {subject.name}
                  </Link>
                </div>
              ))}
            </nav>
          </div>
        </div>
      </main>
      <Footer />
    </Page>
  );
};

export default Statistic;
