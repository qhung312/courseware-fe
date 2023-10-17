import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import useBoundStore from '../../store';

type ProtectedRouteProps = {
  Component: ReactNode;
};

const Protected: React.FC<ProtectedRouteProps> = ({ Component: children }) => {
  const isAuthenticated = useBoundStore.use.isAuthenticated();

  if (!isAuthenticated) {
    return <Navigate to='/' />;
  }

  return <React.Fragment>{children}</React.Fragment>;
};

export default Protected;
