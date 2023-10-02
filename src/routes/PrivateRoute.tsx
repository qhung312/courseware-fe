import React, { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

import { RootState } from '../store';

type TPrivateRouteProps = {
	children: ReactNode;
	key: number;
};

const PrivateRoute: React.FC<TPrivateRouteProps> = ({ children, key }) => {
	let location = useLocation();

	const isAuthenticated = useSelector((state: RootState) => state.auth);

	if (!isAuthenticated) {
		return <Navigate to='/login' state={{ from: location }} />;
	}

	return <React.Fragment key={key}>{children}</React.Fragment>;
};

export default PrivateRoute;
