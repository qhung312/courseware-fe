import _ from 'lodash';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { ReactComponent as NoData } from '../../../assets/svgs/NoData.svg';
import { ReactComponent as Tab } from '../../../assets/svgs/Tab.svg';
import { DocumentCard, Icon } from '../../../components';
import { useWindowDimensions } from '../../../hooks';
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
  const { width } = useWindowDimensions();
  const [chapterOption, setChapterOption] = useState<Option[]>([]);
  const [isOpenChapter, setIsOpenChapter] = useState(false);
  const [chapterFilterList, setChapterFilterList] = useState<Option[]>([]);
  const chapterFilterRef = useRef<HTMLDivElement>(null);

  const onCheckChapter = (index: number) => {
    let chapterList = chapterOption;
    chapterList[index].isChoosing = !chapterList[index].isChoosing;
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
    setChapterOption(chapterList);
  };

  const subjects = useBoundStore.use.subjects();
  const subject = _.find(subjects, (subj) => subj._id === params?.subjectId);

  const [materials, setMaterials] = useState<Material[] | null>(null);

  useLayoutEffect(() => {
    if (params?.subjectId && params?.subjectId !== '') {
      setMaterials(null);

      const chapterString = encodeURIComponent(
        chapterFilterList.map((chapter) => chapter.value).join(',')
      );

      MaterialService.getAll({ subject: params?.subjectId, chapter: chapterString })
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
  }, [params, chapterFilterList]);

  useEffect(() => {
    setChapterFilterList([]);
    if (id === '') {
      setChapterOption([]);
      return;
    }

    ChapterService.getAll({ subject: id })
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

      <Wrapper className='with-nav-height flex flex-1 flex-col'>
        <div className='flex flex-col px-5 py-5 md:px-8 md:py-7 lg:px-10 lg:py-8 xl:px-12 xl:py-9 2xl:px-14 2xl:py-10'>
          <div className='flex w-full items-start md:hidden'>
            <Link
              to='/library/material'
              className='flex items-center space-x-2 rounded-lg bg-[#4285F4] px-2 py-1 text-white hover:bg-[#2571eb] hover:underline md:hidden md:p-3'
            >
              <Icon.ChevronLeft className='aspect-square w-2 fill-white md:w-3' />
              <p className='whitespace-nowrap text-[16px] text-inherit md:text-sm lg:text-[16px] 2xl:text-[18px]'>
                Quay lại
              </p>
            </Link>
          </div>
          {/* Banner */}
          <div className='mt-4 flex w-full flex-col items-start justify-start md:mt-0'>
            <h1 className='text-2xl font-bold text-[#4285F4] md:text-[#2F327D] lg:text-2xl 2xl:text-3xl'>
              Tài liệu các môn học
            </h1>
            <h2 className='block text-xl font-normal text-[#252641] md:hidden'>
              Môn học: {subject?.name}
            </h2>
          </div>
          <div className='mt-4 flex w-full flex-col items-start justify-center gap-y-5 md:mt-5 lg:mt-6 xl:mt-7 2xl:mt-9'>
            <div
              className={`relative flex w-full flex-col rounded-lg border-[1px] border-[#4285F4]/30 transition-all duration-300 ease-out md:w-fit md:border-[#4285F4] ${
                isOpenChapter
                  ? 'bg-transparent text-[#4285F4] md:rounded-b-none md:border-b-0 md:bg-[#4285F4] md:text-white'
                  : 'border-[#4285F4]/30 bg-transparent text-[#252641]'
              }' `}
            >
              <button
                onClick={() => setIsOpenChapter(!isOpenChapter)}
                className={`flex flex-row items-center justify-between px-4 py-4 text-inherit md:justify-center md:gap-x-12 md:py-2 lg:gap-x-16 xl:gap-x-20 2xl:gap-x-24`}
              >
                <div className='flex flex-row items-center justify-center gap-x-5 text-inherit md:gap-x-3 xl:gap-x-4'>
                  {width > 768 || isOpenChapter ? (
                    <Icon.OriginIcon
                      className={`fill-[#4285F4]/87 md:fill-[#252641]/87 z-[1] aspect-square w-5 md:w-4 2xl:w-5 ${
                        isOpenChapter ? 'fill-[#4285F4] md:fill-white' : 'fill-[#252641]'
                      }`}
                    />
                  ) : (
                    <Icon.FilterIcon
                      className={`fill-[#4285F4]/87 md:fill-[#252641]/87 z-[1] aspect-square w-5 md:w-4 2xl:w-5 ${
                        isOpenChapter ? 'fill-[#4285F4] md:fill-white' : 'fill-[#252641]'
                      }`}
                    />
                  )}
                  <p
                    className={`text-xl text-inherit md:text-sm lg:text-[16px] 2xl:text-[18px] ${
                      isOpenChapter ? 'md:text-white' : ''
                    }
                  }`}
                  >
                    Theo chương
                  </p>
                </div>
                <Icon.ChevronUp
                  className={`aspect-[1/2] h-4 transition-all duration-300 ${
                    isOpenChapter ? 'fill-[#4285F4] md:fill-white' : 'rotate-180 fill-[#252641]'
                  }`}
                />
              </button>
              <div className={`h-fit w-full px-4 ${isOpenChapter ? 'block md:hidden' : 'hidden'}`}>
                <div className='h-[1px] w-full bg-[#4285F4]/30' />
              </div>
              <div
                ref={chapterFilterRef}
                className={`relative z-[11] w-full flex-col items-start rounded-b-lg border-0 border-[#4285F4] bg-white text-[#252641] shadow-lg transition-all duration-700 ease-out 
                md:absolute md:top-[100%] md:left-[-1px] md:w-[calc(100%+2px)] md:border-x-[1px] md:border-b-[1px] ${
                  isOpenChapter && chapterOption.length > 0 ? 'flex' : 'hidden'
                }`}
              >
                {chapterOption.map((chapter, index) => (
                  <button
                    className='flex w-full flex-row items-center justify-start gap-x-2 py-1 px-4 hover:bg-[#9CCDFF]/30 md:gap-x-3 md:px-6'
                    key={chapter.value}
                    onClick={() => onCheckChapter(index)}
                  >
                    <input
                      type='checkbox'
                      className='allow-checked'
                      checked={chapter.isChoosing}
                      readOnly
                    />
                    <p className='text-start text-[18px] text-inherit md:text-[16px] lg:text-[18px]'>
                      {chapter.label}
                    </p>
                  </button>
                ))}
              </div>
            </div>
            <div className='hidden items-center gap-4 md:flex md:flex-row'>
              <h3 className='text-xl md:text-lg lg:text-xl 2xl:text-[22px]'>
                {materials?.length ?? 0} Kết quả
              </h3>
              {chapterFilterList.length > 0 && (
                <div className='flex flex-col gap-4 md:flex-row'>
                  <div className='flex flex-wrap gap-2'>
                    {chapterFilterList.map((chapter) => (
                      <div
                        className='flex flex-row items-center justify-center gap-x-0.5 rounded-lg border-[1px] border-[#252641]/50 p-2'
                        key={chapter.value}
                      >
                        <p className='text-xs lg:text-sm 3xl:text-base'>{chapter.label}</p>
                        <button
                          onClick={() => onCheckChapter(chapter.index)}
                          className='flex items-center justify-center'
                        >
                          <Icon.CloseIcon className='h-5 w-auto fill-[#DB4437]/90' />
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
          </div>

          {/* Chapters */}
          <div className='mt-3 flex-1 space-y-2 md:mt-4 lg:mt-5 lg:space-y-3 xl:mt-6 2xl:mt-7 3xl:space-y-4'>
            {/* Skeleton Loading */}
            {!materials && <PageSkeleton />}

            {/* If material is empty */}
            {materials?.length === 0 && (
              <div className='z-10 rounded-[20px] bg-white px-4 py-3 md:p-5 xl:p-6 2xl:p-7'>
                <NoData className='mx-auto mb-7 h-auto w-[150px] xl:w-[250px]' />
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
              />
            ))}
          </div>
        </div>
      </Wrapper>
    </Page>
  );
};

export default MaterialPage;
