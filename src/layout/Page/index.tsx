import React, { ReactNode, forwardRef, useLayoutEffect } from 'react';

import { DEFAULT_DESCRIPTION, DEFAULT_TITLE, TITLE } from '../../config';

type PageProps = {
  children: ReactNode;
  title?: string;
  description?: string;
};

const Page = forwardRef<HTMLDivElement, PageProps>(({ children, title, description, ...props }) => {
  useLayoutEffect(() => {
    document.title = `${title ? `${title} | ${TITLE}` : DEFAULT_TITLE}`;
    document
      ?.querySelector('meta[name="description"]')
      ?.setAttribute('content', description || DEFAULT_DESCRIPTION || '');
  }, [title, description]);

  return (
    <React.Fragment
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      {children}
    </React.Fragment>
  );
});
Page.displayName = 'Page';

export default Page;
