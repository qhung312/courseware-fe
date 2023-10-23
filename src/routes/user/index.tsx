import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

import { Header, Loading } from '../../components';
import { Protected } from '../../layout';
import NotFoundPage from '../../pages/NotFound';
import ActivityHistory from '../../pages/Profile/ActivityHistory';
import Statistic from '../../pages/Profile/Statistic';

const AboutUsPage = lazy(() => import('../../pages/AboutUs'));
const HomePage = lazy(() => import('../../pages/Home'));
const MaterialPage = lazy(() => import('../../pages/Library/MaterialPage'));
const MaterialDetail = lazy(() => import('../../pages/Library/MaterialDetail'));
const ExamArchivePage = lazy(() => import('../../pages/Library/ExamArchivePage'));
const ExamArchiveDetail = lazy(() => import('../../pages/Library/ExamArchiveDetail'));
const ExercisesPage = lazy(() => import('../../pages/Room/Exercises'));

const UserRoute = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route
          path='/'
          element={
            <Suspense fallback={<Loading />}>
              <HomePage />
            </Suspense>
          }
        />
        <Route
          path='login'
          element={
            <Suspense fallback={<Loading />}>
              <HomePage />
            </Suspense>
          }
        />
        <Route
          path='about-us'
          element={
            <Suspense fallback={<Loading />}>
              <AboutUsPage />
            </Suspense>
          }
        />
        <Route path='profile' element={<Protected />}>
          <Route
            path=''
            element={
              <Suspense fallback={<Loading />}>
                <HomePage />
              </Suspense>
            }
          />
          <Route
            path='history'
            element={
              <Suspense fallback={<Loading />}>
                <ActivityHistory />
              </Suspense>
            }
          />
          <Route
            path='statistic'
            element={
              <Suspense fallback={<Loading />}>
                <Statistic />
              </Suspense>
            }
          />
        </Route>
        <Route path='library' element={<Protected />}>
          <Route path='material'>
            <Route
              path=':subjectId?'
              element={
                <Suspense fallback={<Loading />}>
                  <MaterialPage />
                </Suspense>
              }
            />
            <Route
              path=':subjectId/pdf/:pdfId?'
              element={
                <Suspense fallback={<Loading />}>
                  <MaterialDetail />
                </Suspense>
              }
            />
          </Route>
          <Route path='exam-archive'>
            <Route
              path=':subjectId?'
              element={
                <Suspense fallback={<Loading />}>
                  <ExamArchivePage />
                </Suspense>
              }
            />
            <Route
              path=':subjectId/pdf/:pdfId?'
              element={
                <Suspense fallback={<Loading />}>
                  <ExamArchiveDetail />
                </Suspense>
              }
            />
          </Route>
        </Route>
        <Route path='room' element={<Protected />}>
          <Route
            path='exercises'
            element={
              <Suspense fallback={<Loading />}>
                <ExercisesPage />
              </Suspense>
            }
          />
          <Route
            path='exercises/:subjectId'
            element={
              <Suspense fallback={<Loading />}>
                <ExercisesPage />
              </Suspense>
            }
          />
          <Route
            path='exercises/:subjectId/chapter/:chapterId'
            element={
              <Suspense fallback={<Loading />}>
                <ExercisesPage />
              </Suspense>
            }
          />
        </Route>
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </>
  );
};
export default UserRoute;
