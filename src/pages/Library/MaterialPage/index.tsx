import _ from 'lodash';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { ReactComponent as NoData } from '../../../assets/svgs/NoData.svg';
import { ReactComponent as Tab } from '../../../assets/svgs/Tab.svg';
import { DocumentCard, Icon } from '../../../components';
import { Page } from '../../../layout';
import Wrapper from '../../../layout/Wrapper';
import ChapterService from '../../../service/chapter.service';
import MaterialService from '../../../service/material.service';
import useBoundStore from '../../../store';
import LibraryAside from '../LibraryAside';
import '../index.css';

import type { Material } from '../../../types/material';

type Option = {
  label: string;
  value: string;
  isChoosing: boolean;
  index: number;
};

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
  const id = params?.subjectId ?? '';
  const [chapterOption, setChapterOption] = useState<Option[]>([]);
  const [isOpenChapter, setIsOpenChapter] = useState(false);
  const [chapterFilterList, setChapterFilterList] = useState<Option[]>([]);
  const chapterFilterRef = useRef<HTMLDivElement>(null);

  const onCheckChapter = (index: number) => {
    let chapterList = chapterOption;
    chapterList[index].isChoosing = !chapterList[index].isChoosing;
    console.log(chapterList);
    setChapterOption(chapterList);
    setChapterFilterList(chapterOption.filter((chapter) => chapter.isChoosing));
  };

  const onDeleteChapter = () => {
    setChapterFilterList([]);
    let chapterList = chapterOption.map((chapter) => ({
      label: chapter.label,
      value: chapter.value,
      isChoosing: false,
      index: chapter.index,
    }));
    console.log(chapterList);
    setChapterOption(chapterList);
  };

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

  useEffect(() => {
    // update options for chapter when the selected subject changes
    if (id === '') {
      setChapterOption([]);
      return;
    }

    ChapterService.getAll({ subject: id }, true)
      .then((res) => {
        const { result: chapters } = res.data.payload;
        setChapterOption(
          chapters.map((chap, index) => ({
            value: chap._id,
            label: chap.name,
            isChoosing: false,
            index,
          }))
        );
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  }, [id]);

  useEffect(() => {
    const closeOutline = (event: MouseEvent) => {
      if (chapterFilterRef.current && !chapterFilterRef.current.contains(event.target as Node)) {
        setIsOpenChapter(false);
      }
    };
    if (isOpenChapter) {
      setTimeout(() => {
        window.addEventListener('click', closeOutline);
      }, 0);
      return () => window.removeEventListener('click', closeOutline);
    }
  }, [isOpenChapter]);

  if (!params?.subjectId) {
    return (
      <Page title='Tài liệu'>
        <LibraryAside title='Thư viện tài liệu' baseRoute='/library/material' />

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
    <Page title={`Tài liệu ${subject?.name ? subject?.name : ''}`}>
      <LibraryAside title='Thư viện tài liệu' baseRoute='/library/material' />

      <Wrapper className='flex flex-1 flex-col'>
        <div className='flex flex-col gap-y-4 px-5 py-4 md:gap-y-6 md:px-8 md:py-6 lg:gap-y-5 lg:px-10 lg:py-8 xl:gap-y-6 xl:px-12 2xl:gap-y-7 2xl:px-14 2xl:py-10'>
          <Link
            to='/room/exercises'
            className='flex items-center space-x-2 hover:underline md:hidden'
          >
            <Icon.ChevronLeft className='max-w-2 min-w-2 min-h-3 max-h-3 fill-black' />
            <p className='w-[100px]'>Quay lại</p>
          </Link>
          {/* Banner */}
          <div className='flex w-full justify-start'>
            <h1 className='text-2xl font-bold text-[#4285F4] md:text-[#2F327D] lg:text-2xl 2xl:text-3xl'>
              Tài liệu các môn học
            </h1>
          </div>
          <div className='flex w-full flex-col items-start justify-center gap-y-5'>
            <div className='relative flex w-full flex-col bg-transparent md:w-fit'>
              <button
                onClick={() => setIsOpenChapter(!isOpenChapter)}
                className={`flex flex-row items-center justify-between border-[1px] px-4 py-2 transition-all duration-300 md:justify-center md:gap-x-12 lg:gap-x-16 xl:gap-x-20 2xl:gap-x-24 ${
                  isOpenChapter
                    ? 'rounded-t-lg border-transparent bg-[#4285F4] text-white'
                    : 'rounded-lg border-[#4285F4] bg-transparent text-[#252641] '
                }`}
              >
                <div className='flex flex-row items-center justify-center gap-x-5 md:gap-x-3 xl:gap-x-4'>
                  <Icon.OriginIcon
                    className={`fill-[#4285F4]/87 md:fill-[#252641]/87 z-[1] aspect-square w-5 md:w-4 2xl:w-5 ${
                      isOpenChapter ? 'fill-white' : 'fill-[#252641]'
                    }`}
                  />
                  <p className='text-xl text-inherit md:text-sm lg:text-[16px] 2xl:text-[18px]'>
                    <span className='block md:hidden'>Lọc</span> Theo chương
                  </p>
                </div>
                <Icon.ChevronUp
                  className={`aspect-[1/2] h-4 transition-all duration-300 ${
                    isOpenChapter ? 'rotate-180 fill-white' : 'fill-[#252641]'
                  }`}
                />
              </button>
              <div
                ref={chapterFilterRef}
                className={`absolute top-[100%] left-0 z-[2] w-full flex-col items-start gap-y-1 rounded-b-lg border-x-[1px] border-b-[1px] border-[#4285F4] bg-white py-3 px-6 text-[#252641] shadow-lg transition-all duration-300 ease-linear ${
                  isOpenChapter && chapterOption.length > 0 ? 'flex' : 'hidden'
                }`}
              >
                {chapterOption.map((chapter, index) => (
                  <button
                    className='flex w-full flex-row items-center justify-start gap-x-2 md:gap-x-3'
                    key={chapter.value}
                    onClick={() => onCheckChapter(index)}
                  >
                    <input type='checkbox' className='allow-checked' checked={chapter.isChoosing} />
                    <p className='text-[18px] text-inherit md:text-[16px] lg:text-[18px]'>
                      {chapter.label}
                    </p>
                  </button>
                ))}
              </div>
            </div>
            {chapterFilterList.length > 0 && (
              <div className='flex flex-col gap-4 md:flex-row'>
                <h3 className='text-xl md:text-lg lg:text-xl 2xl:text-[22px]'>3 Kết quả</h3>
                <div className='flex flex-wrap gap-2'>
                  {chapterFilterList.map((chapter) => (
                    <div
                      className='flex flex-row items-center justify-center gap-x-1 rounded-lg border-[1px] border-[#252641]/50 p-1'
                      key={chapter.value}
                    >
                      <p className='text-xs lg:text-sm 3xl:text-base'>{chapter.label}</p>
                      <button
                        onClick={() => onCheckChapter(chapter.index)}
                        className='flex items-center justify-center'
                      >
                        <Icon.CloseIcon className='aspect-square h-4 fill-[#DB4437]/90' />
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  onClick={onDeleteChapter}
                  className='text-xl text-[#252641] underline md:text-sm lg:text-[16px] 2xl:text-[18px]'
                >
                  Xóa tất cả
                </button>
              </div>
            )}
          </div>

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
                document={material}
                key={material._id}
                title={material.name}
                to={`/library/material/${subject?._id}/pdf/${material._id}`}
                copyContent={
                  window.location.origin + `/library/material/${subject?._id}/pdf/${material._id}`
                }
                subTitle={''}
                description={material?.description ? material?.description : 'Không có chú thích'}
              />
            ))}
          </div>
        </div>
      </Wrapper>
    </Page>
  );
};

export default MaterialPage;
