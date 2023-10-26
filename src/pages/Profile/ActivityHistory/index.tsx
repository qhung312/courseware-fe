import _ from 'lodash';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Footer } from '../../../components';
import CopyIcon from '../../../components/CopyIcon';
import Icon from '../../../components/Icon';
import DeleteModal from '../../../components/Modal/DeleteModal';
import ProfileOption from '../../../components/ProfileOption';
import DeleteSnackbar from '../../../components/Snackbar/DeleteSnackbar';
import { useThrottle } from '../../../hooks';
import { Page } from '../../../layout';

type ActivityContent = {
  date: string;
  name: string;
  chapter: string;
  pageUrl: string;
  type: number;
};

const demoData: ActivityContent[] = [
  {
    date: '00 thàng 00 năm 0000',
    name: 'Nguyễn Văn A đã truy cập Tài liệu học tập môn Giải tích 1',
    chapter: 'Chương 1: Đạo hàm hàm số',
    pageUrl: '/',
    type: 1,
  },
  {
    date: '00 thàng 00 năm 0000',
    name: 'Nguyễn Văn A đã bắt đầu làm Bài tập rèn luyện môn Giải tích 1',
    chapter: 'Chương 1: Đạo hàm hàm số',
    pageUrl: '/',
    type: 2,
  },
  {
    date: '00 thàng 00 năm 0000',
    name: 'Nguyễn Văn A đã tham gia Thi thử giữa kỳ môn Giải tích 1',
    chapter: 'Chương 1: Đạo hàm hàm số',
    pageUrl: '/',
    type: 3,
  },
  {
    date: '00 thàng 00 năm 0000',
    name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    chapter: 'Chương 1: Đạo hàm hàm số',
    pageUrl: '/',
    type: 1,
  },
  {
    date: '00 thàng 00 năm 0000',
    name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    chapter: 'Chương 1: Đạo hàm hàm số',
    pageUrl: '/',
    type: 1,
  },
  {
    date: '00 thàng 00 năm 0000',
    name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    chapter: 'Chương 1: Đạo hàm hàm số',
    pageUrl: '/',
    type: 3,
  },
  {
    date: '00 thàng 00 năm 0000',
    name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    chapter: 'Chương 1: Đạo hàm hàm số',
    pageUrl: '/',
    type: 3,
  },
  {
    date: '00 thàng 00 năm 0000',
    name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    chapter: 'Chương 1: Đạo hàm hàm số',
    pageUrl: '/',
    type: 1,
  },
  {
    date: '00 thàng 00 năm 0000',
    name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    chapter: 'Chương 1: Đạo hàm hàm số',
    pageUrl: '/',
    type: 2,
  },
];

