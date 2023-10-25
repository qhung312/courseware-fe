import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Header, Loading } from '../../components';
import { Protected } from '../../layout';
import AdminAside from '../../pages/Admin/AdminAside';
import EditQuestionPage from '../../pages/Admin/Question/Edit';
import ViewQuestionPage from '../../pages/Admin/Question/View';

const CreateExercisePage = lazy(() => import('../../pages/Admin/Exercise/Create'));
const CreateQuestionPage = lazy(() => import('../../pages/Admin/Question/Create'));
const CreateSubjectPage = lazy(() => import('../../pages/Admin/Subject/Create'));
const SubjectList = lazy(() => import('../../pages/Admin/Subject/SubjectList'));
const QuestionListPage = lazy(() => import('../../pages/Admin/Question/List'));
const ExerciseListPage = lazy(() => import('../../pages/Admin/Exercise/ExerciseList'));
const CreateChapterPage = lazy(() => import('../../pages/Admin/Chapter/CreateChapter'));
const ChapterListPage = lazy(() => import('../../pages/Admin/Chapter/ChapterList'));

const MaterialList = lazy(() => import('../../pages/Admin/Material/List'));
const MaterialCreate = lazy(() => import('../../pages/Admin/Material/Create'));
const ExamCreate = lazy(() => import('../../pages/Admin/Exam/Create'));
const ExamList = lazy(() => import('../../pages/Admin/Exam/List'));

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
                  <MaterialList />
                </Suspense>
              }
            />
            <Route
              path='create'
              element={
                <Suspense fallback={<Loading />}>
                  <MaterialCreate />
                </Suspense>
              }
            />
          </Route>
          <Route path='exam-archive'>
            <Route
              path='manage'
              element={
                <Suspense fallback={<Loading />}>
                  <ExamList />
                </Suspense>
              }
            />
            <Route
              path='create'
              element={
                <Suspense fallback={<Loading />}>
                  <ExamCreate />
                </Suspense>
              }
            />
          </Route>
          <Route path='exercises'>
            <Route
              path='manage'
              element={
                <Suspense fallback={<Loading />}>
                  <ExerciseListPage />
                </Suspense>
              }
            />
            <Route
              path='create'
              element={
                <Suspense fallback={<Loading />}>
                  <CreateExercisePage />
                </Suspense>
              }
            />
          </Route>
          <Route path='questions'>
            <Route
              path='manage'
              element={
                <Suspense fallback={<Loading />}>
                  <QuestionListPage />
                </Suspense>
              }
            />
            <Route
              path='create'
              element={
                <Suspense fallback={<Loading />}>
                  <CreateQuestionPage />
                </Suspense>
              }
            />
            <Route
              path='view/:questionid'
              element={
                <Suspense fallback={<Loading />}>
                  <ViewQuestionPage />
                </Suspense>
              }
            />
            <Route
              path='edit/:questionid'
              element={
                <Suspense fallback={<Loading />}>
                  <EditQuestionPage />
                </Suspense>
              }
            />
          </Route>
          <Route path='subject'>
            <Route
              path='manage'
              element={
                <Suspense fallback={<Loading />}>
                  <SubjectList />
                </Suspense>
              }
            />
            <Route
              path='create'
              element={
                <Suspense fallback={<Loading />}>
                  <CreateSubjectPage />
                </Suspense>
              }
            />
          </Route>
          <Route path='subject'>
            <Route
              path='manage'
              element={
                <Suspense fallback={<Loading />}>
                  <MaterialList />
                </Suspense>
              }
            />
            <Route
              path='create'
              element={
                <Suspense fallback={<Loading />}>
                  <CreateSubjectPage />
                </Suspense>
              }
            />
          </Route>
          <Route path='chapter'>
            <Route
              path='manage'
              element={
                <Suspense fallback={<Loading />}>
                  <ChapterListPage />
                </Suspense>
              }
            />
            <Route
              path='create'
              element={
                <Suspense fallback={<Loading />}>
                  <CreateChapterPage />
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
