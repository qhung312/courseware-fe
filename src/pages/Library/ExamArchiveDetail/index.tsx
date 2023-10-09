import { useLayoutEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { DocumentSideMenu, Icon } from '../../../components';
import PDF from '../../../components/PDF';
import { API_URL } from '../../../config';
import LibraryService from '../../../service/library.service';
import { ExamArchive } from '../../../types/library';

const ExamArchiveDetailPage: React.FC = () => {
  const params = useParams();

  const [exam, setExam] = useState<ExamArchive | null>(null);

  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (params?.pdfId && params?.pdfId !== '') {
      LibraryService.getPreviousExamById(params?.pdfId).then((res) => {
        const { data } = res;
        const { payload } = data;

        console.log('set archives', payload);
        setExam(payload);
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
              {exam?.name}
            </h1>
          </div>

          <div className='my-6 flex-1 space-y-5 px-5 md:space-y-6 md:pt-0 lg:px-9 xl:space-y-7 xl:px-10 2xl:space-y-8 2xl:px-11'>
            <Link
              to={`/library/exam-archive/${params.subjectId}/pdf/${params.pdfId}`}
              className='flex items-center space-x-2 hover:underline'
              onClick={() => navigate(-1)}
            >
              <Icon.ChevronLeft className='max-w-2 min-w-2 min-h-3 max-h-3 fill-black' />
              <p className='w-[100px]'>Quay lại</p>
            </Link>

            {/* PDF */}
            <PDF url={`${API_URL}previous-exams/download/${params.pdfId}`} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ExamArchiveDetailPage;
