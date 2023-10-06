import { Suspense, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Footer, Header, Loading } from './components';
import routes from './routes';
import PrivateRoute from './routes/PrivateRoute';

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = setTimeout(() => {
      setLoading(false);
    }, 300);

    return () => clearTimeout(id);
  }, []);

  return loading ? (
    <Loading />
  ) : (
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
                  <Suspense fallback={<Loading />}>
                    <Component />
                  </Suspense>
                }
                key={index}
              />
            );
          }
          return (
            <Route
              path={route.path}
              element={
                <Suspense fallback={<Loading />}>
                  <PrivateRoute key={index}>
                    <Component />
                  </PrivateRoute>
                </Suspense>
              }
              key={index}
            />
          );
        })}
      </Routes>
      <Footer />
    </>
  );
};

export default App;
