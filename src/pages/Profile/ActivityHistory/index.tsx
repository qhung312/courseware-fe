import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { ReactComponent as NoData } from '../../../assets/svgs/NoData.svg';
import { Footer, Pagination } from '../../../components';
import CopyIcon from '../../../components/CopyIcon';
import Icon from '../../../components/Icon';
import DeleteModal from '../../../components/Modal/DeleteModal';
import ProfileOption from '../../../components/ProfileOption';
import { API_URL } from '../../../config';
import { useThrottle, useDebounce } from '../../../hooks';
import { Page } from '../../../layout';
import UserService, { ActivityReturnType } from '../../../service/user.service';
import useBoundStore from '../../../store';

const ActivityHistory = () => {
  const user = useBoundStore.use.user();
  const [page, setPage] = useState(1);
  const [filterOption, setFilterOption] = useState(0);
  const [deleteModal, setDeleteModal] = useState({
    show: false,
    deleteId: '',
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activities, setActivities] = useState<ActivityReturnType[]>([]);
  const [totalActivity, setTotalActivity] = useState({
    currentTotal: 0,
    viewMaterial: 0,
    viewExercise: 0,
    viewPreviousExam: 0,
    viewExamSession: 0,
  });

  const onFilterClick = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const epochToDateString = (epochTime: number): string => {
    const date = new Date(epochTime);

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    const hour = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${hour} giờ ${minutes} phút, ${day} tháng ${month} năm ${year}`;
  };

  const fetchActivities = useDebounce(() => {
    setLoading(true);
    let type = '';
    if (filterOption === 1) type = 'VIEW_MATERIAL';
    else if (filterOption === 2) type = 'START_QUIZ_SESSION';
    else if (filterOption === 3) type = 'VIEW_PREVIOUS_EXAM';
    else if (filterOption === 4) type = 'START_EXAM_SESSION';
    UserService.getUserActivity({ activityType: type, pageSize: 5, pageNumber: page })
      .then((res) => {
        const { results: allActivities, count, total } = res.data.payload;
        setActivities(allActivities);
        setTotalActivity({
          currentTotal: total,
          viewMaterial: count?.VIEW_MATERIAL,
          viewExercise: count?.START_QUIZ_SESSION,
          viewPreviousExam: count?.VIEW_PREVIOUS_EXAM,
          viewExamSession: count?.START_EXAM_SESSION,
        });
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  });

  const deleteActivity = (activityId: string) => {
    UserService.deleteUserActivity(activityId)
      .then(() => {
        toast.success('Xóa hoạt động thành công');
        fetchActivities();
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  useEffect(() => {
    fetchActivities();
  }, [filterOption, fetchActivities, page]);

  const throttledLibraryClick = useThrottle(onFilterClick);

  return (
    <Page title='Thông tin người dùng - Lịch sử hoạt động'>
      <DeleteModal
        text='Hoạt động này sẽ bị xóa khỏi lịch sử hoạt động của bạn'
        onClose={() => {
          setDeleteModal({
            show: false,
            deleteId: '',
          });
        }}
        onDelete={() => deleteActivity(deleteModal.deleteId)}
        show={deleteModal.show}
      />
      <main className='with-nav-height w-full overflow-y-auto'>
        {/* Banner */}
        <ProfileOption option={2} editAvatar={false} setAvatar={() => {}} updatedName='' />
        <div className='bg-white px-5 pt-4 pb-[64px] lg:flex lg:gap-x-[2%] lg:pt-10'>
          <h1 className='mb-3 text-2xl font-semibold text-[#2252641] md:text-xl lg:hidden'>
            Nhật ký hoạt động
          </h1>
          <div className='mb-6 flex h-[fit-content] w-full flex-col rounded-[20px] border-[1px] border-[#49BBBD]/[.3] bg-white lg:hidden'>
            <button
              className='z-20 flex w-full flex-row
              items-center justify-between rounded-[20px] bg-white px-[20px] py-[16px]'
              onClick={throttledLibraryClick}
            >
              <div className='flex flex-row items-center justify-start gap-x-[16px]'>
                <Icon.FilterIcon fill={isFilterOpen ? '#49BBBD' : '#4285f4'} />
                <p
                  className={`text-xl font-medium ${
                    isFilterOpen ? 'text-[#49BBBD]' : 'text-[#252641]'
                  }`}
                >
                  Bộ lọc
                </p>
              </div>
              {isFilterOpen ? (
                <Icon.ChevronUp fill='#49BBBD' fillOpacity={0.87} width={'20px'} />
              ) : (
                <Icon.ChevronDown fill='#252641' fillOpacity={0.87} width={'20px'} />
              )}
            </button>
            <nav
              className='flex flex-col px-[20px] transition-all ease-in-out'
              style={{
                maxHeight: isFilterOpen ? '300px' : '0px',
                overflow: 'hidden',
                transitionDuration: isFilterOpen ? '1.2s' : '0.8s',
              }}
            >
              <button
                className='flex w-full flex-row items-center justify-between
                border-t-[1px] border-[#D9D9D9] py-3'
                onClick={() => {
                  if (filterOption === 1) setFilterOption(0);
                  else setFilterOption(1);
                  setPage(1);
                }}
              >
                <div className='flex items-center'>
                  {filterOption === 1 ? (
                    <div className='mr-2 h-5 w-5 rounded-full border-[1px] border-[#49BBBD]'>
                      <Icon.CheckIcon fill='#49BBBD' />
                    </div>
                  ) : (
                    <div className='mr-2 h-5 w-5 rounded-full border-[1px] border-[#D9D9D9]' />
                  )}
                  <p
                    className={`font-medium ${
                      filterOption === 1 ? 'text-[#49BBBD]' : 'text-[#252641]'
                    }`}
                  >
                    Tài liệu học tập
                  </p>
                </div>
                <p
                  className={`text-[14px] font-medium ${
                    filterOption === 1 ? 'text-[#49BBBD]' : 'text-[#252641]'
                  }`}
                >
                  {totalActivity.viewMaterial} hoạt động
                </p>
              </button>
              <button
                className='flex w-full flex-row items-center justify-between
                border-t-[1px] border-[#D9D9D9] py-3'
                onClick={() => {
                  if (filterOption === 2) setFilterOption(0);
                  else setFilterOption(2);
                  setPage(1);
                }}
              >
                <div className='flex items-center'>
                  {filterOption === 2 ? (
                    <div className='mr-2 h-5 w-5 rounded-full border-[1px] border-[#49BBBD]'>
                      <Icon.CheckIcon fill='#49BBBD' />
                    </div>
                  ) : (
                    <div className='mr-2 h-5 w-5 rounded-full border-[1px] border-[#D9D9D9]' />
                  )}
                  <p
                    className={`font-medium ${
                      filterOption === 2 ? 'text-[#49BBBD]' : 'text-[#252641]'
                    }`}
                  >
                    Bài tập rèn luyện
                  </p>
                </div>
                <p
                  className={`text-[14px] font-medium ${
                    filterOption === 2 ? 'text-[#49BBBD]' : 'text-[#252641]'
                  }`}
                >
                  {totalActivity.viewExercise} hoạt động
                </p>
              </button>
              <button
                className='flex w-full flex-row items-center justify-between
                border-t-[1px] border-[#D9D9D9] py-3'
                onClick={() => {
                  if (filterOption === 3) setFilterOption(0);
                  else setFilterOption(3);
                  setPage(1);
                }}
              >
                <div className='flex items-center'>
                  {filterOption === 3 ? (
                    <div className='mr-2 h-5 w-5 rounded-full border-[1px] border-[#49BBBD]'>
                      <Icon.CheckIcon fill='#49BBBD' />
                    </div>
                  ) : (
                    <div className='mr-2 h-5 w-5 rounded-full border-[1px] border-[#D9D9D9]' />
                  )}
                  <p
                    className={`font-medium ${
                      filterOption === 3 ? 'text-[#49BBBD]' : 'text-[#252641]'
                    }`}
                  >
                    Đề thi
                  </p>
                </div>
                <p
                  className={`text-[14px] font-medium ${
                    filterOption === 3 ? 'text-[#49BBBD]' : 'text-[#252641]'
                  }`}
                >
                  {totalActivity.viewPreviousExam} hoạt động
                </p>
              </button>
              <button
                className='flex w-full flex-row items-center justify-between
                border-t-[1px] border-[#D9D9D9] py-3'
                onClick={() => {
                  if (filterOption === 4) setFilterOption(0);
                  else setFilterOption(4);
                  setPage(1);
                }}
              >
                <div className='flex items-center'>
                  {filterOption === 4 ? (
                    <div className='mr-2 h-5 w-5 rounded-full border-[1px] border-[#49BBBD]'>
                      <Icon.CheckIcon fill='#49BBBD' />
                    </div>
                  ) : (
                    <div className='mr-2 h-5 w-5 rounded-full border-[1px] border-[#D9D9D9]' />
                  )}
                  <p
                    className={`font-medium ${
                      filterOption === 4 ? 'text-[#49BBBD]' : 'text-[#252641]'
                    }`}
                  >
                    Thi thử
                  </p>
                </div>
                <p
                  className={`text-[14px] font-medium ${
                    filterOption === 4 ? 'text-[#49BBBD]' : 'text-[#252641]'
                  }`}
                >
                  {totalActivity.viewExamSession} hoạt động
                </p>
              </button>
            </nav>
          </div>
          <div className='hidden h-fit w-[29%] rounded-[20px] bg-white p-4 shadow-[0px_19px_47px_0px_rgba(47,50,125,0.1)] lg:block'>
            <h1 className='mb-3 text-xl font-semibold text-[#2252641] md:text-lg 2xl:text-xl'>
              Nhật ký hoạt động
            </h1>
            <div className='mt-2 flex items-center'>
              <div className='mr-2 flex h-[28px] w-[28px] items-center justify-center rounded-full bg-[#4285f4]'>
                <Icon.FilterIcon fill='#FFFFFF' className='h-4 w-4' />
              </div>
              <p className='font-semibold text-[#5B5B5B] 2xl:text-[18px]'>Bộ lọc</p>
            </div>
            <div className='mt-4 mb-5 h-[1px] w-full bg-[#696984]' />
            <button
              className={`flex w-full items-end justify-between rounded-[20px] border-[1px] border-[#49BBBD]/[0.3] px-3 py-3 hover:bg-[#9DCCFF]/[.3] 2xl:px-4 ${
                filterOption === 1 && 'bg-[#9DCCFF]/[.3]'
              }`}
              onClick={() => {
                if (filterOption === 1) setFilterOption(0);
                else setFilterOption(1);
                setPage(1);
              }}
            >
              <h3 className='font-medium text-[#252641] 2xl:text-[18px]'>Tài liệu học tập</h3>
              <p className='2xl:text-base'>{totalActivity.viewMaterial} hoạt động</p>
              {/* <div className='flex w-full items-center justify-between text-[12px] text-[#252641]/[.8]'>
                <div className='flex items-center'>
                  <Icon.Clock className='mr-1 h-4 w-4' fill='#252641' />
                  <p className='2xl:text-base'>{lastUpdate.viewMaterial}</p>
                </div>
                
              </div> */}
            </button>
            <button
              className={`mt-3 flex w-full items-end justify-between rounded-[20px] border-[1px] border-[#49BBBD]/[0.3] px-3 py-3 hover:bg-[#9DCCFF]/[.3] 2xl:px-4 ${
                filterOption === 2 && 'bg-[#9DCCFF]/[.3]'
              }`}
              onClick={() => {
                if (filterOption === 2) setFilterOption(0);
                else setFilterOption(2);
                setPage(1);
              }}
            >
              <h3 className='font-medium text-[#252641] 2xl:text-[18px]'>Bài tập rèn luyện</h3>
              <p className='2xl:text-base'>{totalActivity.viewExercise} hoạt động</p>
            </button>
            <button
              className={`mt-3 flex w-full items-end justify-between rounded-[20px] border-[1px] border-[#49BBBD]/[0.3] px-3 py-3 hover:bg-[#9DCCFF]/[.3] 2xl:px-4 ${
                filterOption === 3 && 'bg-[#9DCCFF]/[.3]'
              }`}
              onClick={() => {
                if (filterOption === 3) setFilterOption(0);
                else setFilterOption(3);
                setPage(1);
              }}
            >
              <h3 className='font-medium text-[#252641] 2xl:text-[18px]'>Đề thi</h3>
              <p className='2xl:text-base'>{totalActivity.viewPreviousExam} hoạt động</p>
            </button>
            <button
              className={`mt-3 flex w-full items-end justify-between rounded-[20px] border-[1px] border-[#49BBBD]/[0.3] px-3 py-3 hover:bg-[#9DCCFF]/[.3] 2xl:px-4 ${
                filterOption === 4 && 'bg-[#9DCCFF]/[.3]'
              }`}
              onClick={() => {
                if (filterOption === 4) setFilterOption(0);
                else setFilterOption(4);
                setPage(1);
              }}
            >
              <h3 className='font-medium text-[#252641] 2xl:text-[18px]'>Thi thử</h3>
              <p className='2xl:text-base'>{totalActivity.viewExamSession} hoạt động</p>
            </button>
          </div>
          {loading && (
            <>
              <p className='w-full px-6 lg:w-[69%] lg:px-8 3xl:px-10'>
                {
                  <Skeleton
                    count={10}
                    className='my-2 box-content lg:my-4 3xl:my-6'
                    width={'100%'}
                    height={40}
                    baseColor='#9DCCFF'
                  />
                }
              </p>
            </>
          )}
          {!loading && activities.length !== 0 && (
            <div className='lg:mt-[-16px] lg:min-h-[600px] lg:w-[69%]'>
              {activities.map((activity, index) => (
                <div className='mt-4' key={index}>
                  <div className='flex flex-col rounded-[20px] bg-white p-4 shadow-[0px_19px_47px_0px_rgba(47,50,125,0.1)]'>
                    <p className='text-xl text-[rgba(45,52,54,0.7)] md:text-base 3xl:text-xl'>
                      {activity.createdAt
                        ? epochToDateString(activity.createdAt)
                        : '00 thàng 00 năm 0000'}
                    </p>
                    <Link
                      to={
                        activity.type === 'VIEW_MATERIAL'
                          ? `/library/material/${activity?.materialId?.subject?._id || ''}/pdf/${
                              activity?.materialId?._id || ''
                            }`
                          : activity.type === 'VIEW_PREVIOUS_EXAM'
                          ? `/library/exam-archive/${
                              activity?.previousExamId?.subject?._id || ''
                            }/pdf/${activity?.previousExamId?._id || ''}`
                          : activity.type === 'START_QUIZ_SESSION'
                          ? `/room/exercises/${activity?.quizSessionId?.fromQuiz?.subject?._id}/quiz/${activity?.quizSessionId?.fromQuiz._id}/review/session/${activity?.quizSessionId?._id}`
                          : activity.type === 'START_EXAM_SESSION'
                          ? `/room/tests/review/session/${activity?.examSessionId?._id || ''}`
                          : '/'
                      }
                      className='mt-1 text-2xl text-[#2D3436] md:text-xl 3xl:text-2xl'
                    >
                      {activity.type === 'VIEW_PREVIOUS_EXAM'
                        ? (user?.familyAndMiddleName || '') +
                          ' ' +
                          (user?.givenName || '') +
                          ' đã truy cập đề thi' +
                          (activity?.previousExamId?.type === 'FINAL_EXAM'
                            ? ' Cuối kì '
                            : ' Giữa kì ') +
                          'môn ' +
                          (activity?.previousExamId?.subject?.name || '')
                        : activity.type === 'VIEW_MATERIAL'
                        ? (user?.familyAndMiddleName || '') +
                          ' ' +
                          (user?.givenName || '') +
                          ' đã truy cập Tài liệu ' +
                          (activity?.materialId?.name || '') +
                          ' môn ' +
                          (activity?.materialId?.subject?.name || '')
                        : activity.type === 'START_QUIZ_SESSION'
                        ? (user?.familyAndMiddleName || '') +
                          ' ' +
                          (user?.givenName || '') +
                          ' đã bắt đầu làm Bài tập rèn luyện môn ' +
                          (activity?.quizSessionId?.fromQuiz?.subject?.name || '')
                        : activity.type === 'START_EXAM_SESSION'
                        ? (user?.familyAndMiddleName || '') +
                          ' ' +
                          (user?.givenName || '') +
                          ' đã tham gia thi thử môn ' +
                          (activity?.examSessionId?.fromExam?.subject?.name || '')
                        : ''}
                    </Link>
                    <div className='mt-3 flex justify-between' onClick={(e) => e.preventDefault()}>
                      <div className='flex items-center'>
                        <Icon.OpenBook />
                        <p className='ml-2 text-[#5B5B5B] xl:text-base 2xl:text-[18px]'>
                          {activity.type === 'VIEW_PREVIOUS_EXAM'
                            ? 'Học kì ' +
                              (activity?.previousExamId?.semester
                                ? activity?.previousExamId?.semester.slice(9, 12)
                                : '')
                            : activity.type === 'VIEW_MATERIAL'
                            ? activity?.materialId?.subject?.name || ''
                            : activity.type === 'START_QUIZ_SESSION'
                            ? activity?.quizSessionId?.fromQuiz?.chapter?.name || ''
                            : activity.type === 'START_EXAM_SESSION'
                            ? 'Học kì ' +
                              (activity?.examSessionId?.fromExam?.semester
                                ? activity?.examSessionId?.fromExam?.semester.slice(9, 12)
                                : '')
                            : ''}
                        </p>
                      </div>
                      <div
                        className='ml-auto flex w-fit justify-end'
                        onClick={(e) => e.preventDefault()}
                      >
                        <CopyIcon
                          copyContent={
                            activity.type === 'VIEW_MATERIAL'
                              ? `${API_URL}library/material/${
                                  activity?.materialId?.subject?._id || ''
                                }/pdf/${activity?.materialId?._id || ''}`
                              : activity.type === 'VIEW_PREVIOUS_EXAM'
                              ? `${API_URL}exam-archive/${
                                  activity?.previousExamId?.subject?._id || ''
                                }/pdf/${activity?.previousExamId?._id || ''}`
                              : activity.type === 'START_QUIZ_SESSION'
                              ? `${API_URL}room/exercises/${
                                  activity?.quizSessionId?.fromQuiz?.subject?._id || ''
                                }/quiz/${activity?.quizSessionId?._id || ''}`
                              : activity.type === 'START_EXAM_SESSION'
                              ? `${API_URL}room/tests/review/session/${
                                  activity?.examSessionId?._id || ''
                                }`
                              : API_URL
                          }
                        />
                        <button
                          className='ml-1 flex h-7 w-7 items-center justify-center rounded-full bg-[#DB4437] hover:bg-[#DB4437]/[.8]'
                          onClick={() =>
                            setDeleteModal({
                              show: true,
                              deleteId: activity._id,
                            })
                          }
                        >
                          <Icon.Delete fill='white' className='h-4 w-4' />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className='mt-9' />
              <Pagination
                currentPage={page}
                totalCount={totalActivity.currentTotal}
                pageSize={5}
                onPageChange={setPage}
              />
            </div>
          )}
          {!loading && activities.length === 0 && (
            <div className='lg:mt-[-16px] lg:min-h-[600px] lg:w-[69%]'>
              <div className='z-10 rounded-[20px] bg-white px-4 py-3 md:p-5 xl:p-6 2xl:p-7'>
                <NoData width={200} className='mx-auto w-[200px] p-7 xl:w-[300px]' />
                <p className='w-full text-center'>Hiện chưa có hoạt động nào</p>
              </div>
            </div>
          )}
        </div>
        <Footer />
      </main>
    </Page>
  );
};

export default ActivityHistory;
