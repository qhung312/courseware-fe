import React, { ReactNode, useLayoutEffect } from 'react';

type TPageProps = {
  children: ReactNode;
  title: string;
};

const TitleWrapper: React.FC<TPageProps> = ({ children, title }) => {
  useLayoutEffect(() => {
    document.title = title + ' | CTCT';
  }, [title]);

  return <React.Fragment>{children}</React.Fragment>;
};

export default TitleWrapper;
