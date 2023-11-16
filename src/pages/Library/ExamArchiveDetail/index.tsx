import { useLayoutEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Icon } from '../../../components';
import PDF from '../../../components/PDF';
import { API_URL } from '../../../config';
import { Page } from '../../../layout';
import Wrapper from '../../../layout/Wrapper';
import ExamArchiveService from '../../../service/examArchive.service';
import useBoundStore from '../../../store';
import LibraryAside from '../LibraryAside';

import type { ExamArchive } from '../../../types/examArchive';

const ExamArchiveDetailPage: React.FC = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [exam, setExam] = useState<ExamArchive | null>(null);
  const isAsideOpen = useBoundStore.use.isAsideOpen();
  const toggleAside = useBoundStore.use.toggleAside();

  useLayoutEffect(() => {
    if (params?.pdfId && params?.pdfId !== '') {
      ExamArchiveService.getById(params?.pdfId).then((res) => {
        const { data } = res;
        const { payload } = data;
        setExam(payload);
      });
    }
  }, [params]);

  useLayoutEffect(() => {
    const detail = document.getElementById('previous-exams-detail');
    if (detail) {
      detail.style.width = '100vw';
    }
  }, [isAsideOpen]);

  return (
    <Page
      title={`${exam?.subject.name} - ${`Học kì ${exam?.semester.slice(-3)}`} - ${exam?.name}`}
      description='From CTCT'
    >
      <LibraryAside
        title='Thư viện tài liệu'
        subTitle='Tài liệu các môn học'
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
          <PDF url={`${API_URL}previous_exam/${params.pdfId}/download`} />
        </div>
      </Wrapper>
    </Page>
  );
};

export default ExamArchiveDetailPage;
