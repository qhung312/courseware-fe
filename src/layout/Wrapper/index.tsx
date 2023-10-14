import { ReactNode } from 'react';

import { useAppSelector } from '../../hooks';

type WrapperProps = {
  children: ReactNode;
  className?: string;
  fullWidth?: boolean;
};

const Wrapper: React.FC<WrapperProps> = ({ children, className, fullWidth }) => {
  const isAsideOpen = useAppSelector((state) => state.app.isAsideOpen);

  return (
    <div className='with-nav-height flex flex-1 bg-[#F2F2F2] md:bg-[#E3F2FD]'>
      {/* Add space */}
      {!fullWidth && (
        <div
          className={`mr-0 transition-all duration-300 ${
            isAsideOpen ? 'md:mr-[264px] lg:mr-[332px] xl:mr-[400px] 3xl:mr-[500px]' : ''
          }`}
        />
      )}
      <div className={className}>{children}</div>
    </div>
  );
};

export default Wrapper;
