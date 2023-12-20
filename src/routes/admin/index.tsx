import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Header, Loading } from '../../components';
import { Protected } from '../../layout';
import AdminAside from '../../pages/Admin/AdminAside';
import ChapterEdit from '../../pages/Admin/Chapter/Edit';
import ChapterView from '../../pages/Admin/Chapter/View';
import ExamEdit from '../../pages/Admin/Exam/Edit';
import ExamView from '../../pages/Admin/Exam/View';
import EditExercisePage from '../../pages/Admin/Exercise/Edit';
import ViewExercisePage from '../../pages/Admin/Exercise/View';
import MaterialEdit from '../../pages/Admin/Material/Edit';
import MaterialView from '../../pages/Admin/Material/View';
import CreateSlot from '../../pages/Admin/MockTest/CreateSlot';
import MockTestEdit from '../../pages/Admin/MockTest/Edit';
import EditSlot from '../../pages/Admin/MockTest/EditSlot';
import MockTestList from '../../pages/Admin/MockTest/List';
import MockTestView from '../../pages/Admin/MockTest/View';
import ViewSlot from '../../pages/Admin/MockTest/ViewSlot';
import EditQuestionPage from '../../pages/Admin/Question/Edit';
import ViewQuestionPage from '../../pages/Admin/Question/View';
import SubjectEdit from '../../pages/Admin/Subject/Edit';
import SubjectView from '../../pages/Admin/Subject/View';

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
const CreateMockTestPage = lazy(() => import('../../pages/Admin/MockTest/Create'));

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
            <Route
              path='view/:id'
              element={
                <Suspense fallback={<Loading />}>
                  <MaterialView />
                </Suspense>
              }
            />
            <Route
              path='edit/:id'
              element={
                <Suspense fallback={<Loading />}>
                  <MaterialEdit />
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
            <Route
              path='view/:id'
              element={
                <Suspense fallback={<Loading />}>
                  <ExamView />
                </Suspense>
              }
            />
            <Route
              path='edit/:id'
              element={
                <Suspense fallback={<Loading />}>
                  <ExamEdit />
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
            <Route
              path='edit/:exerciseId'
              element={
                <Suspense fallback={<Loading />}>
                  <EditExercisePage />
                </Suspense>
              }
            />
            <Route
              path='view/:exerciseId'
              element={
                <Suspense fallback={<Loading />}>
                  <ViewExercisePage />
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
              path='view/:questionId'
              element={
                <Suspense fallback={<Loading />}>
                  <ViewQuestionPage />
                </Suspense>
              }
            />
            <Route
              path='edit/:questionId'
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
            <Route
              path='view/:id'
              element={
                <Suspense fallback={<Loading />}>
                  <SubjectView />
                </Suspense>
              }
            />
            <Route
              path='edit/:id'
              element={
                <Suspense fallback={<Loading />}>
                  <SubjectEdit />
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
            <Route
              path='view/:id'
              element={
                <Suspense fallback={<Loading />}>
                  <ChapterView />
                </Suspense>
              }
            />
            <Route
              path='edit/:id'
              element={
                <Suspense fallback={<Loading />}>
                  <ChapterEdit />
                </Suspense>
              }
            />
          </Route>
          <Route path='mock-test'>
            <Route
              path='manage'
              element={
                <Suspense fallback={<Loading />}>
                  <MockTestList />
                </Suspense>
              }
            />
            <Route
              path='create'
              element={
                <Suspense fallback={<Loading />}>
                  <CreateMockTestPage />
                </Suspense>
              }
            />
            <Route
              path='view/:id'
              element={
                <Suspense fallback={<Loading />}>
                  <MockTestView />
                </Suspense>
              }
            />
            <Route
              path='edit/:id'
              element={
                <Suspense fallback={<Loading />}>
                  <MockTestEdit />
                </Suspense>
              }
            />
            <Route path='slot'>
              <Route
                path='create/:id'
                element={
                  <Suspense fallback={<Loading />}>
                    <CreateSlot />
                  </Suspense>
                }
              />
              <Route
                path='view/:id/:slotId'
                element={
                  <Suspense fallback={<Loading />}>
                    <ViewSlot />
                  </Suspense>
                }
              />
              <Route
                path='edit/:id/:slotId'
                element={
                  <Suspense fallback={<Loading />}>
                    <EditSlot />
                  </Suspense>
                }
              />
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
};
export default AdministratorRoute;
