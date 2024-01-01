import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

import { Header, Loading } from '../../components';
import { Protected } from '../../layout';
import BadEmailPage from '../../pages/Error/BadEmail';
import NotFoundPage from '../../pages/Error/NotFound';
import MockTestStatistic from '../../pages/Profile/Statistic/MockTestStatistic';

const ActivityHistoryPage = lazy(() => import('../../pages/Profile/ActivityHistory'));
const UserInformationPage = lazy(() => import('../../pages/Profile/Information'));
const StatisticPage = lazy(() => import('../../pages/Profile/Statistic'));
const SubjectStatisticPage = lazy(() => import('../../pages/Profile/Statistic/SubjectStatistic'));
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
        <Route path='profile' element={<Protected />}>
          <Route
            path=''
            element={
              <Suspense fallback={<Loading />}>
                <UserInformationPage />
              </Suspense>
            }
          />
          <Route
            path='history'
            element={
              <Suspense fallback={<Loading />}>
                <ActivityHistoryPage />
              </Suspense>
            }
          />
          <Route
            path='statistic'
            element={
              <Suspense fallback={<Loading />}>
                <StatisticPage />
              </Suspense>
            }
          />
          <Route
            path='statistic/exercise/:subjectId'
            element={
              <Suspense fallback={<Loading />}>
                <SubjectStatisticPage />
              </Suspense>
            }
          />
          <Route
            path='statistic/mock-test/:subjectId'
            element={
              <Suspense fallback={<Loading />}>
                <MockTestStatistic />
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
            path='exercises/:subjectId/quiz/:quizId/session/:sessionId'
            element={
              <Suspense fallback={<Loading />}>
                <ExercisesPage />
              </Suspense>
            }
          />
          <Route
            path='exercises/:subjectId/quiz/:quizId/review/session/:sessionId'
            element={
              <Suspense fallback={<Loading />}>
                <ExercisesPage />
              </Suspense>
            }
          />
        </Route>
        <Route path='error/bad-email' element={<BadEmailPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </>
  );
};
export default UserRoute;
