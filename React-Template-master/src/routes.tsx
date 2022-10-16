import React, { Children } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import { SignIn } from './pages/SignIn';
import { Register } from './pages/Register';
import { DashboardLayout } from './layouts/DashboardLayout';
import { AuthLayout } from './layouts/AuthLayout';
import { ForgotPassword } from './pages/ForgotPassword';
import { Page404 } from './pages/Page404';
import { ChangePassword } from './pages/ChangePassword';
import { Users } from './pages/Users';

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
            path: '/dashboard',
            element: <DashboardLayout />,
            children: [
                { path: '/dashboard/', element: <ChangePassword /> },
                { path: '/dashboard/users', element: <Users /> }
            ]
        },
        {
            path: '/*',
            element: <Page404 />
        }
    ]);
}
