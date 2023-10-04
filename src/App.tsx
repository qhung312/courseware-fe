import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Header } from './components';
import routes from './routes';
import PrivateRoute from './routes/PrivateRoute';

const App = () => {
  useEffect(() => {}, []);
  return (
    <>
      <Header />
      <div className='relative top-'></div>
      <Routes>
        {routes.map((route, index) => {
          const Component: React.FC = route.component;
          if (!route.isProtected) {
            return <Route path={route.path} element={<Component />} key={index} />;
          }
          return (
            <Route
              path={route.path}
              element={
                <PrivateRoute key={index}>
                  <Component />
                </PrivateRoute>
              }
              key={index}
            />
          );
        })}
      </Routes>
    </>
  );
};

export default App;
