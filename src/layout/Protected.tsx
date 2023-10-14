import React, { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

import { RootState } from '../store';

type ProtectedRouteProps = {
  children: ReactNode;
};

const Protected: React.FC<ProtectedRouteProps> = ({ children }) => {
  let location = useLocation();

  const isAuthenticated = useSelector((state: RootState) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  return <React.Fragment>{children}</React.Fragment>;
};

export default Protected;
