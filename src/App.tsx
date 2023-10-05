import { useEffect } from 'react';
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
    </>
  );
};

export default App;
