import React, { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

import { RootState } from '../store';

type TPrivateRouteProps = {
  children: ReactNode;
};

const PrivateRoute: React.FC<TPrivateRouteProps> = ({ children }) => {
  let location = useLocation();

  const isAuthenticated = useSelector((state: RootState) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  return <React.Fragment>{children}</React.Fragment>;
};

export default PrivateRoute;
