import Skeleton from 'react-loading-skeleton';
import { Link, useParams } from 'react-router-dom';

import { ReactComponent as NoData } from '../../../assets/svgs/NoData.svg';
import { ReactComponent as Tab } from '../../../assets/svgs/Tab.svg';
import { DocumentCard, Icon } from '../../../components';
import subjects from '../../../data/exercises';
import { Page } from '../../../layout';
import Wrapper from '../../../layout/Wrapper';
import RoomAside from '../RoomAside';

const MainPage: React.FC = () => {
  const params = useParams();

  const subject = params ? subjects[Number(params.subjectId)] : null;

  if (!params?.subjectId) {
    return (
      <Page title='Phòng thi'>
        <RoomAside
          title='Phòng thi'
          subTitle='Bài tập rèn luyện'
          description='Lorem ipsum dolor sit amet, consectetur adi'
          baseRoute='/room/exercises'
        />

        {/* Add space */}
        <Wrapper className='flex flex-1 flex-col'>
          <div className='hidden w-full bg-[#4285F4] px-5 py-5 text-white md:flex md:h-[88px] md:flex-col md:justify-between lg:h-[108px] lg:px-9 lg:py-6 xl:h-[132px] xl:px-10 xl:py-7 2xl:h-[164px] 2xl:px-11 2xl:py-8'>
            <h1 className='text-xl font-bold lg:text-2xl xl:text-3xl 2xl:text-4xl 3xl:text-[44px]'>
              Bài tập rèn luyện
            </h1>
            <p className='text-sm xl:text-base 2xl:text-lg'>
              Ôn tập và rèn luyện với các dạng bài tập
            </p>
          </div>
          <div className='mb-6 flex-1 space-y-5 px-5 pt-5 md:space-y-6 md:pt-0 lg:px-9 lg:pt-8 xl:space-y-7 xl:px-10 xl:pt-10 2xl:space-y-8 2xl:px-11 2xl:pt-11'>
            <div className='z-10 mt-2 rounded-[20px] bg-white px-4 py-3 md:mt-4 md:p-5 lg:mt-5 xl:mt-6 xl:p-6 2xl:mt-7 2xl:p-7'>
              <Tab className='mx-auto w-[200px] p-7 xl:w-[300px]' />
              <p className='w-full text-center'>Chọn một môn học</p>
            </div>
          </div>
        </Wrapper>
      </Page>
    );
  }

  return (
    <Page title={`Tài liệu ${subject?.title}`}>
      <RoomAside
        title='Phòng thi'
        subTitle='Bài tập rèn luyện'
        description='Lorem ipsum dolor sit amet, consectetur adi'
        baseRoute='/room/exercises'
      />

      <Wrapper className='flex flex-1 flex-col'>
        {/* Banner */}
        <div className='hidden w-full bg-[#4285F4] px-5 py-5 text-white md:flex md:h-[88px] md:flex-col md:justify-between lg:h-[108px] lg:px-9 lg:py-6 xl:h-[132px] xl:px-10 xl:py-7 2xl:h-[164px] 2xl:px-11 2xl:py-8'>
          <h1 className='text-xl font-bold lg:text-2xl xl:text-3xl 2xl:text-4xl 3xl:text-[44px]'>
            Bài tập rèn luyện
          </h1>
          <p className='text-sm xl:text-base 2xl:text-lg'>
            Ôn tập và rèn luyện với các dạng bài tập
          </p>
        </div>

        <div className='mb-6 flex-1 space-y-5 px-5 pt-5 md:space-y-6 md:pt-0 lg:px-9 lg:pt-8 xl:space-y-7 xl:px-10 xl:pt-10 2xl:space-y-8 2xl:px-11 2xl:pt-11'>
          <Link
            to='/room/exercises'
            className='flex items-center space-x-2 hover:underline md:hidden'
          >
            <Icon.ChevronLeft className='max-w-2 min-w-2 min-h-3 max-h-3 fill-black' />
            <p className='w-[100px]'>Quay lại</p>
          </Link>

          {/* Introduction */}
          <div className='mt-0 space-y-2'>
            <h3 className='max-w-xs text-2xl font-semibold'>
              {subject?.title || <Skeleton baseColor='#9DCCFF' />}
            </h3>
            <p className='text-[#696984]'>
              {subject ? (
                'Lorem ipsum dolor sit amet, consectetur adi'
              ) : (
                <Skeleton baseColor='#9DCCFF' />
              )}
            </p>
          </div>

          {/* Chapters */}
          <div className='space-y-2 md:space-y-4 lg:space-y-5 xl:space-y-6 2xl:space-y-7'>
            <h1 className='text-2xl font-semibold'>
              {subject ? 'Nội dung môn học' : <Skeleton baseColor='#9DCCFF' />}
            </h1>
            {subject?.chapters?.length === 0 && (
              <div className='z-10 rounded-[20px] bg-white px-4 py-3 md:p-5 xl:p-6 2xl:p-7'>
                <NoData width={200} className='mx-auto w-[200px] p-7 xl:w-[300px]' />
                <p className='w-full text-center'>Không tìm thấy tài liệu</p>
              </div>
            )}
            {subject?.chapters?.map((chapter, index) => (
              <DocumentCard
                key={index}
                title={chapter.title}
                to={`/room/exercises/${params.subjectId}/chapter/${index}`}
                copyContent={
                  window.location.origin + `/room/exercises/${params.subjectId}/chapter/${index}`
                }
                subTitle={''}
                description={
                  'Lorem ipsum dolor sit amet, consectetur adi piscing elit, sed do eiusmodadipiscing elit, sed do eiusmodLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmodadipiscing elit, sed do eiusmodLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmodadipiscing elit, sed do eiusmodeiusmodadipiscing elit, sed do eiusmodL'
                }
              />
            ))}
          </div>
        </div>
      </Wrapper>
    </Page>
  );
};

export default MainPage;
