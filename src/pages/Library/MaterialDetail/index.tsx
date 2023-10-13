import { useLayoutEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Link, useParams } from 'react-router-dom';

import { DocumentSideMenu, Icon } from '../../../components';
import PDF from '../../../components/PDF';
import { API_URL } from '../../../config';
import { useAppSelector } from '../../../hooks';
import LibraryService from '../../../service/library.service';
import { RootState } from '../../../store';
import { ExamArchive } from '../../../types/library';

const MaterialDetail: React.FC = () => {
  const params = useParams();

  const [exam, setExam] = useState<ExamArchive | null>(null);
  const isOpen = useAppSelector((state) => state.app.isMenuOpen);

  const { subjects } = useAppSelector((state: RootState) => state.library);

  useLayoutEffect(() => {
    if (params?.pdfId && params?.pdfId !== '') {
      LibraryService.getMaterialById(params?.pdfId).then((res) => {
        const { data } = res;
        const { payload } = data;
        setExam(payload);
        document.title = payload?.name + ' | CTCT';
      });
    }
  }, [params]);

  useLayoutEffect(() => {
    const detail = document.getElementById('material-detail');
    if (detail) {
      detail.style.width = '100vw';
    }
  }, [isOpen]);

  return (
    <>
      <DocumentSideMenu
        title='Thư viện tài liệu'
        subTitle='Tài liệu các môn học'
        description='Lorem ipsum dolor sit amet, consectetur adi'
        baseRoute='/library/material'
      />
      <div
        id='material-detail'
        className={`flex w-screen ${
          isOpen ? 'blur-sm' : ''
        } bg-[#F2F2F2] transition-all duration-300 md:bg-[#E3F2FD]`}
      >
        {/* Add space
        <div id='material-margin' /> */}
        <div className='flex w-full flex-col'>
          {/* Banner */}
          <div
            className='hidden w-full bg-[#4285F4] px-5 py-5 text-white 
            md:flex md:h-[88px] md:flex-col md:justify-between 
            lg:h-[108px] lg:px-9 lg:py-6 xl:h-[132px] xl:px-10 xl:py-7 2xl:h-[164px] 2xl:px-11 2xl:py-8'
          >
            <h1 className='text-xl font-bold lg:text-2xl xl:text-3xl 2xl:text-4xl 3xl:text-[44px]'>
              {exam?.name}
            </h1>
            <h3>
              {subjects?.find((subject) => subject._id === exam?.subject)?.name || (
                <Skeleton baseColor='#9DCCFF' />
              )}
            </h3>
          </div>

          <div className='my-6 w-full space-y-5 px-5 md:space-y-6 md:pt-0 lg:px-9 xl:space-y-7 xl:px-10 2xl:space-y-8 2xl:px-11'>
            <Link
              to={`/library/material/${params.subjectId}`}
              className='flex items-center space-x-2 hover:underline'
            >
              <Icon.ChevronLeft className='max-w-2 min-w-2 min-h-3 max-h-3 fill-black' />
              <p className='w-[100px]'>Quay lại</p>
            </Link>

            {/* PDF */}
            <PDF url={`${API_URL}material/download/${params.pdfId}`} />
          </div>
        </div>
      </div>
    </>
  );
};

export default MaterialDetail;
