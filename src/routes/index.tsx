import React from 'react';

import Footer from '../components/Footer/Footer';

const LoginPage = React.lazy(() => import('../pages/LoginPage'));
const NotFoundPage = React.lazy(() => import('../pages/NotFound'));

const routes = [
  { title: 'Login', path: '/login', component: LoginPage, isProtected: true },
  { title: 'Not Found', path: '*', component: NotFoundPage, isProtected: false },
  { title: 'Footer', path: '/footer', component: Footer, isProtected: false },
];

export default routes;
