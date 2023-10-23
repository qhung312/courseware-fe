import { ReactNode, useRef } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import { Icon } from '../../components';
import './index.css';
import useBoundStore from '../../store';

interface AsideProps {
  title?: string;
  subTitle?: string;
  description?: string;
  children?: ReactNode;
}

const Aside: React.FC<AsideProps> = ({ title, subTitle, description, children }) => {
  const isAsideOpen = useBoundStore.use.isAsideOpen();
  const toggleAside = useBoundStore.use.toggleAside();

  const params = useParams();
  const { pathname } = useLocation();
  const pathTokens = pathname.split('/');
  const asideRef = useRef(null);

  return (
    <>
      {/* Aside */}
      <aside
        ref={asideRef}
        className={`with-nav-height fixed z-10 m-auto bg-white ${
          params?.subjectId || (pathTokens[1] === 'admin' && pathTokens.length >= 3)
            ? 'translate-x-[-100%]'
            : ''
        } ${
          !isAsideOpen ? 'md:translate-x-[-100%]' : 'md:translate-x-0'
        } w-full overflow-y-auto transition-all duration-300 md:w-[264px] lg:w-[332px] xl:w-[400px] 3xl:w-[500px]`}
      >
        <div className='flex items-center justify-center p-5 3xl:p-12'>
          <div className='h-full w-full space-y-6'>
            {/* Title */}
            {title && (
              <span>
                <h1 className='block text-2xl font-bold text-[#4285F4] transition duration-300 md:hidden'>
                  {title}
                </h1>
                <p className='block text-[#252641] transition duration-300 md:hidden'>
                  {description}
                </p>
              </span>
            )}

            {/* Sub-title */}
            {subTitle && (
              <div className='hidden flex-row items-center justify-between md:flex'>
                <h2
                  className='md:text-md hidden font-semibold transition duration-300 
                  md:block lg:text-lg xl:text-xl 2xl:text-2xl 3xl:text-3xl'
                >
                  {subTitle}
                </h2>
              </div>
            )}

            {/* Children */}
            {children}
          </div>
        </div>
      </aside>

      {/* Collapse Button */}
      <div
        id={isAsideOpen ? 'collapse-button-container' : 'open-button-container'}
        className={`fixed top-[50%] z-10 hidden rounded-r-xl bg-white md:block ${
          isAsideOpen
            ? 'md:translate-x-[264px] lg:translate-x-[332px] xl:translate-x-[400px] 3xl:translate-x-[500px] '
            : 'translate-x-[-50%] hover:translate-x-0'
        } opacity-80 transition-all duration-300`}
      >
        <button
          id='collapse-button'
          type='button'
          onClick={toggleAside}
          className='h-full w-full px-2 py-10'
        >
          <Icon.ChevronUp
            fill={'#5B5B5B'}
            fillOpacity={0.87}
            className={`aspect-[10/7] h-full w-auto ${
              isAsideOpen ? 'rotate-[-90deg]' : 'rotate-90'
            }`}
          />
        </button>
      </div>
    </>
  );
};

export default Aside;
