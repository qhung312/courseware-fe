import { lazy } from 'react';

const HomePage = lazy(() => import('../pages/Home'));
const LoginPage = lazy(() => import('../pages/LoginPage'));
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
  { title: 'Trang Chủ', path: '/', component: HomePage, isProtected: false },
  { title: 'Tài liệu', path: '/library/documents', component: DocumentPage, isProtected: true },
  { title: 'Đề thi', path: '/library/tests', component: ExamArchivePage, isProtected: true },
  {
    title: 'Bài luyện rèn luyện',
    path: '/room/exercises',
    component: LoginPage,
    isProtected: true,
  },
  { title: 'Đề thi', path: '/room/tests', component: LoginPage, isProtected: true },
  { title: 'Về chúng tôi', path: '/about-us', component: LoginPage, isProtected: false },
  { title: 'Hoạt động', path: '/about-us/activities', component: LoginPage, isProtected: false },
  { title: 'Đơn vị hợp tác', path: '/about-us/partners', component: LoginPage, isProtected: false },
  { title: 'Hỗ trợ', path: '/help', component: LoginPage, isProtected: false },
  { title: 'Thông tin của tôi', path: '/profile', component: LoginPage, isProtected: true },
  { title: 'Đăng nhập', path: '/login', component: LoginPage, isProtected: true },
  { title: 'Không tìm thấy', path: '*', component: NotFoundPage, isProtected: false },
];

export default routes;
