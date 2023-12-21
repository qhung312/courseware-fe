import { useLayoutEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Icon } from '../../../components';
import PDF from '../../../components/PDF';
import { Page } from '../../../layout';
import Wrapper from '../../../layout/Wrapper';
import ExamArchiveService from '../../../service/examArchive.service';
import useBoundStore from '../../../store';
import LibraryAside from '../LibraryAside';

import type { ExamArchive } from '../../../types/examArchive';

const ExamArchiveDetailPage: React.FC = () => {
  const params = useParams();
  const navigate = useNavigate();

  const isAsideOpen = useBoundStore.use.isAsideOpen();
  const openAside = useBoundStore.use.openAside();

  const [exam, setExam] = useState<ExamArchive | null>(null);
  const [file, setFile] = useState<File | undefined>(undefined);
  const [loadingPDF, setLoadingPDF] = useState(true);

  useLayoutEffect(() => {
    if (params?.pdfId && params?.pdfId !== '') {
      ExamArchiveService.getById(params?.pdfId)
        .then((res) => {
          const { data } = res;
          const { payload } = data;
          setExam(payload);
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.response.data.message);
        });
    }
  }, [params]);

  useLayoutEffect(() => {
    if (exam !== null) {
      ExamArchiveService.download(exam._id)
        .then((downloadFileResponse) => {
          setFile(downloadFileResponse.data);
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.response.data.message);
        })
        .finally(() => setLoadingPDF(false));
    }
  }, [exam]);

  useLayoutEffect(() => {
    const detail = document.getElementById('previous-exams-detail');
    if (detail) {
      detail.style.width = '100vw';
    }
  }, [isAsideOpen]);

  return (
    <Page
      title={`Đề thi ${exam?.subject.name ? exam.subject.name : ''}${
        exam?.semester ? ` - Học kì ${exam?.semester.slice(-3)}` : ''
      }${exam?.name ? ` - ${exam.name}` : ''}`}
      description='From CTCT'
    >
      <LibraryAside
        title='Thư viện đề thi'
        baseRoute='/library/exam-archive'
        isDisplayToggleAside={true}
      />

      {/* Add space
        <div id='previous-exams-margin' /> */}
      <Wrapper className={`with-nav-height relative flex w-full flex-col overflow-auto`}>
        <button
          onClick={openAside}
          className={`absolute left-4 top-2 rounded-full bg-[#4285F4] p-[6px] hover:bg-[#2571eb] md:left-10 md:top-6 lg:top-8 2xl:top-10 ${
            !isAsideOpen ? 'hidden md:block' : 'hidden'
          }`}
        >
          <Icon.OpenAside className='aspect-square h-6 w-6 fill-white xl:h-7 xl:w-7' />
        </button>
        {/* Banner */}
        <div
          className={`flex w-full flex-col-reverse justify-start gap-y-2 bg-transparent py-4 px-5 md:flex-col md:gap-y-6 md:py-6 lg:gap-y-3 lg:py-8 2xl:py-10 ${
            isAsideOpen
              ? 'md:px-8 lg:px-10 xl:px-12 2xl:px-14'
              : 'md:px-32 lg:px-40 xl:px-44 3xl:px-48'
          }`}
        >
          <h1 className='text-2xl font-bold text-[#4285F4] md:text-[#2F327D] lg:text-2xl 2xl:text-3xl'>
            {exam?.name}
          </h1>
          <div className='flex w-full justify-start'>
            <button
              type='button'
              onClick={() => {
                navigate(-1);
              }}
              className='flex items-center space-x-2 rounded-lg bg-[#4285F4] px-2 py-1 text-white hover:bg-[#2571eb] md:p-1 lg:p-2 2xl:p-3'
            >
              <Icon.ChevronLeft className='aspect-square w-2 fill-white md:w-3' />
              <p className='whitespace-nowrap text-[16px] font-semibold text-inherit 2xl:text-[20px]'>
                Quay lại
              </p>
            </button>
          </div>
        </div>

        <div className='my-6 w-full space-y-5 bg-transparent px-5 md:space-y-6 md:pt-0 lg:px-9 xl:space-y-7 xl:px-10 2xl:space-y-8 2xl:px-11'>
          {/* PDF */}
          {loadingPDF ? (
            <>
              <p className='mb-5 w-full px-6 lg:px-8 3xl:px-10'>
                <Skeleton width={'100%'} baseColor='#9DCCFF' height={56} />
              </p>
              <p className='w-full px-6 lg:px-8 3xl:px-10'>
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
          ) : (
            <PDF file={file} title={exam?.name} pageClassName='border border-[#bbbcbc] shadow' />
          )}
        </div>
      </Wrapper>
    </Page>
  );
};

export default ExamArchiveDetailPage;
