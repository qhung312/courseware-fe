import _ from 'lodash';
import { useLayoutEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Link, useParams } from 'react-router-dom';

import { ReactComponent as NoData } from '../../../assets/svgs/NoData.svg';
import { ReactComponent as Tab } from '../../../assets/svgs/Tab.svg';
import { DocumentCard, Icon } from '../../../components';
import { Page } from '../../../layout';
import Wrapper from '../../../layout/Wrapper';
import MaterialService from '../../../service/material.service';
import useBoundStore from '../../../store';
import LibraryAside from '../LibraryAside';

import type { Material } from '../../../types/material';

const PageSkeleton = () => (
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
);

const MaterialPage: React.FC = () => {
  const params = useParams();

  const subjects = useBoundStore.use.subjects();
  const subject = _.find(subjects, (subj) => subj._id === params?.subjectId);

  const [materials, setMaterials] = useState<Material[] | null>(null);

  useLayoutEffect(() => {
    if (params?.subjectId && params?.subjectId !== '') {
      setMaterials(null);
      MaterialService.getAll({ subject: params?.subjectId })
        .then((res) => {
          const { data } = res;
          const { payload } = data;

          setTimeout(() => setMaterials(payload.result), 300);
        })
        .catch((err) => {
          console.log('Error in fetching all exams achives by subject id', err);
          setTimeout(() => setMaterials([]), 300);
        });
    }
  }, [params]);

  if (!params?.subjectId) {
    return (
      <Page title='Tài liệu'>
        <LibraryAside
          title='Thư viện tài liệu'
          subTitle='Tài liệu các môn học'
          baseRoute='/library/material'
        />

        {/* Add space */}
        <Wrapper className='flex flex-1 flex-col'>
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
    <Page title={`Tài liệu ${subject?.name}`}>
      <LibraryAside
        title='Thư viện tài liệu'
        subTitle='Tài liệu các môn học'
        baseRoute='/library/material'
      />

      <Wrapper className='flex flex-1 flex-col'>
        {/* Banner */}
        <div className='hidden w-full bg-[#4285F4] px-6 py-2 text-white md:flex md:flex-col md:justify-between lg:px-7 lg:py-3 3xl:px-8 3xl:py-4'>
          <h1 className='text-xl font-bold lg:text-2xl 3xl:text-3xl'>Thư viện tài liệu</h1>
        </div>

        <div className='mb-6 flex-1 space-y-5 px-5 py-2 md:space-y-6 md:py-0 lg:px-9 lg:pt-8 xl:space-y-7 xl:px-10 xl:py-3 2xl:space-y-8 2xl:px-11 2xl:py-4'>
          <Link
            to='/library/material'
            className='flex items-center space-x-2 hover:underline md:hidden'
          >
            <Icon.ChevronLeft className='max-w-2 min-w-2 min-h-3 max-h-3 fill-black' />
            <p className='w-[100px]'>Quay lại</p>
          </Link>

          {/* Chapters */}
          <div className='space-y-2 md:space-y-4 lg:space-y-5 xl:space-y-6 2xl:space-y-7'>
            {/* Skeleton Loading */}
            {!materials && <PageSkeleton />}

            {/* If material is empty */}
            {materials?.length === 0 && (
              <div className='z-10 rounded-[20px] bg-white px-4 py-3 md:p-5 xl:p-6 2xl:p-7'>
                <NoData width={200} className='mx-auto w-[200px] p-7 xl:w-[300px]' />
                <p className='w-full text-center'>Không tìm thấy tài liệu</p>
              </div>
            )}
            {materials?.map((material) => (
              <DocumentCard
                key={material._id}
                title={material.name}
                to={`/library/material/${subject?._id}/pdf/${material._id}`}
                copyContent={
                  window.location.origin + `/library/material/${subject?._id}/pdf/${material._id}`
                }
                subTitle={''}
                description={material?.description ?? 'Không có chú thích'}
              />
            ))}
          </div>
        </div>
      </Wrapper>
    </Page>
  );
};

export default MaterialPage;
