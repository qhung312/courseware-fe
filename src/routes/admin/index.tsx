import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Header, Loading } from '../../components';
import { Protected } from '../../layout';
import AdminAside from '../../pages/Admin/AdminAside';

const DocumentList = lazy(() => import('../../pages/Admin/Material/List'));

const AdministratorRoute = () => {
  return (
    <>
      <Header />
      <AdminAside />
      <Routes>
        <Route path='' element={<Protected admin />}>
          <Route path='material'>
            <Route
              path='manage'
              element={
                <Suspense fallback={<Loading />}>
                  <DocumentList />
                </Suspense>
              }
            />
            <Route
              path='create'
              element={
                <Suspense fallback={<Loading />}>
                  <DocumentList />
                </Suspense>
              }
            />
          </Route>
          <Route path='exam-archive' element={<Protected admin />}>
            <Route
              path='manage'
              element={
                <Suspense fallback={<Loading />}>
                  <DocumentList />
                </Suspense>
              }
            />
            <Route
              path='create'
              element={
                <Suspense fallback={<Loading />}>
                  <DocumentList />
                </Suspense>
              }
            />
          </Route>
          <Route path='exercises' element={<Protected admin />}>
            <Route
              path='manage'
              element={
                <Suspense fallback={<Loading />}>
                  <DocumentList />
                </Suspense>
              }
            />
            <Route
              path='create'
              element={
                <Suspense fallback={<Loading />}>
                  <DocumentList />
                </Suspense>
              }
            />
          </Route>
          <Route path='questions' element={<Protected admin />}>
            <Route
              path='manage'
              element={
                <Suspense fallback={<Loading />}>
                  <DocumentList />
                </Suspense>
              }
            />
            <Route
              path='create'
              element={
                <Suspense fallback={<Loading />}>
                  <DocumentList />
                </Suspense>
              }
            />
          </Route>
        </Route>
      </Routes>
    </>
  );
};
export default AdministratorRoute;
