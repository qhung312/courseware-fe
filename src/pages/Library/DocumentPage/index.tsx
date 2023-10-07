import { useSearchParams } from 'react-router-dom';

import { DocumentCard, DocumentSideMenu, Icon } from '../../../components';
import subjects from '../../../data/document';

const DocumentPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams({ subject: subjects[0].title });
  const { subject: querySubject } = Object.fromEntries(searchParams);
  let subject = subjects.find((subj) => subj.title === querySubject);

  return (
    <>
      <DocumentSideMenu
        title='Thư viện tài liệu'
        subTitle='Tài liệu các môn học'
        description='Lorem ipsum dolor sit amet, consectetur adi'
        subjects={subjects}
      />
      <div className='flex flex-1 bg-[#F2F2F2] md:bg-[#E3F2FD]'>
        {/* Add space */}
        <div className='mr-0 md:mr-[264px] lg:mr-[332px] xl:mr-[400px] 3xl:mr-[500px] ' />

        <div className='flex flex-1 flex-col'>
          {/* Banner */}
          <div className='hidden w-full bg-[#4285F4] px-6 py-5 text-white md:flex md:h-[88px] md:flex-col md:justify-between lg:h-[108px] lg:px-7 lg:py-6 xl:h-[132px] xl:px-8 xl:py-7 2xl:h-[164px] 2xl:px-9 2xl:py-8'>
            <h1 className='text-xl font-bold lg:text-2xl xl:text-3xl 2xl:text-4xl 3xl:text-[44px]'>
              Thư viện tài liệu
            </h1>
            <p className='text-sm xl:text-base 2xl:text-lg'>
              Lorem ipsum dolor sit amet, consectetur adi
            </p>
          </div>

          <div className='flex-1 space-y-5 p-5 md:space-y-6 md:pt-0 xl:space-y-7 2xl:space-y-8'>
            <button
              className='flex items-center space-x-2 hover:underline md:hidden'
              onClick={() => setSearchParams({})}
            >
              <Icon.ChevronLeft className='fill-black' />
              <span>Quay lại</span>
            </button>

            {/* Introduction */}
            <div className='space-y-2  md:mt-0'>
              <h3 className='text-2xl font-semibold'>{subject?.title}</h3>
              <p className='text-[#696984]'>{subject?.description}</p>
            </div>

            {/* Chapters */}
            <div className='space-y-2 md:space-y-4 lg:space-y-5 xl:space-y-6 2xl:space-y-7'>
              <h1 className='text-2xl font-semibold'>Nội dung môn học</h1>
              {subject?.chapters.map((chapter) => (
                <DocumentCard
                  key={chapter.title}
                  title={chapter.title}
                  subTitle={chapter.subTitle}
                  description={chapter.description}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DocumentPage;
