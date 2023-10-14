import _ from 'lodash';
import { useLayoutEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Link, useParams } from 'react-router-dom';

import { ReactComponent as NoData } from '../../../assets/svgs/NoData.svg';
import { ReactComponent as Tab } from '../../../assets/svgs/Tab.svg';
import { DocumentCard, Icon } from '../../../components';
import { useAppSelector } from '../../../hooks';
import { DocumentSideMenu, Page } from '../../../layout';
import LibraryService from '../../../service/library.service';
import { RootState } from '../../../store';
import { ExamArchive } from '../../../types/library';

const ExamArchivePage: React.FC = () => {
  const params = useParams();

  const { subjects } = useAppSelector((state: RootState) => state.library);
  const subject = _.find(subjects, (subj) => subj._id === params?.subjectId);
  const isOpen = useAppSelector((state) => state.app.isMenuOpen);

  const [examArchives, setExamArchives] = useState<ExamArchive[] | null>(null);

  useLayoutEffect(() => {
    if (params?.subjectId && params?.subjectId !== '') {
      setExamArchives(null);
      LibraryService.getAllExamArchivesBySubjectId(params?.subjectId)
        .then((res) => {
          const { data } = res;
          const { payload } = data;

          setTimeout(() => setExamArchives(payload), 300);
        })
        .catch((err) => {
          console.log('Error in fetching all exams achives by subject id', err);
          setTimeout(() => setExamArchives([]), 300);
        });
    }
  }, [params]);

  if (!params?.subjectId) {
    return (
      <Page title='Đề thi'>
        <DocumentSideMenu
          title='Thư viện đề thi'
          subTitle='Đề thi các môn học'
          description='Lorem ipsum dolor sit amet, consectetur adi'
          baseRoute='/library/exam-archive'
        />
        <div className='flex flex-1 bg-[#F2F2F2] md:bg-[#E3F2FD]'>
          {/* Add space */}
          <div
            className={`mr-0 transition-all duration-300 ${
              isOpen ? 'md:mr-[264px] lg:mr-[332px] xl:mr-[400px] 3xl:mr-[500px]' : ''
            }`}
          />
          <div className='flex flex-1 flex-col'>
            <div className='mb-6 min-h-full flex-1 space-y-5 px-5 pt-5 md:space-y-6 md:pt-0 lg:px-9 lg:pt-8 xl:space-y-7 xl:px-10 xl:pt-10 2xl:space-y-8 2xl:px-11 2xl:pt-11'>
              <div className='pt-2 md:pt-4 lg:pt-5 xl:pt-6 2xl:pt-7'>
                <div className='z-10 rounded-[20px] bg-white px-4 py-3 md:p-5 xl:p-6 2xl:p-7'>
                  <Tab className='mx-auto w-[200px] p-7 xl:w-[300px]' />
                  <p className='w-full text-center'>Chọn một môn học</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Page>
    );
  }

  return (
    <Page title={`Đề thi ${subject?.name}`}>
      <DocumentSideMenu
        title='Thư viện đề thi'
        subTitle='Đề thi các môn học'
        description='Lorem ipsum dolor sit amet, consectetur adi'
        baseRoute='/library/exam-archive'
      />
      <div className='flex min-h-screen flex-1 bg-[#F2F2F2] md:bg-[#E3F2FD]'>
        {/* Add space */}
        <div
          className={`mr-0 transition-all duration-300 ${
            isOpen ? 'md:mr-[264px] lg:mr-[332px] xl:mr-[400px] 3xl:mr-[500px]' : ''
          }`}
        />

        <div className='flex flex-1 flex-col'>
          {/* Banner */}
          <div className='hidden w-full bg-[#4285F4] px-5 py-5 text-white md:flex md:h-[88px] md:flex-col md:justify-between lg:h-[108px] lg:px-9 lg:py-6 xl:h-[132px] xl:px-10 xl:py-7 2xl:h-[164px] 2xl:px-11 2xl:py-8'>
            <h1 className='text-xl font-bold lg:text-2xl xl:text-3xl 2xl:text-4xl 3xl:text-[44px]'>
              Thư viện đề thi
            </h1>
            <p className='text-sm xl:text-base 2xl:text-lg'>
              Lorem ipsum dolor sit amet, consectetur adi
            </p>
          </div>

          <div className='mb-6 flex-1 space-y-5 px-5 pt-5 md:space-y-6 md:pt-0 lg:px-9 lg:pt-8 xl:space-y-7 xl:px-10 xl:pt-10 2xl:space-y-8 2xl:px-11 2xl:pt-11'>
            <Link
              to='/library/exam-archive'
              className='flex items-center space-x-2 hover:underline md:hidden'
            >
              <Icon.ChevronLeft className='max-w-2 min-w-2 min-h-3 max-h-3 fill-black' />
              <p className='w-[100px]'>Quay lại</p>
            </Link>

            {/* Introduction */}
            <div className='mt-0 space-y-2'>
              <h3 className='max-w-xs text-2xl font-semibold'>
                {subject?.name || <Skeleton baseColor='#9DCCFF' />}
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
              {/* Skeleton Loading */}
              {!examArchives && (
                <div className='relative z-10 max-h-[266px] rounded-[20px] bg-white px-4 py-3 md:p-5 xl:p-6 2xl:p-7'>
                  <div className='absolute right-4 top-3 flex space-x-1 md:space-x-2 lg:space-x-3 xl:space-x-4 2xl:space-x-5'></div>
                  <div className='space-y-2'>
                    <h2 className='text-base font-semibold md:text-xl lg:text-2xl'>
                      {<Skeleton baseColor='#9DCCFF' width={100} />}
                    </h2>
                  </div>
                  <div className='mt-4 bg-[#9DCCFF] bg-opacity-20 p-2 md:mt-5 md:p-3 xl:mt-6 xl:p-4 2xl:mt-7 2xl:p-5'>
                    <p className='max-h-[75px] overflow-hidden text-ellipsis text-sm text-[#696984] md:text-base'>
                      {<Skeleton count={3} baseColor='#9DCCFF' />}
                    </p>
                  </div>
                </div>
              )}
              {/* If exam archives is empty */}
              {examArchives?.length === 0 && (
                <div className='z-10 rounded-[20px] bg-white px-4 py-3 md:p-5 xl:p-6 2xl:p-7'>
                  <NoData width={200} className='mx-auto w-[200px] p-7 xl:w-[300px]' />
                  <p className='w-full text-center'>Không tìm thấy tài liệu</p>
                </div>
              )}
              {examArchives?.map((exam) => (
                <DocumentCard
                  key={exam._id}
                  title={exam.name}
                  to={`/library/exam-archive/${subject?._id}/pdf/${exam._id}`}
                  copyContent={
                    window?.location?.origin +
                    `/library/exam-archive/${subject?._id}/pdf/${exam._id}`
                  }
                  subTitle={''}
                  description={
                    'Lorem ipsum dolor sit amet, consectetur adi piscing elit, sed do eiusmodadipiscing elit, sed do eiusmodLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmodadipiscing elit, sed do eiusmodLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmodadipiscing elit, sed do eiusmodeiusmodadipiscing elit, sed do eiusmodL'
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default ExamArchivePage;
