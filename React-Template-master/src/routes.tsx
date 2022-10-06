import React, { Children } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import { SignIn } from './pages/SignIn';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { AuthLayout } from './layouts/AuthLayout';
import { ForgotPassword } from './pages/ForgotPassword';
import { Page404 } from './pages/Page404';

export function Router(): React.ReactElement | null {
    return useRoutes([
        {
            path: '/',
            element: <Navigate to="/auth/register" />
        },

        {
            path: '/auth',

            element: <AuthLayout />,

            children: [
                { path: '/auth/login', element: <SignIn /> },

                { path: '/auth/register', element: <Register /> },

                { path: '/auth/forgot-password', element: <ForgotPassword /> }
            ]
        },
        {
            path: '/*',
            element: <Page404 />
        }
    ]);
}
