import Skeleton from 'react-loading-skeleton';
import { Link, useParams } from 'react-router-dom';

import { ReactComponent as NoData } from '../../../assets/svgs/NoData.svg';
import { ReactComponent as Tab } from '../../../assets/svgs/Tab.svg';
import { Icon } from '../../../components';
import subjects from '../../../data/subjects';
import { Page } from '../../../layout';
import Wrapper from '../../../layout/Wrapper';
import RoomAside from '../RoomAside';

const Main: React.FC = () => {
  const params = useParams();

  const subject = params?.subjectId ? subjects[Number(params.subjectId)] : null;

  if (!params?.subjectId) {
    return (
      <Page title='Phòng thi'>
        <RoomAside
          title='Bài tập rèn luyện'
          subTitle='Bài tập các môn học'
          description='Lorem ipsum dolor sit amet, consectetur adi'
          baseRoute='/room/exercises'
        />

        {/* Add space */}
        <Wrapper className='flex flex-1 flex-col'>
          <div className='hidden w-full bg-[#4285F4] px-6 py-2 text-white md:flex md:flex-col md:justify-between lg:px-7 lg:py-3 3xl:px-8 3xl:py-4'>
            <h1 className='text-xl font-bold lg:text-2xl 3xl:text-3xl'>Bài tập rèn luyện</h1>
          </div>
          <div className='mb-6 flex-1 space-y-4 px-6 pt-4 lg:space-y-6 lg:px-7 lg:pt-5 3xl:space-y-8 3xl:px-8 3xl:pt-6'>
            <div className='z-10 rounded-lg bg-white px-4 py-3 lg:p-5 3xl:p-7'>
              <Tab className='mx-auto w-[200px] p-7 xl:w-[300px]' />
              <p className='w-full text-center'>Chọn một môn học</p>
            </div>
          </div>
        </Wrapper>
      </Page>
    );
  }

  return (
    <Page title={`Bài tập rèn luyện ${subject?.title}`}>
      <RoomAside
        title='Phòng thi'
        subTitle='Bài tập rèn luyện'
        description='Lorem ipsum dolor sit amet, consectetur adi'
        baseRoute='/room/exercises'
      />

      <Wrapper className='flex flex-1 flex-col'>
        {/* Banner */}
        <div className='hidden w-full bg-[#4285F4] px-6 py-2 text-white md:flex md:flex-col md:justify-between lg:px-7 lg:py-3 3xl:px-8 3xl:py-4'>
          <h1 className='text-xl font-bold lg:text-2xl 3xl:text-3xl'>Bài tập rèn luyện</h1>
        </div>

        <div className='mb-6 flex-1 space-y-4 p-5 lg:space-y-3 lg:p-3 3xl:space-y-4 3xl:p-4'>
          <Link
            to='/room/exercises'
            className='flex items-center space-x-2 hover:underline md:hidden'
          >
            <Icon.ChevronLeft className='max-w-2 min-w-2 min-h-3 max-h-3 fill-black' />
            <p className='w-[100px]'>Quay lại</p>
          </Link>

          {/* Introduction */}
          <div className='mt-0 md:hidden'>
            <h3 className='mb-1 max-w-xs text-2xl font-semibold'>Bài tập rèn luyện</h3>
            <p className='mb-2 text-xl'>
              Môn học: {subject?.title || <Skeleton baseColor='#9DCCFF' />}
            </p>
            <p className='text-[#666]'>
              {subject ? (
                'Lorem ipsum dolor sit amet, consectetur adi'
              ) : (
                <Skeleton baseColor='#9DCCFF' />
              )}
            </p>
          </div>

          {/* Chapters */}
          <div className='space-y-2 md:space-y-4 lg:space-y-5 xl:space-y-6 2xl:space-y-7'>
            {subject?.chapters?.length === 0 && (
              <div className='z-10 rounded-[20px] bg-white px-4 py-3 md:p-5 xl:p-6 2xl:p-7'>
                <NoData width={200} className='mx-auto w-[200px] p-7 xl:w-[300px]' />
                <p className='w-full text-center'>Không tìm thấy tài liệu</p>
              </div>
            )}
            {subject?.chapters?.map((chapter, index) => (
              <div
                key={`${chapter.title}-${index}`}
                className='flex flex-col rounded-lg bg-white p-4 lg:p-6 3xl:p-8'
              >
                <h4 className='mb-2 text-base lg:text-xl 3xl:text-2xl'>{chapter.title}</h4>
                <div className='flex flex-col gap-y-4 md:flex-col-reverse'>
                  <div className='flex flex-row items-center justify-between'>
                    <div className='flex h-fit flex-1 flex-row flex-wrap items-center justify-start gap-x-2 gap-y-2 md:w-fit md:flex-none lg:gap-x-4 3xl:gap-x-6'>
                      <div className='hidden flex-1 flex-row items-center gap-x-1 md:flex'>
                        <Icon.Exercise className='h-4 w-auto lg:h-5 3xl:h-6' fill='#666' />
                        <p className='whitespace-nowrap text-xs text-[#666] lg:text-sm 3xl:text-base'>
                          Chương {index + 1}
                        </p>
                      </div>
                      <span className='mx-1 hidden h-6 w-0 border-l-2 md:block' />
                      <div className='flex flex-1 flex-row items-center gap-x-1'>
                        <Icon.Clock className='h-4 w-auto lg:h-5 3xl:h-6' fill='#666' />
                        <p className='whitespace-nowrap text-xs text-[#666] lg:text-sm 3xl:text-base'>
                          15 phút 00 giây
                        </p>
                      </div>
                      <div className='flex flex-1 flex-row items-center gap-x-1'>
                        <Icon.List className='h-4 w-auto lg:h-5 3xl:h-6' fill='#666' />
                        <p className='text-xs text-[#666] lg:text-sm 3xl:text-base'>45 câu</p>
                      </div>
                    </div>
                    <Link
                      to={`/room/exercises/${params.subjectId}/quiz/${index}`}
                      className='hidden rounded-lg bg-[#4285F4]/80 px-5 py-4 hover:bg-[#4285F4]
                      md:flex md:px-3 md:py-2 lg:px-5 lg:py-3 3xl:px-7 3xl:py-4'
                    >
                      <p className='text-xs text-white lg:text-sm 3xl:text-base'>Làm bài</p>
                    </Link>
                  </div>
                  <div className='w-full rounded-lg bg-[#9DCCFF]/20 p-2 lg:p-4 3xl:p-6'>
                    <p className='text-justify text-[#666]'>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                      incididunt ut labore et dolore magna aliqua. Suscipit tellus mauris a diam
                      maecenas sed enim ut sem. Orci dapibus ultrices in iaculis nunc sed augue
                      lacus. Massa tincidunt nunc pulvinar sapien et ligula ullamcorper malesuada
                      proin. Odio tempor orci dapibus ultrices. Sit amet consectetur adipiscing
                      elit. Sed egestas egestas fringilla phasellus faucibus. Posuere lorem ipsum
                      dolor sit. Aliquam ultrices sagittis orci a scelerisque purus. In hac
                      habitasse platea dictumst vestibulum rhoncus. Ultricies integer quis auctor
                      elit sed. Egestas dui id ornare arcu odio ut sem. Pellentesque diam volutpat
                      commodo sed. Elementum nibh tellus molestie nunc non blandit massa enim. A
                      iaculis at erat pellentesque adipiscing commodo elit at. Cras ornare arcu dui
                      vivamus arcu
                    </p>
                  </div>
                  <Link
                    to={`/room/exercises/${params.subjectId}/quiz/${index}`}
                    className='flex w-fit rounded-lg bg-[#4285F4]/80 px-5 py-2 hover:bg-[#4285F4] md:hidden'
                  >
                    <p className='text-xs text-white lg:text-sm 3xl:text-base'>Làm bài</p>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Wrapper>
    </Page>
  );
};

export default Main;
