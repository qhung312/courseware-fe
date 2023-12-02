import { ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import useBoundStore from '../../store';

type WrapperProps = {
  children: ReactNode;
  className?: string;
  fullWidth?: boolean;
  backgroundColor?: string;
};

const Wrapper: React.FC<WrapperProps> = ({ children, className, fullWidth, backgroundColor }) => {
  const { pathname } = useLocation();
  const isAsideOpen = useBoundStore.use.isAsideOpen();
  const toggleAside = useBoundStore.use.toggleAside();

  useEffect(() => {
    if (isAsideOpen && fullWidth) {
      toggleAside();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={`with-nav-height flex flex-1 overflow-y-auto ${
        backgroundColor
          ? `bg-[${backgroundColor}]`
          : pathname.includes('/admin')
          ? 'bg-[#e0edfb]'
          : 'bg-white'
      }`}
    >
      <div
        id='content-wrapper'
        className={`h-fit w-fit overflow-x-auto pl-0 transition-all duration-300 ${
          isAsideOpen && !fullWidth
            ? 'md:pl-[264px] lg:pl-[332px] xl:pl-[400px] 3xl:pl-[500px]'
            : ''
        } ${isAsideOpen && fullWidth ? 'blur-none md:blur-sm' : ''} ${className}`}
      >
        {children}
      </div>
    </div>
  );
};

export default Wrapper;
