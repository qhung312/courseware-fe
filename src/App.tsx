import { Suspense, useLayoutEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Header, Loading } from './components';
import { ENVIRONMENT } from './config';
import { useAppDispatch } from './hooks';
import routes from './routes';
import ProtectedRoute from './routes/ProtectedRoute';
import TitleWrapper from './routes/TitleWrapper';
import { getUserProfile } from './slices/actions/user.action';
import { set401Callback } from './utils/custom-axios';

const App = () => {
  const [loading, setLoading] = useState(true);

  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    console.log('Environment:', ENVIRONMENT);

    set401Callback((error: any) => {
      console.log('Unauthorized request', error);
    });

    dispatch(getUserProfile()).finally(() => setTimeout(() => setLoading(false), 400));
  }, [dispatch]);

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
                    <ProtectedRoute key={index}>
                      <Component />
                    </ProtectedRoute>
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
