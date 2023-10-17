import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import useBoundStore from '../../store';

type ProtectedRouteProps = {
  admin?: boolean;
};

const Protected: React.FC<ProtectedRouteProps> = ({ admin = false } = {}) => {
  const isAuthenticated = useBoundStore.use.isAuthenticated();
  console.log('admin', admin);

  //TODO: Add admin protected
  if (!isAuthenticated) {
    return <Navigate to='/' />;
  }

  return <Outlet />;
};

export default Protected;
