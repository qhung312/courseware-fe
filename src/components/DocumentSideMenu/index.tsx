import { useSearchParams } from 'react-router-dom';

import Icon from '../Icon';

interface DocumentSideMenuProps {
  title: string;
  subTitle: string;
  description: string;
  subjects: any;
}

const DocumentSideMenu: React.FC<DocumentSideMenuProps> = ({
  title,
  subTitle,
  description,
  subjects,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const params = Object.fromEntries(searchParams);
  const subject = params?.subject || subjects[0].title;

  const handleSubjectChange = (t: string) => {
    setSearchParams({ subject: t });
  };

  return (
    <>
      <div
        className={`z-20 bg-white flex items-center fixed w-full md:w-[264px] lg:w-[332px] xl:w-[400px] 3xl:w-[500px] px-5 xl:px-7 pt-5 md:pt-[42px] lg:pt-14 h-screen transition-all duration-300 ${
          params?.subject ? 'translate-x-[-100%]' : ''
        } md:translate-x-0`}
      >
        <div className='w-full h-full space-y-6'>
          <h2 className='hidden md:block transition duration-300 font-semibold md:text-md lg:text-lg xl:text-xl 2xl:text-2xl 3xl:text-3xl'>
            {subTitle}
          </h2>
          <span>
            <h1 className='block md:hidden transition duration-300 font-bold text-2xl text-[#4285F4]'>
              {title}
            </h1>
            <p className='blockA md:hidden transition duration-300 text-[#252641]'>{description}</p>
          </span>

          <div className='flex flex-col space-y-4'>
            {subjects.map((subj: any, index: number) => {
              const isActive = subj.title === subject;
              return (
                <button
                  onClick={() => handleSubjectChange(subj.title)}
                  className={`group flex-1 flex justify-between items-center px-6 py-5 ${
                    isActive
                      ? 'bg-[#9DCCFF] bg-opacity-30 md:bg-[#4285F4] md:bg-opacity-90'
                      : 'bg-[#9DCCFF] bg-opacity-30'
                  } hover:bg-[#4285F4] hover:bg-opacity-90 rounded-xl  transition-all duration-300`}
                  key={subj.title + index}
                >
                  <div className='space-x-4 flex items-center'>
                    <Icon.Book
                      className={
                        isActive
                          ? 'fill-[#252641] group-hover:fill-white md:fill-white'
                          : 'fill-[#252641] group-hover:fill-white'
                      }
                    />
                    <p
                      className={`truncate max-w-[200px] md:max-w-[120px] lg:max-w-[175px] xl:max-w-[200px] ${
                        isActive
                          ? 'text-[#252641] group-hover:text-white md:text-white'
                          : 'text-[#252641] group-hover:text-white'
                      }  `}
                    >
                      {subj.title}
                    </p>
                  </div>
                  <Icon.ChevronRight
                    className={`hidden md:block h-auto ${
                      isActive ? 'md:fill-white' : 'fill-[#252641] group-hover:fill-white'
                    } `}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* TODO */}
      <div className='mr-0 md:mr-[264px] lg:mr-[332px] xl:mr-[400px] 3xl:mr-[500px] ' />
    </>
  );
};

export default DocumentSideMenu;
