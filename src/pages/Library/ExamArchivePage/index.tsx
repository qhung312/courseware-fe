import { find } from 'lodash';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Link, useParams } from 'react-router-dom';

import { ReactComponent as NoData } from '../../../assets/svgs/NoData.svg';
import { ReactComponent as Tab } from '../../../assets/svgs/Tab.svg';
import { DocumentCard, Icon } from '../../../components';
import { useWindowDimensions } from '../../../hooks';
import { Page } from '../../../layout';
import Wrapper from '../../../layout/Wrapper';
import ExamArchiveService from '../../../service/examArchive.service';
import useBoundStore from '../../../store';
import { SEMESTER_OPTIONS } from '../../../types/examArchive';
import LibraryAside from '../LibraryAside';
import '../index.css';

import type { ExamArchive } from '../../../types/examArchive';

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

const ExamArchivePage: React.FC = () => {
  const params = useParams();
  const id = params?.subjectId ?? '';
  const { width } = useWindowDimensions();
  const [semesterOption, setSemesteOption] = useState<Option[]>([]);
  const [isOpenSemeseter, setIsOpenSemester] = useState(false);
  const [semesterFilterList, setSemesterFilterList] = useState<Option[]>([]);
  const semseterRef = useRef<HTMLDivElement>(null);

  const onCheckSemester = (index: number) => {
    let semesterList = semesterOption;
    semesterList[index].isChoosing = !semesterList[index].isChoosing;
    setSemesteOption(semesterList);
    setSemesterFilterList(semesterOption.filter((semester) => semester.isChoosing));
  };

  const onDeleteSemester = () => {
    setSemesterFilterList([]);
    let chapterList = semesterOption.map((chapter) => ({
      label: chapter.label,
      value: chapter.value,
      isChoosing: false,
      index: chapter.index,
    }));
    setSemesteOption(chapterList);
  };

  const subjects = useBoundStore.use.subjects();
  const subject = find(subjects, (subj) => subj._id === params?.subjectId);

  const [examArchives, setExamArchives] = useState<ExamArchive[] | null>(null);

  useLayoutEffect(() => {
    if (id) {
      setExamArchives(null);
      const semesterString = semesterFilterList.map((chapter) => chapter.value).join(',');

      ExamArchiveService.getAll({ subject: id, semester: encodeURIComponent(semesterString) })
        .then((res) => {
          setExamArchives(res.data.payload.result);
        })
        .catch((err) => {
          console.log('Error in fetching all exams achives by subject id', err);
          setTimeout(() => setExamArchives([]), 300);
        });
    }
  }, [id, semesterFilterList]);

  useEffect(() => {
    setSemesterFilterList([]);

    setSemesteOption(
      SEMESTER_OPTIONS.map((semester, index) => ({
        value: semester.value,
        label: semester.label,
        isChoosing: false,
        index,
      }))
    );
  }, [id]);

  useEffect(() => {
    const closeOutline = (event: MouseEvent) => {
      if (semseterRef.current && !semseterRef.current.contains(event.target as Node)) {
        setIsOpenSemester(false);
      }
    };
    if (isOpenSemeseter) {
      setTimeout(() => {
        window.addEventListener('click', closeOutline);
      }, 0);
      return () => window.removeEventListener('click', closeOutline);
    }
  }, [isOpenSemeseter]);

  if (!params?.subjectId) {
    return (
      <Page title='Tài liệu'>
        <LibraryAside title='Thư viện tài liệu' baseRoute='/library/exam-archive' />

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
    <Page title={`Đề thi ${subject?.name ? subject?.name : ''}`}>
      <LibraryAside title='Thư viện đề thi' baseRoute='/library/exam-archive' />

      <Wrapper className='with-nav-height flex flex-1 flex-col'>
        <div className='flex flex-col px-5 py-5 md:px-8 md:py-7 lg:px-10 lg:py-8 xl:px-12 xl:py-9 2xl:px-14 2xl:py-10'>
          <div className='flex w-full items-start md:hidden'>
            <Link
              to='/library/exam-archive'
              className='flex items-center space-x-2 rounded-lg bg-[#030391] px-2 py-1 text-white hover:bg-[#2571eb] hover:underline md:hidden md:p-3'
            >
              <Icon.ChevronLeft className='aspect-square w-2 fill-white md:w-3' />
              <p className='whitespace-nowrap text-[16px] font-semibold text-inherit 2xl:text-[20px]'>
                Quay lại
              </p>
            </Link>
          </div>
          {/* Banner */}
          <div className='mt-4 flex w-full flex-col items-start justify-start md:mt-0'>
            <h1 className='text-2xl font-bold text-[#030391] md:text-[#2F327D] lg:text-2xl 2xl:text-3xl'>
              Đề thi các môn
            </h1>
            <h2 className='block text-xl font-normal text-[#252641] md:hidden'>
              Môn học: {subject?.name}
            </h2>
          </div>
          <div className='mt-4 flex w-full flex-col items-start justify-center gap-y-5 md:mt-5 lg:mt-6 xl:mt-7 2xl:mt-9'>
            <div
              className={`relative flex w-full flex-col rounded-lg border-[1px] border-[#030391]/30 transition-all duration-300 ease-out md:w-fit md:border-[#030391] ${
                isOpenSemeseter
                  ? 'bg-transparent text-[#030391] md:rounded-b-none md:border-b-0 md:bg-[#030391] md:text-white'
                  : 'border-[#030391]/30 bg-transparent text-[#252641]'
              }' `}
            >
              <button
                onClick={() => setIsOpenSemester(!isOpenSemeseter)}
                className={`flex flex-row items-center justify-between px-4 py-4 text-inherit md:justify-center md:gap-x-12 md:py-2 lg:gap-x-16 xl:gap-x-20 2xl:gap-x-24`}
              >
                <div className='flex flex-row items-center justify-center gap-x-5 text-inherit md:gap-x-3 xl:gap-x-4'>
                  {width > 768 || isOpenSemeseter ? (
                    <Icon.OriginIcon
                      className={`fill-[#030391]/87 md:fill-[#252641]/87 z-[1] aspect-square w-5 md:w-4 2xl:w-5 ${
                        isOpenSemeseter ? 'fill-[#030391] md:fill-white' : 'fill-[#252641]'
                      }`}
                    />
                  ) : (
                    <Icon.FilterIcon
                      className={`fill-[#030391]/87 md:fill-[#252641]/87 z-[1] aspect-square w-5 md:w-4 2xl:w-5 ${
                        isOpenSemeseter ? 'fill-[#030391] md:fill-white' : 'fill-[#252641]'
                      }`}
                    />
                  )}
                  <p
                    className={`text-xl text-inherit md:text-sm lg:text-[16px] 2xl:text-[18px] ${
                      isOpenSemeseter ? 'md:text-white' : ''
                    }
                  }`}
                  >
                    Theo học kì
                  </p>
                </div>
                <Icon.ChevronUp
                  className={`aspect-[1/2] h-4 transition-all duration-300 ${
                    isOpenSemeseter ? 'fill-[#030391] md:fill-white' : 'rotate-180 fill-[#252641]'
                  }`}
                />
              </button>
              <div
                className={`h-fit w-full px-4 ${isOpenSemeseter ? 'block md:hidden' : 'hidden'}`}
              >
                <div className='h-[1px] w-full bg-[#030391]/30' />
              </div>
              <div
                ref={semseterRef}
                className={`relative z-[11] w-full flex-col items-start gap-y-1 rounded-b-lg border-0 border-[#030391] bg-white text-[#252641] shadow-lg transition-all duration-700 ease-out 
                md:absolute md:top-[100%] md:left-[-1px] md:w-[calc(100%+2px)] md:border-x-[1px] md:border-b-[1px] ${
                  isOpenSemeseter && semesterOption.length > 0 ? 'flex' : 'hidden'
                }`}
              >
                {semesterOption.map((chapter, index) => (
                  <button
                    className='flex w-full flex-row items-center justify-start gap-x-2 py-1 px-4 hover:bg-[#9CCDFF]/30 md:gap-x-3 md:px-6'
                    key={chapter.value}
                    onClick={() => onCheckSemester(index)}
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
                {examArchives?.length ?? 0} Kết quả
              </h3>

              {semesterFilterList.length > 0 && (
                <div className='flex flex-col items-center gap-4 md:flex-row'>
                  <div className='flex flex-wrap gap-2'>
                    {semesterFilterList.map((chapter) => (
                      <div
                        className='flex flex-row items-center justify-center gap-x-1 rounded-lg border-[1px] border-[#252641]/50 p-1'
                        key={chapter.value}
                      >
                        <p className='text-xs lg:text-sm 3xl:text-base'>{chapter.label}</p>
                        <button
                          onClick={() => onCheckSemester(chapter.index)}
                          className='flex items-center justify-center'
                        >
                          <Icon.CloseIcon className='aspect-square h-4 fill-[#DB4437]/90' />
                        </button>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={onDeleteSemester}
                    className='text-xl text-[#252641] underline md:text-sm lg:text-[16px] 2xl:text-[18px]'
                  >
                    Xóa tất cả
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Introduction */}
          {/* <div className='mt-0 space-y-2'>
            <h3 className='max-w-xs text-2xl font-semibold'>
              {subject?.name || <Skeleton baseColor='#9DCCFF' />}
            </h3>
            <input
              className='text-[#696984]'
              value={subject?.description ?? ''}
              placeholder=''
              disabled
            />
          </div> */}

          {/* Chapters */}
          <div className='mt-3 flex-1 space-y-2 md:mt-4 lg:mt-5 lg:space-y-3 xl:mt-6 2xl:mt-7 3xl:space-y-4'>
            {/* Skeleton Loading */}
            {!examArchives && <PageSkeleton />}

            {/* If exam archives is empty */}
            {examArchives?.length === 0 && (
              <div className='z-10 rounded-[20px] bg-white px-4 py-3 md:p-5 xl:p-6 2xl:p-7'>
                <NoData className='mx-auto mb-7 h-auto w-[150px] xl:w-[250px]' />
                <p className='w-full text-center'>Không tìm thấy đề thi</p>
              </div>
            )}
            {examArchives?.map((exam) => (
              <DocumentCard
                document={exam}
                key={exam._id}
                title={exam.name}
                to={`/library/exam-archive/${subject?._id}/pdf/${exam._id}`}
                copyContent={
                  window.location.origin + `/library/exam-archive/${subject?._id}/pdf/${exam._id}`
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

export default ExamArchivePage;
