import { useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useParams } from 'react-router-dom';

import { Icon } from '../../components';
import AsideLink from '../../components/AsideLink';
import { useAppDispatch, useAppSelector, useWindowDimensions } from '../../hooks';
import { AppAction } from '../../slices/app';
import { RootState } from '../../store';
import { Subject } from '../../types/library';

interface DocumentSideMenuProps {
  title: string;
  subTitle: string;
  description: string;
  baseRoute: string;
}

const DocumentSideMenu: React.FC<DocumentSideMenuProps> = ({
  title,
  subTitle,
  description,
  baseRoute,
}) => {
  const { subjects } = useAppSelector((state: RootState) => state.library);
  const isOpen = useAppSelector((state) => state.app.isAsideOpen);
  const dispatch = useAppDispatch();
  const params = useParams();
  const { width } = useWindowDimensions();

  useEffect(() => {
    const navbar = document.getElementById('navbar') as HTMLElement;
    const menu = document.getElementById('menu') as HTMLElement;

    menu.style.height = `calc(100vh - ${navbar.clientHeight}px)`;
  }, [width]);

  return (
    <>
      <div
        id='menu'
        className={`fixed z-10 max-h-screen bg-white ${
          params?.subjectId ? 'translate-x-[-100%]' : ''
        } ${
          !isOpen ? 'md:translate-x-[-100%]' : 'md:translate-x-0'
        } w-full overflow-y-scroll transition-all duration-300 md:w-[264px]
        lg:w-[332px] xl:w-[400px] 3xl:w-[500px]`}
      >
        <div className='flex items-center px-5 py-5'>
          <div className='h-full w-full space-y-6'>
            <div className='hidden flex-row items-center justify-between md:flex'>
              <h2
                className='md:text-md hidden font-semibold transition duration-300 
                md:block lg:text-lg xl:text-xl 2xl:text-2xl 3xl:text-3xl'
              >
                {subTitle}
              </h2>
            </div>

            <span>
              <h1 className='block text-2xl font-bold text-[#4285F4] transition duration-300 md:hidden'>
                {title}
              </h1>
              <p className='block text-[#252641] transition duration-300 md:hidden'>
                {description}
              </p>
            </span>

            <div className='flex flex-col space-y-4'>
              {subjects ? (
                subjects?.map((subj: Subject) => {
                  return (
                    <AsideLink
                      to={`${baseRoute}/${subj._id}`}
                      content={subj.name}
                      Icon={Icon.Book}
                      key={subj._id}
                    />
                  );
                })
              ) : (
                <Skeleton
                  count={8}
                  borderRadius={12}
                  className='h-12'
                  containerClassName='space-y-4'
                  baseColor='#DBEBFF'
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <button
        id='collapse-button'
        type='button'
        onClick={() => {
          dispatch(AppAction.toggleAside());
        }}
        className={`fixed top-[50%] z-10 hidden rounded-r-xl bg-white md:block ${
          isOpen
            ? '3xl:translate-w-[500px] md:translate-x-[264px] lg:translate-x-[332px] xl:translate-x-[400px] '
            : 'translate-x-0'
        } py-10 px-2 opacity-80 transition-all duration-300`}
      >
        <Icon.ChevronUp
          fill={'#5B5B5B'}
          fillOpacity={0.87}
          className={`aspect-[10/7] h-full w-auto ${isOpen ? 'rotate-[-90deg]' : 'rotate-90'}`}
        />
      </button>
    </>
  );
};

export default DocumentSideMenu;
