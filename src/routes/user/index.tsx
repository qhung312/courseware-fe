import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

import LibraryRoute from './library';

const AboutUsPage = lazy(() => import('../../pages/AboutUs'));
const HomePage = lazy(() => import('../../pages/Home'));
const NotFoundPage = lazy(() => import('../../pages/NotFound'));

const UserRoute = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/login' element={<HomePage />} />
      <Route path='/about-us' element={<AboutUsPage />} />
      <Route path='/library/*' element={<LibraryRoute />} />
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  );
};
export default UserRoute;