const ActivityHistory = () => {
  const [page, setPage] = useState(1);
  const [chunks, setChunks] = useState(_.chunk(demoData, 5));
  const [filterOption, setFilterOption] = useState(0);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteSnackbar, setDeleteSnackbar] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const onFilterClick = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  useEffect(() => {
    if (filterOption > 0) {
      const filteredData = demoData.filter((activity) => activity.type === filterOption);
      setChunks(_.chunk(filteredData, 5));
    } else setChunks(_.chunk(demoData, 5));
  }, [filterOption]);

  const throttledLibraryClick = useThrottle(onFilterClick);

  return (
    <Page title='Thông tin người dùng - Lịch sử hoạt động'>
      <DeleteModal
        text='Hoạt động này sẽ bị xóa khỏi lịch sử hoạt động của bạn'
        onClose={() => {
          setDeleteModal(false);
        }}
        onDelete={() => setDeleteSnackbar(true)}
        show={deleteModal}
      />
      <div className='fixed bottom-4 right-4 z-[60]'>
        <DeleteSnackbar showSnackbar={deleteSnackbar} setShow={() => setDeleteSnackbar(false)} />
      </div>
      <main className='w-full'>
        {/* Banner */}
        <ProfileOption option={2} />
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
                  4 hoạt động
                </p>
              </button>
              <button
                className='flex w-full flex-row items-center justify-between
                border-t-[1px] border-[#D9D9D9] py-3'
                onClick={() => {
                  if (filterOption === 2) setFilterOption(0);
                  else setFilterOption(2);
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
                  10 hoạt động
                </p>
              </button>
              <button
                className='flex w-full flex-row items-center justify-between
                border-t-[1px] border-[#D9D9D9] py-3'
                onClick={() => {
                  if (filterOption === 3) setFilterOption(0);
                  else setFilterOption(3);
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
                    Thi thử
                  </p>
                </div>
                <p
                  className={`text-[14px] font-medium ${
                    filterOption === 3 ? 'text-[#49BBBD]' : 'text-[#252641]'
                  }`}
                >
                  22 hoạt động
                </p>
              </button>
            </nav>
          </div>
          <div className='hidden h-fit w-[29%] rounded-[20px] bg-white p-4 shadow-[0px_19px_47px_0px_rgba(47,50,125,0.1)] lg:block'>
            <h1 className='mb-3 text-2xl font-semibold text-[#2252641] md:text-xl 2xl:text-[26px]'>
              Nhật ký hoạt động
            </h1>
            <div className='mt-2 flex items-center'>
              <div className='mr-2 flex h-[32px] w-[32px] items-center justify-center rounded-full bg-[#4285f4]'>
                <Icon.FilterIcon fill='#FFFFFF' className='h-5 w-5' />
              </div>
              <p className='text-[18px] font-semibold text-[#5B5B5B] 2xl:text-xl'>Bộ lọc</p>
            </div>
            <div className='mt-6 mb-5 h-[1px] w-full bg-[#696984]' />
            <button
              className={`flex w-full flex-col items-start rounded-[20px] border-[1px] border-[#49BBBD]/[0.3] px-3 py-3 hover:bg-[#9DCCFF]/[.3] 2xl:px-4 ${
                filterOption === 1 && 'bg-[#9DCCFF]/[.3]'
              }`}
              onClick={() => {
                if (filterOption === 1) setFilterOption(0);
                else setFilterOption(1);
              }}
            >
              <h3 className='font-medium text-[#252641] 2xl:text-[18px]'>Tài liệu học tập</h3>
              <div className='flex w-full items-center justify-between text-[12px] text-[#252641]/[.8]'>
                <div className='flex items-center'>
                  <Icon.Clock className='mr-1' />
                  <p className='2xl:text-base'>1 giờ trước</p>
                </div>
                <p className='2xl:text-base'>4 hoạt động</p>
              </div>
            </button>
            <button
              className={`mt-3 flex w-full flex-col items-start rounded-[20px] border-[1px] border-[#49BBBD]/[0.3] px-3 py-3 hover:bg-[#9DCCFF]/[.3] 2xl:px-4 ${
                filterOption === 2 && 'bg-[#9DCCFF]/[.3]'
              }`}
              onClick={() => {
                if (filterOption === 2) setFilterOption(0);
                else setFilterOption(2);
              }}
            >
              <h3 className='font-medium text-[#252641] 2xl:text-[18px]'>Bài tập rèn luyện</h3>
              <div className='flex w-full items-center justify-between text-[12px] text-[#252641]/[.8]'>
                <div className='flex items-center'>
                  <Icon.Clock className='mr-1' />
                  <p className='2xl:text-base'>45 phút trước</p>
                </div>
                <p className='2xl:text-base'>22 hoạt động</p>
              </div>
            </button>
            <button
              className={`mt-3 flex w-full flex-col items-start rounded-[20px] border-[1px] border-[#49BBBD]/[0.3] px-3 py-3 hover:bg-[#9DCCFF]/[.3] 2xl:px-4 ${
                filterOption === 3 && 'bg-[#9DCCFF]/[.3]'
              }`}
              onClick={() => {
                if (filterOption === 3) setFilterOption(0);
                else setFilterOption(3);
              }}
            >
              <h3 className='font-medium text-[#252641] 2xl:text-[18px]'>Thi thử</h3>
              <div className='flex w-full items-center justify-between text-[12px] text-[#252641]/[.8]'>
                <div className='flex items-center'>
                  <Icon.Clock className='mr-1' />
                  <p className='2xl:text-base'>45 phút trước</p>
                </div>
                <p className='2xl:text-base'>20 hoạt động</p>
              </div>
            </button>
          </div>
          <div className='lg:mt-[-16px] lg:w-[69%]'>
            {chunks[page - 1]?.map((activity, index) => (
              <div className='mt-4' key={index}>
                <Link
                  to={activity.pageUrl}
                  className='flex flex-col rounded-[20px] bg-white p-4 shadow-[0px_19px_47px_0px_rgba(47,50,125,0.1)]'
                >
                  <p className='text-xl text-[rgba(45,52,54,0.7)]'>{activity.date}</p>
                  <h2 className='mt-1 text-2xl text-[#2D3436]'>{activity.name}</h2>
                  <div className='mt-3 flex items-center'>
                    <Icon.OpenBook />
                    <p className='ml-2 text-[#5B5B5B] xl:text-base 2xl:text-[18px]'>
                      {activity.chapter}
                    </p>
                  </div>
                  <div
                    className='ml-auto flex w-fit justify-end'
                    onClick={(e) => e.preventDefault()}
                  >
                    <CopyIcon copyContent={activity.pageUrl} />
                    <button
                      className='ml-1 flex h-7 w-7 items-center justify-center rounded-full bg-[#DB4437] hover:bg-[#DB4437]/[.8]'
                      onClick={() => setDeleteModal(true)}
                    >
                      <Icon.Delete fill='white' className='h-4 w-4' />
                    </button>
                  </div>
                </Link>
              </div>
            ))}
            <div className='mt-9 flex flex-1 flex-row items-center justify-center gap-x-4'>
              <button
                className={`rounded-full p-2 ${page === 1 ? '' : 'hover:bg-black/20'}`}
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
              >
                <Icon.Chevron fill='#5B5B5B' className='-rotate-90' />
              </button>
              {Array.from({ length: chunks.length }, (_e, index) => index + 1).map((index) => (
                <button
                  key={`page-${index}`}
                  className={`aspect-square rounded-full p-2 ${
                    index === page ? 'bg-[#4285F4]/90' : 'hover:bg-black/20'
                  }`}
                  onClick={() => setPage(index)}
                >
                  <p
                    className={`w-7 text-lg ${
                      index === page ? 'font-semibold text-white' : 'font-medium'
                    }`}
                  >
                    {index}
                  </p>
                </button>
              ))}
              <button
                className={`rounded-full p-2 ${page === chunks.length ? '' : 'hover:bg-black/20'}`}
                disabled={page === chunks.length}
                onClick={() => setPage(page + 1)}
              >
                <Icon.Chevron fill='#5B5B5B' className='rotate-90' />
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </Page>
  );
};

export default ActivityHistory;
