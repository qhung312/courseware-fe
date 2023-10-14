import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const MaterialPage = lazy(() => import('../../pages/Library/MaterialPage'));
const MaterialDetail = lazy(() => import('../../pages/Library/MaterialDetail'));
const ExamArchivePage = lazy(() => import('../../pages/Library/ExamArchivePage'));
const ExamArchiveDetail = lazy(() => import('../../pages/Library/ExamArchiveDetail'));

const LibraryRoute = () => {
  return (
    <Routes>
      <Route path='/material/:subjectId?' element={<MaterialPage />} />
      <Route path='/material/:subjectId/pdf/:pdfId?' element={<MaterialDetail />} />
      <Route path='/exam-archive/:subjectId?' element={<ExamArchivePage />} />
      <Route path='/exam-archive/:subjectId/pdf/:pdfId?' element={<ExamArchiveDetail />} />
    </Routes>
  );
};
export default LibraryRoute;
