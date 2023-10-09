import { lazy } from 'react';

const HomePage = lazy(() => import('../pages/Home'));
const DocumentPage = lazy(() => import('../pages/Library/DocumentPage'));
const ExamArchivePage = lazy(() => import('../pages/Library/ExamArchivePage'));
const NotFoundPage = lazy(() => import('../pages/NotFound'));

export interface Route {
  title: string;
  path: string;
  component: React.FC;
  isProtected: boolean;
}

const routes = [
  { title: 'Chúng ta cùng tiến', path: '/', component: HomePage, isProtected: false },
  { title: 'Tài liệu', path: '/library/documents', component: DocumentPage, isProtected: true },
  { title: 'Đề thi', path: '/library/tests', component: ExamArchivePage, isProtected: true },
  {
    title: 'Bài luyện rèn luyện',
    path: '/room/exercises',
    component: NotFoundPage,
    isProtected: true,
  },
  { title: 'Đề thi', path: '/room/tests', component: NotFoundPage, isProtected: true },
  { title: 'Về chúng tôi', path: '/about-us', component: NotFoundPage, isProtected: false },
  { title: 'Hoạt động', path: '/about-us/activities', component: NotFoundPage, isProtected: false },
  {
    title: 'Đơn vị hợp tác',
    path: '/about-us/partners',
    component: NotFoundPage,
    isProtected: false,
  },
  { title: 'Hỗ trợ', path: '/help', component: NotFoundPage, isProtected: false },
  { title: 'Thông tin của tôi', path: '/profile', component: NotFoundPage, isProtected: true },
  { title: 'Đăng nhập', path: '/login', component: HomePage, isProtected: true },
  { title: 'Không tìm thấy', path: '*', component: NotFoundPage, isProtected: false },
];

export default routes;
