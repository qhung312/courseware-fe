import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { ReactComponent as NoData } from '../../../assets/svgs/NoData.svg';
import { Footer } from '../../../components';
import Icon from '../../../components/Icon';
import ProfileOption from '../../../components/ProfileOption';
import ProgressBar from '../../../components/ProgressBar';
import { useThrottle } from '../../../hooks';
import { Page } from '../../../layout';
import UserService, { GetAllSubjectStatisticReturnType } from '../../../service/user.service';

const Statistic = () => {
  const [isExerciseGradeOpen, setIsExerciseGradeOpen] = useState(false);
  const [isTestGradeOpen, setIsTestGradeOpen] = useState(false);
  const [subjectGrade, setSubjectGrade] = useState<GetAllSubjectStatisticReturnType[]>([]);
  const [mockTestGrade, setMockTestGrade] = useState<GetAllSubjectStatisticReturnType[]>([]);

  const onExerciseGradeStatisticOpen = () => {
    setIsExerciseGradeOpen(!isExerciseGradeOpen);
  };

  const onTestGradeStatisticOpen = () => {
    setIsTestGradeOpen(!isTestGradeOpen);
  };

  useEffect(() => {
    UserService.getAllSubjectStatistic()
      .then((res) => {
        setSubjectGrade(res.data.payload || []);
      })
      .catch(() => {
        toast.error('Lỗi khi lấy dữ liệu thống kê điểm số');
      });
    UserService.getAllMockTestStatistic()
      .then((res) => {
        setMockTestGrade(res.data.payload || []);
      })
      .catch(() => {
        toast.error('Lỗi khi lấy dữ liệu thống kê điểm số');
      });
  }, []);

  const throttledExerciseGradeClick = useThrottle(onExerciseGradeStatisticOpen);
  const throttledTestGradeClick = useThrottle(onTestGradeStatisticOpen);

  return (
    <Page title='Thông tin người dùng - Thống kê điểm số'>
      <main className='with-nav-height w-full overflow-y-auto'>
        {/* Banner */}
        <ProfileOption option={3} editAvatar={false} setAvatar={() => {}} updatedName='' />
        <div className='relative bg-white px-5 pt-4 pb-[64px] md:flex md:justify-center md:gap-x-[2%] md:pt-10 lg:px-[60px]'>
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
                <Icon.EducationHat fill='#4285F4' />
                <p
                  className={`text-xl font-medium ${
                    isExerciseGradeOpen ? 'text-[#4285f4]' : 'text-[#252641]'
                  }`}
                >
                  Điểm trung bình bài tập
                </p>
              </div>
              {isExerciseGradeOpen ? (
                <Icon.ChevronUp fill='#4285f4' fillOpacity={0.87} width={'20px'} />
              ) : (
                <Icon.ChevronDown fill='#252641' fillOpacity={0.87} width={'20px'} />
              )}
            </button>
            {subjectGrade.length === 0 ? (
              <div className='lg:mt-[-16px] lg:w-[69%]'>
                <div className='z-10 rounded-[20px] bg-white px-4 py-3 md:p-5 xl:p-6 2xl:p-7'>
                  <NoData width={200} className='mx-auto w-[200px] p-7 xl:w-[300px]' />
                  <p className='w-full text-center'>Hiện chưa có thống kê điểm số</p>
                </div>
              </div>
            ) : (
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
                {subjectGrade.map((subject, index) => (
                  <div className='flex flex-col items-center' key={index}>
                    <ProgressBar
                      size={160}
                      progress={subject.score}
                      trackWidth={20}
                      trackColor='rgba(187, 187, 187, 0.3)'
                      indicatorWidth={20}
                      indicatorColor='rgb(66, 133, 244)'
                      indicatorCap='square'
                      label='Loadind...'
                      labelColor='#333'
                      spinnerMode={false}
                      spinnerSpeed={1}
                    />
                    <Link
                      to={'/profile/statistic/exercise/' + subject._id}
                      className='h-fit w-[160px] rounded-[12px] bg-[#4285F4] py-2 px-2 text-center font-bold text-white hover:bg-[#4285F4]/[.8]'
                    >
                      {subject.name}
                    </Link>
                  </div>
                ))}
              </nav>
            )}
          </div>
          <div className='mb-6 flex h-[fit-content] w-full flex-col rounded-[20px] border-[1px] border-[#49BBBD]/[.3] bg-white md:hidden'>
            <button
              className='z-20 flex w-full flex-row
              items-center justify-between rounded-[20px] bg-white px-[20px] py-[16px]'
              onClick={throttledTestGradeClick}
            >
              <div className='flex flex-row items-center justify-start gap-x-[16px]'>
                <Icon.DescriptionIcon fill='#4285f4' />
                <p
                  className={`text-xl font-medium ${
                    isTestGradeOpen ? 'text-[#4285f4]' : 'text-[#252641]'
                  }`}
                >
                  Điểm trung bình thi thử
                </p>
              </div>
              {isTestGradeOpen ? (
                <Icon.ChevronUp fill='#4285f4' fillOpacity={0.87} width={'20px'} />
              ) : (
                <Icon.ChevronDown fill='#252641' fillOpacity={0.87} width={'20px'} />
              )}
            </button>
            {mockTestGrade.length === 0 ? (
              <div className='lg:mt-[-16px] lg:w-[69%]'>
                <div className='z-10 rounded-[20px] bg-white px-4 py-3 md:p-5 xl:p-6 2xl:p-7'>
                  <NoData width={200} className='mx-auto w-[200px] p-7 xl:w-[300px]' />
                  <p className='w-full text-center'>Hiện chưa có thống kê điểm số</p>
                </div>
              </div>
            ) : (
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
                {mockTestGrade.map((subject, index) => (
                  <div className='flex flex-col items-center' key={index}>
                    <ProgressBar
                      size={160}
                      progress={subject.score}
                      trackWidth={20}
                      trackColor='rgba(187, 187, 187, 0.3)'
                      indicatorWidth={20}
                      indicatorColor='rgb(66, 133, 244)'
                      indicatorCap='square'
                      label='Loadind...'
                      labelColor='#333'
                      spinnerMode={false}
                      spinnerSpeed={1}
                    />
                    <Link
                      to={'/profile/statistic/mock-test/' + subject._id}
                      className='h-fit w-[160px] rounded-[12px] bg-[#4285f4] py-2 px-2 text-center font-bold text-white hover:bg-[#4285f4]/[.8]'
                    >
                      {subject.name}
                    </Link>
                  </div>
                ))}
              </nav>
            )}
          </div>
          <div className='relative w-[49%] p-5'>
            <div className='absolute top-0 left-0 z-0 hidden h-[140px] w-[140px] rounded-[20px] bg-[#4285F4] md:block' />
            <div className='show-scrollbar relative z-10 hidden h-fit rounded-[20px] bg-white p-4 pb-8 shadow-[0px_19px_47px_0px_rgba(47,50,125,0.1)] md:block md:max-h-[80vh] md:overflow-y-scroll'>
              <h1 className='mb-6 text-center text-2xl font-semibold md:text-lg 2xl:text-xl'>
                Điểm trung bình bài tập
              </h1>
              {subjectGrade.length === 0 ? (
                <div className='lg:mt-[-16px]'>
                  <div className='z-10 rounded-[20px] bg-white px-4 py-3 md:p-5 xl:p-6 2xl:p-7'>
                    <NoData width={200} className='mx-auto w-[200px] p-7 xl:w-[300px]' />
                    <p className='w-full text-center lg:text-[18px] xl:text-xl'>
                      Hiện chưa có thống kê điểm số
                    </p>
                  </div>
                </div>
              ) : (
                <nav
                  className='flex flex-wrap items-start justify-center gap-x-10 gap-y-6 px-[20px] transition-all ease-in-out'
                  style={{
                    maxHeight: 'fit-content',
                    overflow: 'hidden',
                  }}
                >
                  {subjectGrade.map((subject, index) => (
                    <div className='flex flex-col items-center' key={index}>
                      <ProgressBar
                        size={160}
                        progress={subject.score}
                        trackWidth={20}
                        trackColor='rgba(187, 187, 187, 0.3)'
                        indicatorWidth={20}
                        indicatorColor='rgb(66, 133, 244)'
                        indicatorCap='square'
                        label='Loadind...'
                        labelColor='#333'
                        spinnerMode={false}
                        spinnerSpeed={1}
                      />
                      <Link
                        to={'/profile/statistic/exercise/' + subject._id}
                        className='h-fit w-[160px] rounded-[12px] bg-[#4285F4] py-2 px-2 text-center font-bold text-white hover:bg-[#4285F4]/[.8]'
                      >
                        {subject.name}
                      </Link>
                    </div>
                  ))}
                </nav>
              )}
            </div>
          </div>
          <div className='relative w-[49%] p-5'>
            <div className='absolute bottom-0 right-0 z-0 hidden h-[140px] w-[140px] rounded-[20px] bg-[#4285F4] md:block' />
            <div className='show-scrollbar relative z-10 hidden h-fit rounded-[20px] bg-white p-4 pb-8 shadow-[0px_19px_47px_0px_rgba(47,50,125,0.1)] md:block md:max-h-[80vh] md:overflow-y-scroll'>
              <h1 className='mb-6 text-center text-2xl font-semibold text-[#2252641] md:text-lg 2xl:text-xl'>
                Điểm trung bình thi thử
              </h1>
              {mockTestGrade.length === 0 ? (
                <div className='lg:mt-[-16px]'>
                  <div className='z-10 rounded-[20px] bg-white px-4 py-3 md:p-5 xl:p-6 2xl:p-7'>
                    <NoData width={200} className='mx-auto w-[200px] p-7 xl:w-[300px]' />
                    <p className='w-full text-center lg:text-[18px] xl:text-xl'>
                      Hiện chưa có thống kê điểm số
                    </p>
                  </div>
                </div>
              ) : (
                <nav
                  className='flex flex-wrap items-center justify-center gap-x-10 gap-y-6 px-[20px] transition-all ease-in-out'
                  style={{
                    maxHeight: 'fit-content',
                    overflow: 'hidden',
                  }}
                >
                  {mockTestGrade.map((subject, index) => (
                    <div className='flex flex-col items-center' key={index}>
                      <ProgressBar
                        size={160}
                        progress={subject.score}
                        trackWidth={20}
                        trackColor='rgba(187, 187, 187, 0.3)'
                        indicatorWidth={20}
                        indicatorColor='rgb(66, 133, 244)'
                        indicatorCap='square'
                        label='Loadind...'
                        labelColor='#333'
                        spinnerMode={false}
                        spinnerSpeed={1}
                      />
                      <Link
                        to={'/profile/statistic/mock-test/' + subject._id}
                        className='h-fit w-[160px] rounded-[12px] bg-[#4285f4] py-2 px-2 text-center font-bold text-white hover:bg-[#4285f4]/[.8]'
                      >
                        {subject.name}
                      </Link>
                    </div>
                  ))}
                </nav>
              )}
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </Page>
  );
};

export default Statistic;
