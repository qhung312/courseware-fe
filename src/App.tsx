import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import routes from './routes';
import PrivateRoute from './routes/PrivateRoute';

const App = () => {
	useEffect(() => {}, []);
	return (
		<>
			<Routes>
				{routes.map((route, index) => {
					const Component: React.FC = route.component;
					if (!route.isProtected) {
						return <Route path={route.path} element={<Component />} key={index} />;
					}
					return (
						<PrivateRoute key={index}>
							<Route path={route.path} element={<Component />} key={index} />;
						</PrivateRoute>
					);
				})}
			</Routes>
		</>
	);
};

export default App;
