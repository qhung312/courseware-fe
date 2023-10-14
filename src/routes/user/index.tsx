import { lazy } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';

import { Header } from '../../components';
import { Protected } from '../../layout';
import NotFoundPage from '../../pages/NotFound';

const AboutUsPage = lazy(() => import('../../pages/AboutUs'));
const HomePage = lazy(() => import('../../pages/Home'));
const MaterialPage = lazy(() => import('../../pages/Library/MaterialPage'));
const MaterialDetail = lazy(() => import('../../pages/Library/MaterialDetail'));
const ExamArchivePage = lazy(() => import('../../pages/Library/ExamArchivePage'));
const ExamArchiveDetail = lazy(() => import('../../pages/Library/ExamArchiveDetail'));

const UserRoute = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='login' element={<HomePage />} />
        <Route path='about-us' element={<AboutUsPage />} />
        <Route path='profile' element={<Protected Component={<HomePage />} />} />
        <Route path='library' element={<Outlet />}>
          <Route path='material'>
            <Route path=':subjectId?' element={<MaterialPage />} />
            <Route path=':subjectId/pdf/:pdfId?' element={<MaterialDetail />} />
          </Route>
          <Route path='exam-archive'>
            <Route path=':subjectId?' element={<ExamArchivePage />} />
            <Route path=':subjectId/pdf/:pdfId?' element={<ExamArchiveDetail />} />
          </Route>
        </Route>

        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </>
  );
};
export default UserRoute;
