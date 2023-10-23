import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { useState } from 'react';

import { Footer } from '../../../components';
import Icon from '../../../components/Icon';
import ProfileOption from '../../../components/ProfileOption';
import ProgressBar from '../../../components/ProgressBar';
import { useThrottle } from '../../../hooks';
import { Page } from '../../../layout';

type SubjectGrade = {
  name: string;
  grade: number;
};

const demoExerciseGrade: SubjectGrade[] = [
  {
    name: 'Giải tích 1',
    grade: 5.41,
  },
  {
    name: 'Vật lý 1',
    grade: 6.25,
  },
  {
    name: 'Đại số tuyến tính',
    grade: 7.5,
  },
  {
    name: 'Xác suất thống kê',
    grade: 10,
  },
];

const Statistic = () => {
  const [currentOption, setCurrentOption] = useState(3);
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
        <ProfileOption option={currentOption} setOption={(opt) => setCurrentOption(opt)} />
        <div className='bg-white px-5 pt-4 pb-[64px] lg:flex lg:gap-x-[2%] lg:pt-10'>
          <h1 className='mb-3 text-2xl font-semibold text-[#2252641] md:text-xl lg:hidden'>
            Thống kê điểm số
          </h1>
          <div className='mb-5 flex h-fit w-full flex-col rounded-[20px] border-[1px] border-[#49BBBD]/[.3] bg-white lg:hidden'>
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
                  <button className='h-fit w-[160px] rounded-[12px] bg-[#49BBBD] py-2 px-2 font-bold text-white'>
                    {subject.name}
                  </button>
                </div>
              ))}
            </nav>
          </div>
          <div className='mb-6 flex h-[fit-content] w-full flex-col rounded-[20px] border-[1px] border-[#49BBBD]/[.3] bg-white lg:hidden'>
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
                  <button className='h-fit w-[160px] rounded-[12px] bg-[#49BBBD] py-2 px-2 font-bold text-white'>
                    {subject.name}
                  </button>
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
