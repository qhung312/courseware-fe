import React, { ReactNode } from 'react';

type TPageProps = {
  children: ReactNode;
  className: string;
};

const TitleWrapper: React.FC<TPageProps> = ({ children, className }) => {
  return (
    <div className={`container py-8 md:py-12 lg:py-16 xl:py-24 2xl:py-[124px] ${className}`}>
      {children}
    </div>
  );
};

export default TitleWrapper;
