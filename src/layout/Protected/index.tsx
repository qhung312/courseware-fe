import React, { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { RootState } from '../../store';

type ProtectedRouteProps = {
  Component: ReactNode;
};

const Protected: React.FC<ProtectedRouteProps> = ({ Component: children }) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to='/' />;
  }

  return <React.Fragment>{children}</React.Fragment>;
};

export default Protected;
