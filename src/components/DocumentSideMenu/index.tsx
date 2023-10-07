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
        className={`fixed top-0 z-20 max-h-screen pt-[72px] md:pt-[110.6px] xl:pt-[149px] ${
          params?.subject ? 'translate-x-[-100%]' : ''
        } h-screen min-h-screen w-full transition-all duration-300 md:w-[264px]  md:translate-x-0 lg:w-[332px] xl:w-[400px] 3xl:w-[500px]`}
      >
        <div className='flex h-full max-h-full items-center overflow-y-scroll bg-white px-5 pt-5  md:pt-[42px] lg:pt-14 xl:px-7'>
          <div className='h-full w-full space-y-6'>
            <h2 className='md:text-md hidden font-semibold transition duration-300 md:block lg:text-lg xl:text-xl 2xl:text-2xl 3xl:text-3xl'>
              {subTitle}
            </h2>
            <span>
              <h1 className='block text-2xl font-bold text-[#4285F4] transition duration-300 md:hidden'>
                {title}
              </h1>
              <p className='blockA text-[#252641] transition duration-300 md:hidden'>
                {description}
              </p>
            </span>

            <div className='flex flex-col '>
              {subjects.map((subj: any, index: number) => {
                const isActive = subj.title === subject;
                return (
                  <button
                    onClick={() => handleSubjectChange(subj.title)}
                    className={`group mb-4 flex flex-1 items-center justify-between px-6 py-5 ${
                      isActive
                        ? 'bg-[#9DCCFF] bg-opacity-30 md:bg-[#4285F4] md:bg-opacity-90'
                        : 'bg-[#9DCCFF] bg-opacity-30'
                    } rounded-xl transition-all duration-300  hover:bg-[#4285F4] hover:bg-opacity-90`}
                    key={subj.title + index}
                  >
                    <div className='flex items-center space-x-4'>
                      <Icon.Book
                        className={
                          isActive
                            ? 'fill-[#252641] group-hover:fill-white md:fill-white'
                            : 'fill-[#252641] group-hover:fill-white'
                        }
                      />
                      <p
                        className={`max-w-[200px] truncate md:max-w-[120px] lg:max-w-[175px] xl:max-w-[200px] ${
                          isActive
                            ? 'text-[#252641] group-hover:text-white md:text-white'
                            : 'text-[#252641] group-hover:text-white'
                        }  `}
                      >
                        {subj.title}
                      </p>
                    </div>
                    <Icon.ChevronRight
                      className={`hidden h-auto md:block ${
                        isActive ? 'md:fill-white' : 'fill-[#252641] group-hover:fill-white'
                      } `}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DocumentSideMenu;
