import React from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { AuthLayout } from './layouts/AuthLayout';
import { ForgotPassword } from './pages/ForgotPassword';

export function Router(): React.ReactElement | null {
    return useRoutes([
        {
            path: '/dashboard',
            element: <Dashboard />,
            children: [{ path: '/dashboard', element: <Dashboard /> }]
        },
        {
            path: '/',
            element: <AuthLayout />,
            children: [
                { path: 'login', element: <Login /> },
                { path: 'register', element: <Register /> },
                { path: 'forgotpassword', element: <ForgotPassword /> },
                { path: '/', element: <Navigate to="/dashboard" /> }
            ]
        },
        { path: '*', element: <Navigate to="/404" replace /> }
    ]);
}
