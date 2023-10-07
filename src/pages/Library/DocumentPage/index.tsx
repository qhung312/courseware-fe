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

        <div className='flex flex-col flex-1'>
          {/* Banner */}
          <div className='hidden md:flex md:justify-between md:flex-col bg-[#4285F4] w-full md:h-[88px] lg:h-[108px] xl:h-[132px] 2xl:h-[164px] px-6 lg:px-7 xl:px-8 2xl:px-9 py-5 lg:py-6 xl:py-7 2xl:py-8 text-white'>
            <h1 className='text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl 3xl:text-[44px] font-bold'>
              Thư viện tài liệu
            </h1>
            <p className='text-sm xl:text-base 2xl:text-lg'>
              Lorem ipsum dolor sit amet, consectetur adi
            </p>
          </div>

          <div className='flex-1 p-5 md:pt-0 space-y-5 md:space-y-6 xl:space-y-7 2xl:space-y-8'>
            <button
              className='md:hidden flex space-x-2 items-center hover:underline'
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
