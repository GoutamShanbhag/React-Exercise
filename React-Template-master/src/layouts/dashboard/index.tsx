import React, { useState } from 'react';
import { styled } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../../components/Navbar';
import { Sidebar } from '../../components/Sidebar';

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const RootStyle = styled('div')({
    display: 'flex',
    minHeight: '100%',
    overflow: 'hidden'
});

const MainStyle = styled('div')(({ theme }) => ({
    flexGrow: 1,
    overflow: 'auto',
    minHeight: '100%',
    paddingTop: APP_BAR_MOBILE + 24,
    paddingBottom: theme.spacing(10),
    [theme.breakpoints.up('lg')]: {
        paddingTop: APP_BAR_DESKTOP + 24,
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2)
    }
}));

export function DashboardLayout(): React.ReactElement {
    const [open, setOpen] = useState(true);

    return (
        <RootStyle>
            <Navbar onOpenSidebar={(): void => setOpen(true)} />
            <Sidebar isOpenSidebar={open} onCloseSidebar={(): void => setOpen(false)} />
            <MainStyle>
                <Outlet />
            </MainStyle>
        </RootStyle>
    );
}
