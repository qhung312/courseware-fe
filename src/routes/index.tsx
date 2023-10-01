import React from 'react';

const LoginPage = React.lazy(() => import('../pages/LoginPage'));
const NotFoundPage = React.lazy(() => import('../pages/NotFound'));

const routes = [
	{ title: 'Login', path: '/login', component: LoginPage, isProtected: true },
	{ title: 'Not Found', path: '*', component: NotFoundPage, isProtected: false },
];

export default routes;
