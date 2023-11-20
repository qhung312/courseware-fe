import { useLayoutEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Icon } from '../../../components';
import PDF from '../../../components/PDF';
import { Page } from '../../../layout';
import Wrapper from '../../../layout/Wrapper';
import MaterialService from '../../../service/material.service';
import useBoundStore from '../../../store';
import LibraryAside from '../LibraryAside';

import type { Material } from '../../../types/material';

const MaterialDetailPage: React.FC = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [material, setMaterial] = useState<Material | null>(null);
  const [file, setFile] = useState<File | undefined>(undefined);
  const [loadingPDF, setLoadingPDF] = useState(true);
  const isAsideOpen = useBoundStore.use.isAsideOpen();
  const toggleAside = useBoundStore.use.toggleAside();

  useLayoutEffect(() => {
    if (params?.pdfId && params?.pdfId !== '') {
      MaterialService.getById(params?.pdfId)
        .then((res) => {
          const { data } = res;
          const { payload } = data;
          setMaterial(payload);
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.response.data.message);
        });
    }
  }, [params]);

  useLayoutEffect(() => {
    if (material !== null) {
      MaterialService.download(material._id)
        .then((downloadFileResponse) => {
          setFile(downloadFileResponse.data);
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.response.data.message);
        })
        .finally(() => setLoadingPDF(false));
    }
  }, [material]);

  useLayoutEffect(() => {
    const detail = document.getElementById('material-detail');
    if (detail) {
      detail.style.width = '100vw';
    }
  }, [isAsideOpen]);

  return (
    <Page
      title={`Tài liệu ${material?.subject?.name ? material.subject.name : ''}${
        material?.chapter?.name ? ` - ${material.chapter.name}` : ''
      }${material?.name ? ` - ${material.name}` : ''}`}
      description='From CTCT'
    >
      <LibraryAside
        title='Thư viện tài liệu'
        subTitle='Tài liệu các môn học'
        baseRoute='/library/material'
      />

      {/* Add space
        <div id='material-margin' /> */}
      <Wrapper className={`with-nav-height flex w-full flex-col overflow-auto`} fullWidth>
        {/* Banner */}
        <div className='hidden w-full bg-[#4285F4] px-6 py-2 text-white md:flex md:flex-col md:justify-between lg:px-7 lg:py-3 3xl:px-8 3xl:py-4'>
          <h1 className='text-xl font-bold lg:text-2xl 3xl:text-3xl'>{material?.name}</h1>
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
            <PDF file={file} title={material?.name} />
          )}
        </div>
      </Wrapper>
    </Page>
  );
};

export default MaterialDetailPage;
