import { Suspense, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Header } from './components';
import routes from './routes';
import PrivateRoute from './routes/PrivateRoute';
import TitleWrapper from './routes/TitleWrapper';

const App = () => {
  useEffect(() => {}, []);
  return (
    <>
      <Header />
      <Suspense fallback={<></>}>
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
                  <PrivateRoute>
                    <TitleWrapper title={route.title}>
                      <Component />
                    </TitleWrapper>
                  </PrivateRoute>
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
