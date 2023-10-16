import { ReactNode } from 'react';

import { useAppSelector } from '../../hooks';

type WrapperProps = {
  children: ReactNode;
  className?: string;
  fullWidth?: boolean;
};

const Wrapper: React.FC<WrapperProps> = ({ children, className, fullWidth }) => {
  const isAsideOpen = useAppSelector((state) => state.app.isAsideOpen);

  if (fullWidth) {
    console.log(children);
  }

  return (
    <div
      className='with-nav-height flex flex-1 bg-[#F2F2F2] md:bg-[#E3F2FD]'
      style={{ height: 'fit-content' }}
    >
      <div
        id='content-wrapper'
        className={`pl-0 transition-all duration-300 ${
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
