import { lazy } from 'react';

const LoginPage = lazy(() => import('../pages/LoginPage'));
const HomePage = lazy(() => import('../pages/Home'));
const NotFoundPage = lazy(() => import('../pages/NotFound'));

const routes = [
  { title: 'Home', path: '/', component: HomePage, isProtected: false },
  { title: 'Documents', path: '/library/documents', component: LoginPage, isProtected: true },
  { title: 'Quizzes', path: '/library/quizzes', component: LoginPage, isProtected: true },
  { title: 'Exercises', path: '/room/exercises', component: LoginPage, isProtected: true },
  { title: 'Tests', path: '/room/tests', component: LoginPage, isProtected: true },
  { title: 'About Us', path: '/about-us', component: LoginPage, isProtected: false },
  { title: 'Activities', path: '/about-us/activities', component: LoginPage, isProtected: false },
  { title: 'Partners', path: '/about-us/partners', component: LoginPage, isProtected: false },
  { title: 'Help', path: '/help', component: LoginPage, isProtected: false },
  { title: 'Profile', path: '/profile', component: LoginPage, isProtected: true },
  { title: 'Login', path: '/login', component: LoginPage, isProtected: true },
  { title: 'Not Found', path: '*', component: NotFoundPage, isProtected: false },
];

export default routes;
