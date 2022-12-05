import * as React from 'react';
import { Outlet } from 'react-router-dom';
import { Grid, Container, Box } from '@mui/material';
import image from '../Image.png';
import { Logo } from '../components/Logo';
import AppLogo from '../assets/Lejit.svg';

export const AuthLayout = (): JSX.Element => {
    return (
        <Box
            sx={{
                height: '100vh',
                display: 'flex'
            }}>
            <Box
                sx={{
                    width: '37.5%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column'
                }}>
                {/* <Box component="img" src={AppLogo} /> */}
                <Outlet />
            </Box>
            <Box component="img" src={image} sx={{ height: '100vh' }} />
        </Box>
    );
};
