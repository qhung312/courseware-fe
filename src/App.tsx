import { Suspense, useEffect, useLayoutEffect, useState } from 'react';
import { Route, Routes, useNavigate, useSearchParams } from 'react-router-dom';

import { Header, Loading } from './components';
import { ENVIRONMENT } from './config';
import { useAppDispatch } from './hooks';
import routes from './routes';
import ProtectedRoute from './routes/ProtectedRoute';
import TitleWrapper from './routes/TitleWrapper';
import { getAllSubjects } from './slices/actions/library.action';
import { getUserProfile } from './slices/actions/user.action';
import { AuthAction } from './slices/auth';

const App = () => {
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(true);

  const [searchParams] = useSearchParams({ token: '' });

  const { token: queryToken } = Object.fromEntries(searchParams);

  const navigate = useNavigate();

  useLayoutEffect(() => {
    console.log('Environment:', ENVIRONMENT);

    if (queryToken && queryToken !== '') {
      dispatch(AuthAction.setToken(queryToken));
    } else {
      dispatch(getUserProfile())
        .then(() => dispatch(getAllSubjects()))
        .then(() => {
          setTimeout(() => setLoading(false), 400);
        });
    }
  }, [dispatch, queryToken]);

  useEffect(() => {
    if (queryToken && queryToken !== '') {
      navigate('/');
    }
  }, [queryToken, navigate]);

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
