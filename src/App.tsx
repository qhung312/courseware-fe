import { Suspense, useLayoutEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Header, Loading } from './components';
import { ENVIRONMENT } from './config';
import routes from './routes';
import PrivateRoute from './routes/PrivateRoute';
import TitleWrapper from './routes/TitleWrapper';
import { set401Callback } from './utils/custom-axios';

const App = () => {
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    console.log('Environment:', ENVIRONMENT);

    set401Callback(() => {
      console.log('Unauthorized request');
    });

    const id = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(id);
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <>
      <Header />
      <Suspense fallback={null}>
        <Routes>
          {routes.map((route, index) => {
            const Component: React.FC = route.component;
            if (!route.isProtected) {
              return (
                <Route
                  path={route.path}
                  element={
                    <TitleWrapper title={route.title}>
                      <Component />
                    </TitleWrapper>
                  }
                  key={index}
                />
              );
            }
            return (
              <Route
                path={route.path}
                element={
                  <TitleWrapper title={route.title}>
                    <PrivateRoute key={index}>
                      <Component />
                    </PrivateRoute>
                  </TitleWrapper>
                }
                key={index}
              />
            );
          })}
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
