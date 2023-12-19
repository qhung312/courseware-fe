import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

import { Header, Loading } from '../../components';
import { Protected } from '../../layout';
// import ComingSoonPage from '../../pages/ComingSoon';
import BadEmailPage from '../../pages/Error/BadEmail';
import NotFoundPage from '../../pages/Error/NotFound';

const AboutUsPage = lazy(() => import('../../pages/AboutUs'));
const ActivitiesPage = lazy(() => import('../../pages/AboutUs/Activities'));
const TSTTPage = lazy(() => import('../../pages/AboutUs/Activities/TSTT'));
const LHOTTCPage = lazy(() => import('../../pages/AboutUs/Activities/LHOTTC'));
const SCTTMPage = lazy(() => import('../../pages/AboutUs/Activities/SCTTM'));
const PartnersPage = lazy(() => import('../../pages/AboutUs/Partners'));
const ActivityHistoryPage = lazy(() => import('../../pages/Profile/ActivityHistory'));
const UserInformationPage = lazy(() => import('../../pages/Profile/Information'));
const StatisticPage = lazy(() => import('../../pages/Profile/Statistic'));
const SubjectStatisticPage = lazy(() => import('../../pages/Profile/Statistic/SubjectStatistic'));
const GSAXPage = lazy(() => import('../../pages/AboutUs/Activities/GSAX'));
const HomePage = lazy(() => import('../../pages/Home'));
const MaterialPage = lazy(() => import('../../pages/Library/MaterialPage'));
const MaterialDetail = lazy(() => import('../../pages/Library/MaterialDetail'));
const ExamArchivePage = lazy(() => import('../../pages/Library/ExamArchivePage'));
const ExamArchiveDetail = lazy(() => import('../../pages/Library/ExamArchiveDetail'));
const ExercisesPage = lazy(() => import('../../pages/Room/Exercises'));
const MainTestPage = lazy(() => import('../../pages/Room/MockTest/Main'));
const DetailMockTestPage = lazy(() => import('../../pages/Room/MockTest/Detail'));

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
        <Route path='about-us'>
          <Route
            path=''
            element={
              <Suspense fallback={<Loading />}>
                <AboutUsPage />
              </Suspense>
            }
          />
          <Route path='activities'>
            <Route
              path=''
              element={
                <Suspense fallback={<Loading />}>
                  <ActivitiesPage />
                </Suspense>
              }
            />
            <Route
              path='tiep-suc-toi-truong'
              element={
                <Suspense fallback={<Loading />}>
                  <TSTTPage />
                </Suspense>
              }
            />
            <Route
              path='lop-hoc-on-tap'
              element={
                <Suspense fallback={<Loading />}>
                  <LHOTTCPage />
                </Suspense>
              }
            />
            <Route
              path='sach-cu-tri-thuc-moi'
              element={
                <Suspense fallback={<Loading />}>
                  <SCTTMPage />
                </Suspense>
              }
            />
            <Route
              path='gia-su-ao-xanh'
              element={
                <Suspense fallback={<Loading />}>
                  <GSAXPage />
                </Suspense>
              }
            />
          </Route>
          <Route
            path='partners'
            element={
              <Suspense fallback={<Loading />}>
                <PartnersPage />
              </Suspense>
            }
          />
        </Route>
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
            path='statistic/:subjectId'
            element={
              <Suspense fallback={<Loading />}>
                <SubjectStatisticPage />
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
          <Route path='tests'>
            <Route
              path=''
              element={
                <Suspense fallback={<Loading />}>
                  <MainTestPage />
                </Suspense>
              }
            />
            <Route
              path='midterm/:subjectId?'
              element={
                <Suspense fallback={<Loading />}>
                  <DetailMockTestPage />
                </Suspense>
              }
            />
            <Route
              path='final/:subjectId?'
              element={
                <Suspense fallback={<Loading />}>
                  <DetailMockTestPage />
                </Suspense>
              }
            />
          </Route>
        </Route>
        <Route path='error/bad-email' element={<BadEmailPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </>
  );
};
export default UserRoute;
