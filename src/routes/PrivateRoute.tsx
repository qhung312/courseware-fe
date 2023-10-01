import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

import { GlobalState } from '../types/state';

const PrivateRoute: React.FC<React.PropsWithChildren<{ key: number }>> = ({ children, key }) => {
	let location = useLocation();

	const { isAuthenticated } = useSelector((state: GlobalState) => state.auth);

	if (!isAuthenticated) {
		return <Navigate to='/login' state={{ from: location }} />;
	}

	return <React.Fragment key={key}>{children}</React.Fragment>;
};

export default PrivateRoute;
