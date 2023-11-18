import { useLayoutEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

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
  const toggleAside = useBoundStore.use.toggleAside();

  const [exam, setExam] = useState<ExamArchive | null>(null);
  const [file, setFile] = useState<File | undefined>(undefined);

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
        });
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
        subTitle='Đề thi các môn học'
        baseRoute='/library/previous-exams'
      />

      {/* Add space
        <div id='previous-exams-margin' /> */}
      <Wrapper className={`with-nav-height flex w-full flex-col overflow-auto`} fullWidth>
        {/* Banner */}
        <div className='hidden w-full bg-[#4285F4] px-6 py-2 text-white md:flex md:flex-col md:justify-between lg:px-7 lg:py-3 3xl:px-8 3xl:py-4'>
          <h1 className='text-xl font-bold lg:text-2xl 3xl:text-3xl'>{exam?.name}</h1>
        </div>

        <div className='my-6 w-full space-y-5 px-5 md:space-y-6 md:pt-0 lg:px-9 xl:space-y-7 xl:px-10 2xl:space-y-8 2xl:px-11'>
          <button
            type='button'
            onClick={() => {
              navigate(-1);
              toggleAside();
            }}
            className='flex items-center space-x-2 hover:underline'
          >
            <Icon.ChevronLeft className='max-w-2 min-w-2 min-h-3 max-h-3 fill-black' />
            <p className='w-[100px]'>Quay lại</p>
          </button>

          {/* PDF */}
          <PDF file={file} />
        </div>
        <ToastContainer position='bottom-right' />
      </Wrapper>
    </Page>
  );
};

export default ExamArchiveDetailPage;
