import _ from 'lodash';
import { useLayoutEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { DocumentCard, DocumentSideMenu, Icon } from '../../../components';
import { useAppSelector } from '../../../hooks';
import LibraryService from '../../../service/library.service';
import { RootState } from '../../../store';
import { ExamArchive } from '../../../types/library';

const ExamArchivePage: React.FC = () => {
  const params = useParams();

  const { subjects } = useAppSelector((state: RootState) => state.library);
  const subject = _.find(subjects, (subj) => subj._id === params?.subjectId);

  const [examArchives, setExamArchives] = useState<ExamArchive[]>([]);

  useLayoutEffect(() => {
    if (params?.subjectId && params?.subjectId !== '') {
      LibraryService.getAllExamArchivesBySubjectId(params?.subjectId).then((res) => {
        const { data } = res;
        const { payload } = data;

        console.log('set archives', payload);
        setExamArchives(payload);
      });
    }
  }, [params]);

  return (
    <>
      <DocumentSideMenu
        title='Thư viện đề thi'
        subTitle='Đề thi các môn học'
        description='Lorem ipsum dolor sit amet, consectetur adi'
        baseRoute='/library/exam-archive'
      />
      <div className='flex flex-1 bg-[#F2F2F2] md:bg-[#E3F2FD]'>
        {/* Add space */}
        <div className='mr-0 md:mr-[264px] lg:mr-[332px] xl:mr-[400px] 3xl:mr-[500px] ' />

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

          <div className='mb-6 flex-1 space-y-5 px-5 md:space-y-6 md:pt-0 lg:px-9 xl:space-y-7 xl:px-10 2xl:space-y-8 2xl:px-11'>
            <button
              className='flex items-center space-x-2 hover:underline md:hidden'
              onClick={() => {}}
            >
              <Icon.ChevronLeft className='max-w-2 min-w-2 min-h-3 max-h-3 fill-black' />
              <p className='w-[100px]'>Quay lại</p>
            </button>

            {/* Introduction */}
            <div className='space-y-2  md:mt-0'>
              <h3 className='text-2xl font-semibold'>{subject?.name}</h3>
              <p className='text-[#696984]'>Lorem ipsum dolor sit amet, consectetur adi</p>
            </div>

            {/* Chapters */}
            <div className='space-y-2 md:space-y-4 lg:space-y-5 xl:space-y-6 2xl:space-y-7'>
              <h1 className='text-2xl font-semibold'>Nội dung môn học</h1>
              {examArchives.map((exam) => (
                <DocumentCard
                  key={exam._id}
                  title={exam.name}
                  to={`/library/exam-archive/${subject?._id}/pdf/${exam._id}`}
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
    </>
  );
};

export default ExamArchivePage;
