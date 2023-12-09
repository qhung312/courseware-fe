import { ReactNode, useEffect, useRef } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import { Icon } from '../../components';
import './index.css';
import { useWindowDimensions } from '../../hooks';
import useBoundStore from '../../store';

interface AsideProps {
  title?: string;
  description?: string;
  children?: ReactNode;
  isDisplayToggleAside?: boolean;
}

const Aside: React.FC<AsideProps> = ({
  title,
  description,
  children,
  isDisplayToggleAside = false,
}) => {
  const params = useParams();
  const pdfId = params?.pdfId ?? '';
  const { pathname } = useLocation();
  const pathTokens = pathname.split('/');
  const asideRef = useRef(null);
  const { width } = useWindowDimensions();
  const isAsideOpen = useBoundStore.use.isAsideOpen();
  const toggleAside = useBoundStore.use.toggleAside();
  const openAside = useBoundStore.use.openAside();

  useEffect(() => {
    if (pdfId === '') openAside();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pdfId]);

  return (
    <>
      {/* Aside */}
      <aside
        ref={asideRef}
        className={`with-nav-height fixed z-10 m-auto ${
          params?.subjectId || (pathTokens[1] === 'admin' && pathTokens.length >= 3)
            ? 'translate-x-[-100%]'
            : ''
        } ${!isAsideOpen ? 'md:translate-x-[-100%]' : 'md:translate-x-0'} ${
          pathTokens[1] === 'admin' ? 'bg-white' : 'bg-white md:bg-[#9DCCFF]/20'
        } w-full overflow-y-auto transition-all duration-300 md:w-[264px] lg:w-[332px] xl:w-[400px] 3xl:w-[500px]`}
      >
        <div className='flex items-center justify-center p-5 md:p-6 xl:py-8 3xl:px-7 3xl:py-10'>
          <div className='h-full w-full space-y-7 md:space-y-4 xl:space-y-5 3xl:space-y-6'>
            {/* Title */}
            {title && width < 768 && (
              <span>
                <h1 className='block text-2xl font-bold text-[#4285F4] transition duration-300 md:hidden'>
                  {title}
                </h1>
                {/* <p className='block text-[#252641] transition duration-300 md:hidden'> */}
                {description && (
                  <p className='hidden text-[#252641] transition duration-300'>{description}</p>
                )}
              </span>
            )}

            {/* Sub-title */}
            <div className='hidden flex-row items-center justify-between md:flex md:flex-row'>
              <h2
                className='md:text-md block font-medium transition duration-300 
                  md:text-xl xl:text-2xl'
              >
                Môn học
              </h2>
              <button
                onClick={toggleAside}
                className={`aspect-square rounded-full bg-[#4285F4] p-2 hover:bg-[#2571eb] ${
                  isDisplayToggleAside ? 'flex' : 'hidden'
                }`}
              >
                <Icon.ArrowLeft className='aspect-square h-3 fill-white lg:h-4' />
              </button>
            </div>

            {/* Children */}
            {children}
          </div>
        </div>
      </aside>

      {/* Collapse Button */}
      {pathname.includes('/admin') && (
        <div
          id={isAsideOpen ? 'collapse-button-container' : 'open-button-container'}
          className={`fixed top-[50%] z-10 hidden rounded-r-lg border-y border-r border-[#CCC] bg-white md:block ${
            isAsideOpen
              ? 'md:translate-x-[264px] lg:translate-x-[332px] xl:translate-x-[400px] 3xl:translate-x-[500px] '
              : 'translate-x-0'
          } transition-all duration-300`}
        >
          <button
            id='collapse-button'
            type='button'
            onClick={toggleAside}
            className='px-1 py-6 lg:py-8 3xl:py-10'
          >
            <Icon.Chevron
              fill={'#5B5B5B'}
              className={`h-4 w-auto transition-all duration-300 ${
                isAsideOpen ? 'rotate-[-90deg]' : 'rotate-90'
              }`}
            />
          </button>
        </div>
      )}
    </>
  );
};

export default Aside;
