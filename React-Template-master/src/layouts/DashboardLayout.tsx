import React, { useState } from 'react';
import { Box } from '@mui/material';
import { Appbar } from '../components/Appbar';
import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router-dom';

export const DashboardLayout = (): JSX.Element => {
    const { t } = useTranslation();

    return (
        <Box>
            <Appbar />
            <Outlet />
        </Box>
    );
};
